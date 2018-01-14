var firebase = require("firebase");
require('firebase/firestore');

var bodyParser = require('body-parser');
var GeoPoint = require('geopoint');
var express = require('express');
var path = require('path');



var app = express();

// app.engine('html', require('ejs').renderFile);
// app.engine('html');

app.use("/public",express.static(__dirname + '/public'));
app.set('view engine','ejs');

// create application/json parser 
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAjf0slvgGxRlI5wujzu8Nsp-_SJgsmsb4",
    authDomain: "companion-app-e1b98.firebaseapp.com",
    databaseURL: "https://companion-app-e1b98.firebaseio.com",
    projectId: "companion-app-e1b98",
    storageBucket: "companion-app-e1b98.appspot.com",
    messagingSenderId: "843176657895"
};
firebase.initializeApp(config);

// database reference point
var db = firebase.firestore();


app.get('/',function(req,res){
    // res.sendFile(path.join(__dirname + '/test.html'));
    res.render('index.ejs');
})

// app.get('/',function(req,res){
//  db.collection('users').get()
//     .then((snapshot) => {
//         snapshot.forEach((doc) => {
//             console.log(doc.id, '=>', doc.data());
//         });
//     })
//     .catch((err) => {
//         console.log('Error getting documents', err);
//     });
// })

// Adds a user to the database
// function addUser(name, location, destination, time) {
//     var docRef = db.collection('users').doc(name);

//     var setAda = docRef.set({
//         location: location,
//         destination: destination,
//         time: time
//     });
// }

// // Client call for adding a user
// app.get('/adduser', function(req, res) {
//     var user = req.query.user;
//     var location = req.query.location;
//     var destination = req.query.destination;
//     var time = req.query.time;


//     addUser(name, location, destination, time);
// });

app.post('/sendData',urlencodedParser,function(req,res){
    var nameData=req.body.nameData;
    var lat=req.body.lat;
    var longitude=req.body.long;
    console.log('lat',parseFloat(lat).toFixed(2));
    console.log('longitude',parseFloat(longitude).toFixed(2));
    // var loc=new GeoPoint(longitude,lat);
    // var loc=new GeoPoint(123, 123);
    var time=req.body.time;

    var docRef = db.collection('users').doc(nameData);

    var setAda = docRef.set({
        nameData:nameData,
        lat:lat,
        longitude:longitude,
        // loc: loc,
        destination: "destination",
        time: time
    });

    res.render('test.ejs')


});

app.post('/getClosestUsersTo',urlencodedParser,function(req,res){
    var name=req.body.name;
    // console.log(req.body);
    // console.log(name);
    // res.send('1');
    // var jsonresult=getClosestUsersTo(name);
    // console.log("hello",getClosestUsersTo(name));
    // console.log('here it is');
    // console.log(jsonresult);
    // res.send(jsonresult);
    var user_data = db.collection('users').doc(name).get()
    
    .then(doc => {
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            console.log('Document data:', doc.data());
            // return JSON.stringify(doc.data());
            console.log('again',doc.data());
            // return JSON.stringify(doc.data());
            result=doc.data()['orderedCompanions'];
            res.send(result);
        }
    }).then(function(){
        return result;
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
});

// Gets the array of
// function getClosestUsersTo(name) {
//     // var doc_result = db.collection('users').doc(name).collection('dest').get();
//     var result={};
//     var user_data = db.collection('users').doc(name).get()
    
//     .then(doc => {
//         if (!doc.exists) {
//             console.log('No such document!');
//         } else {
//             console.log('Document data:', doc.data());
//             // return JSON.stringify(doc.data());
//             console.log('again',doc.data());
//             // return JSON.stringify(doc.data());
//             result=doc.data();
//         }
//     }).then(function(){
//         return result;
//     })
//     .catch(err => {
//         console.log('Error getting document', err);
//     });
    
//     // var closestUsers = user_data;
//     // return closestUsers;

// }


app.listen(3000, () => console.log('Example app listening on port 3000!'))
/****************************************************************************************/
// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyAjf0slvgGxRlI5wujzu8Nsp-_SJgsmsb4",
//     authDomain: "companion-app-e1b98.firebaseapp.com",
//     databaseURL: "https://companion-app-e1b98.firebaseio.com",
//     projectId: "companion-app-e1b98",
//     storageBucket: "companion-app-e1b98.appspot.com",
//     messagingSenderId: "843176657895"
// };
// firebase.initializeApp(config);