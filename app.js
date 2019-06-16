
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var passport = require('passport');
require('./model/mongoose');
const User = require('./Model/User');
const Treks = require('./Model/Treks')
const auth=require('./middleware/auth') 
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/TrekkersGateway/me',auth,function(req,res){
    res.send(req.user);
})
app.post("/TrekkersGateway/login", async function(req, res){

    const user = await User.Login(req.body.username,
   req.body.password)
   const token = await user.generateAuthToken();   
   res.send({token});   
   })

app.post('/TrekkersGateway/createuser', (req, res) => {
    console.log(req.body);
    var mydata = new User(req.body);

    mydata.save().then(function () {
        res.send('User successfully registered');
    }).catch(function (e) {
        res.send(e);

    });
});

app.post('/TrekkersGateway/userlogin', passport.authenticate('local'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'You are successfully logged in!' });
  });

app.post('/TrekkersGateway/product', (req, res) => { //add product
    console.log(req.body);
    var prod = new Product(req.body);

    prod.save().then(function () {
        res.send('fine');
    }).catch(function (e) {
        res.send(e);

    });
});
app.get('/TrekkersGateway/registeredusers', function (req, res) {
    User.find().then(function (user) {
        res.send(user);
    }).catch(function (e) {
        res.send(e)
    });

});
app.get('/TrekkersGateway/produsers', function (req, res) {   //get data in dashboard
    Product.find().then(function (product) {
        res.send(product);
    }).catch(function (e) {
        res.send(e)
    });
});


app.delete('/TrekkersGateway/proddelete/:id', function (req, res) {    //product delete
  
   
    Product.findByIdAndDelete(req.params.id).then(function(){
        res.send('Product is deleted');
    }).catch(function(e){
        res.send(e);
    }) ;
    });






app.get('/TrekkersGateway/produpdate/:id', function (req, res) {     //product get from dashboard and set in form
    uid = req.params.id.toString();
    Product.findById(uid).then(function (product) {
        res.send(product);
    }).catch(function (e) {
        res.send(e)
    });
});
app.put('/TrekkersGateway/updateprod/:id', function (req, res) {   //update productr
    uid = req.params.id;
  //  console.log(uid);
    //console.log(req.body);
    Product.findByIdAndUpdate({_id : uid },req.body).then(function(){console.log("ok")}).catch(function(e){
        console.log(e);
    })


});
// newdata.save();
app.listen(3000);
