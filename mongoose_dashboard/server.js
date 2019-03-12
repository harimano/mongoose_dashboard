var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');

var app = express();
var mongoose = require('mongoose');
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/dashboard');
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    country: String,
}, {timestamps: true});

mongoose.model('User', UserSchema); 
var User = mongoose.model('User');



app.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
            console.log('here you go');
            res.render('index', {users:users});
            }
    });

   
});



app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new User with the name and age corresponding to those from req.body
    var user = new User({name: req.body.name, age: req.body.age, country: req.body.country});
    user.save(function(err) {
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully added a user!');
        }
    res.redirect('/');
    })
})


app.get('/result', function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
            console.log('here you go');
            res.render('new', {users:users});
            }
    });
});


// app.get('/edit', function(req, res){
//     User.find({}, function(err, users) {
//         if(err) {
//             console.log('something went wrong');
//             } else { // else console.log that we did well and then redirect to the root route
//             console.log('here you go');
//             res.render('edit', {users:users});
//             }
//     });

// });
app.get('/edit/:id', function(req, res){
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
            console.log('here you go');
            res.render('edit', {user:user});
            }
    });
});

app.post('/edituser', function(req, res) {
    console.log("POST DATA", req.body);
    User.update({name: req.body.name, age: req.body.age, country: req.body.country},function(err){
        if(err) {
        console.log('something went wrong');
        } else { 
        console.log('successfully edited user!');
        }
    res.redirect('/');
    });
});




app.get('/view/:id', function(req, res){
    User.findById(req.params.id, function(err, user) {
        if(err) {
            console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
            console.log('here you go');
            res.render('viewuser', {user:user});
            }
    });
});

app.get('/delete/:id', function(req, res){
    User.findByIdAndDelete(req.params.id, function(err, user) {
        if(err) {
            console.log('something went wrong');
            } else { // else console.log that we did well and then redirect to the root route
            console.log('User Deleted');
            res.redirect('/');
            }
    });
});

app.listen(8000, function() {
});