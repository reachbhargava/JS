(function() {
    var contactsApp = angular.module("contactsApp")

    contactsApp.service("getDataSvc", getDataSvc);
    function getDataSvc(valueSvc) {
        this.contacts = [
            {
                "gender":"male",
                "name":{
                    "title":"mr",
                    "first":"bhargava",
                    "last":"narasipura"
                },
                "location":{
                    "street":"5611 donkerstraat",
                    "city":"scherpenzeel",
                    "state":"zuid-holland",
                    "postcode":92311},
                "email":"oğuz.devreeze@example.com",
                "login":{
                    "username":"crazymouse453",
                    "password":"wolfie",
                    "salt":"T0YhZLDA",
                    "md5":"94c08b679c4c0b617833ad6ea5584cdb",
                    "sha1":"cf8aa1837d32ad94a1bd9c8e42b5422e6cd818f6",
                    "sha256":"1702f32ad849f043a9fd54d695e5223593ccae7f1bffb23fc99b8138e990d58f"
                },
                "dob":"1962-05-06 12:32:10",
                "registered":"2006-06-14 12:19:12",
                "phone":"(957)-547-3286",
                "cell":"(512)-707-0369",
                "id":{
                    "name":"BSN",
                    "value":"03103991"
                },
                "picture":{
                    "large":"https://randomuser.me/api/portraits/men/8.jpg",
                    "medium":"https://randomuser.me/api/portraits/med/men/8.jpg",
                    "thumbnail":"https://randomuser.me/api/portraits/thumb/men/8.jpg"
                },
                "nat":"NL"
            },
            {
                "gender":"female",
                "name":{
                    "title":"mr",
                    "first":"siri",
                    "last":"rao"
                },
                "location":{
                    "street":"5611 donkerstraat",
                    "city":"scherpenzeel",
                    "state":"zuid-holland",
                    "postcode":92311},
                "email":"oğuz.devreeze@example.com",
                "login":{
                    "username":"crazymouse453",
                    "password":"wolfie",
                    "salt":"T0YhZLDA",
                    "md5":"94c08b679c4c0b617833ad6ea5584cdb",
                    "sha1":"cf8aa1837d32ad94a1bd9c8e42b5422e6cd818f6",
                    "sha256":"1702f32ad849f043a9fd54d695e5223593ccae7f1bffb23fc99b8138e990d58f"
                },
                "dob":"1962-05-06 12:32:10",
                "registered":"2006-06-14 12:19:12",
                "phone":"(957)-547-3286",
                "cell":"(512)-707-0369",
                "id":{
                    "name":"BSN",
                    "value":"03103991"
                },
                "picture":{
                    "large":"https://randomuser.me/api/portraits/women/8.jpg",
                    "medium":"https://randomuser.me/api/portraits/med/women/8.jpg",
                    "thumbnail":"https://randomuser.me/api/portraits/thumb/women/8.jpg"
                },
                "nat":"NL"
            },
            {
                "gender":"male",
                "name":{
                    "title":"mr",
                    "first":"bharath",
                    "last":"simha"
                },
                "location":{
                    "street":"5611 donkerstraat",
                    "city":"scherpenzeel",
                    "state":"zuid-holland",
                    "postcode":92311},
                "email":"oğuz.devreeze@example.com",
                "login":{
                    "username":"crazymouse453",
                    "password":"wolfie",
                    "salt":"T0YhZLDA",
                    "md5":"94c08b679c4c0b617833ad6ea5584cdb",
                    "sha1":"cf8aa1837d32ad94a1bd9c8e42b5422e6cd818f6",
                    "sha256":"1702f32ad849f043a9fd54d695e5223593ccae7f1bffb23fc99b8138e990d58f"
                },
                "dob":"1962-05-06 12:32:10",
                "registered":"2006-06-14 12:19:12",
                "phone":"(957)-547-3286",
                "cell":"(512)-707-0369",
                "id":{
                    "name":"BSN",
                    "value":"03103991"
                },
                "picture":{
                    "large":"https://randomuser.me/api/portraits/men/9.jpg",
                    "medium":"https://randomuser.me/api/portraits/med/men/9.jpg",
                    "thumbnail":"https://randomuser.me/api/portraits/thumb/men/9.jpg"
                },
                "nat":"NL"
            }
        ]
    }
})()