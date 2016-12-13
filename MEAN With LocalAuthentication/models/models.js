var mongoose = require('mongoose')

var peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

var usersSchema = new mongoose.Schema({
    name: String,
    password: String
});

mongoose.model('People', peopleSchema, 'People');
mongoose.model('Users', usersSchema, 'Users');
