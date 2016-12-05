
'use strict';

const Hapi = require('hapi')
var Good = require('good')
var requestModule = require('request');
var cheerio = require('cheerio');
var parseDomain = require('parse-domain');

const server = new Hapi.Server();
server.connection({ port: 3000});

server.register(require('inert'), (err) => {
    if (err) {
        throw err;
    }
    
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    })
    
})

server.route({
    method: 'POST',
    path: '/analyzeUrl',
    handler: function (request, reply) {
        var urlReceived = request.payload.requestURL
        server.log('info','URL Received is ' + urlReceived)
        var title
        var htmlVersion = '-'
        var headingsMap = new Map()
        var externalCount = 0, internalCount = 0, inAccessibleExternal = 0;
        var passwordForm = false;
        var errorStatusCode;
        var accessError
        requestModule(urlReceived, function (error, response, html) {
                if (!error && response.statusCode == 200) {
                    var $ = cheerio.load(html);
                    
                    title = $('head > title').text();
                    server.log('info', 'title is ' + title)
                    
//                    htmlVersion = '-'
//                     htmlVersion = $('DOCTYPE')
//                     server.log('info', 'version is ' + htmlVersion)
                    
                    /*Headings count*/
                    var headArray = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
                    headArray.forEach(function(h) {
                        headingsMap.set(h, $(h).length);
                    })
                    /*headingsMap.forEach(function(val, key) {
                        server.log('info', key + '--' + val)
                    })*/

                    /*Links*/
                    var links = $('a'); 
                    $(links).each(function(i, link){
                        var link = $(link).attr('href')
//                        server.log('info', 'link is ' + link);
                        
                        if (link 
                            && typeof link != "undefined"
                            && (link.startsWith("http") || link.startsWith("www"))) {
                            
                            externalCount++
                            
//                            const domain = parseDomain(link)                            
//                            server.log('---> ' + domain.domain + ' --> ' + domain.subdomain + ' -> ' + domain.tld)
                            
                            requestModule.get(link)
                                  .on('error', function(err) {
                                    server.log('info', 'link --> ' + link + 'is not accessible: Error Code' +             response.statusCode)
                                    server.log('info', err)
                                    inAccessibleExternal++
                                  })                            
                        } else {
                            internalCount++
                        }
                    })
//                    server.log('info', '#Internal links ' + internalCount)
//                    server.log('info', '#External links ' + externalCount)
//                    server.log('info', '#External links that are inaccessible ' + inAccessibleExternal)
                    
                    var type = $('input:password').each(function(i, elem) {
                        passwordForm = true;
                    });                 
                    
                } else {
                    if (error) {
                        server.log('info', 'Error accessing site ' + error)
                        accessError = error.code
                    }
                    if (response) {
                        server.log('info', 'Response is ' + response.statusCode)
                        errorStatusCode = response.statusCode
                    }
                }
                
                var returnObject = {
                    'Title': title,
                    'HTML-Version': htmlVersion,
                    'ExternalLinks-Count': externalCount, 
                    'InternalLinks-Count': internalCount,
                    'InAccessible-ExternalLinks': inAccessibleExternal,
                    'PasswordForm': passwordForm,
                    'Error': accessError,
                    'Response-Code': errorStatusCode
                }
                
                var headingsMapAsJSON = JSON.stringify([...headingsMap])
//                server.log('info', 'headingsMapAsJSON ' + headingsMapAsJSON)
                    
                var stringified = JSON.stringify(returnObject);
//                server.log('info', 'stringified ' + stringified)
                
                var finalPackage = {headings: headingsMapAsJSON,
                                    rest: stringified}
                
                var finalPackageAsJSON = JSON.stringify(finalPackage)
                server.log('info', 'Final Response ' + finalPackageAsJSON);
                reply(finalPackageAsJSON);
            
            });
        
    }
});

server.register({  
      register: Good,
      options: {
            reporters: {
                myConsoleReporter: [{
                    module: 'good-console'
                }, 'stdout']
            }
        }
    }, function (err) {
            if (err) {
                console.log('Failed loading plugin');
            }

            server.start((err) => {

                if (err) {
                    throw err;
                }
                server.log('info',`Server running at: ${server.info.uri}`);
            });
     })

