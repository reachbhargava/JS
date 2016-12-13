var mongoose = require('mongoose')
var express = require('express');

var router = express.Router();

router.route('/users')
    .get(function(request, response) {
        People = mongoose.model('People')
        People.find({}, function(err, data) {
            if(err) {
                response.status(404).send(err)
            } else {
                console.log('data received from db')
                response.status(200).send(data)
            }
        })
    })

    .post(function(request, response) {
        People = new People();
        People.name = request.body.name;
        People.age = request.body.age;
        People.save(function(err, data) {
            if(err) {
                response.status(500).send(err)
            } else {
                console.log('data created in db')
                response.status(200).send(data)
            }
        })
    })

    .put(function(request, response) {
        var query = { _id: request.body._id };
        People = mongoose.model('People')
        People.findOneAndUpdate(query, request.body, function(err, data) {
            if(err) {
                response.status(500).send(err)
            } else {
                console.log('data updated in db')
                response.status(200).send(data)
            }
        })
    })

/*router.get('/users', function(request, response) {
    People = mongoose.model('People')
    People.find({}, function(err, data) {
        if(err) {
            response.status(404).send(err)
        } else {
            console.log('data received from db')
            response.status(200).send(data)
        }
    })
})

router.post('/users', function(request, response) {
    People = new People();
    People.name = request.body.name;
	People.age = request.body.age;
    People.save(function(err, data) {
        if(err) {
            response.status(500).send(err)
        } else {
            console.log('data created in db')
            response.status(200).send(data)
        }
    })
})

router.put('/users', function(request, response) {
    var query = { _id: request.body._id };
    People = mongoose.model('People')
    People.findOneAndUpdate(query, request.body, function(err, data) {
        if(err) {
            response.status(500).send(err)
        } else {
            console.log('data updated in db')
            response.status(200).send(data)
        }
    })
})*/

router.route('/posts/:id')
    .delete(function(request, response) {
        var id = request.params.idToDelete;
        People.remove({_id: id}, function(err, data) {
            if(err) {
                response.status(500).send(err)
            } else {
                console.log('record deleted with id ', id)
                response.status(200).send({message:'Deleted'})
            }
        })
    })

/*router.delete('/users/:idToDelete', function(request, response) {
    var id = request.params.idToDelete;
    People.remove({_id: id}, function(err, data) {
        if(err) {
            response.status(500).send(err)
        } else {
            console.log('record deleted with id ', id)
            response.status(200).send({message:'Deleted'})
        }
    })
})*/

module.exports = router;