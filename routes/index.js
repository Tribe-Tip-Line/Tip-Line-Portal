/* NodeJs mongodb tutorial - insert update delete records */

var express = require('express');

var router = express.Router();

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var dburl = "mongodb://tipdev:tipdev123567@ds123534.mlab.com:23534/tiplineapplication";

/* GET reports listing. */
router.get('/', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('reports').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('index.jade', {data: docs});

      db.close();

    });

  });

});

router.post('/add', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err;  }

    var collection = db.collection('reports');

    var report = {  title: req.body.title,  location: req.body.location, time: req.body.time, date: req.body.date, flight_num: req.body.flight_num, status: req.body.status };

    collection.insert(report, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/');   
  });

  });

});

router.get('/fetchdata', function(req, res, next) {

   var id = req.query.id;

   MongoClient.connect(dburl, function(err, db) {

    if(err) {  throw err;  }

    db.collection('reports').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){

      if(err) throw err;

      res.send(docs);

      db.close();

    });

  });

});

router.post('/edit', function(req, res, next){ 

  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err; } 
    
    var collection   = db.collection('reports'); 

    var title = req.body.title;

    var location = req.body.location;

    var time = req.body.time;
      
    var date = req.body.date;
      
    var flight_num = req.body.flight_num;
      
    var status = req.body.status;
    
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, 
    { $set: {'title': title, 'location': location, 'time': time, date: date, flight_num: flight_num, status: status } }, function(err, result) { 

      if(err) { throw err; } 

      db.close(); 
      
      res.redirect('/'); 

    }); 

  });

});

router.get('/delete', function(req, res, next) {
 
  var id = req.query.id;
 
  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err;  }

    db.collection('reports', function(err, reports) {

      reports.deleteOne({_id: new mongodb.ObjectID(id)});

      if (err){
  
       throw err;
   
      }else{
    
         db.close();
          res.redirect('/');
    
       }

    });

  });

});

module.exports = router;