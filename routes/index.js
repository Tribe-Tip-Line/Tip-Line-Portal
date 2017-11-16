/* NodeJs mongodb tutorial - insert update delete records */

var express = require('express');

var router = express.Router();

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var dburl = "mongodb://tipdev:tipdev123567@ds123534.mlab.com:23534/tiplineapplication";

router.get('/', function(req, res, next) {
    res.redirect('/reports');
});

/* GET reports listing. */
router.get('/reports', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('reports').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('report.jade', {data: docs});

      db.close();

    });

  });

});

/* GET reports listing. */
router.get('/users', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('users').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('user.jade', {data: docs});

      db.close();

    });

  });

});

///* GET reports listing. */
//router.get('/numbers', function(req, res, next) {
//
//  MongoClient.connect(dburl, function(err, db) {
//
//    if(err) {  console.log(err); throw err;  }
//
//    data = '';
//
//    db.collection('reports').find().toArray(function(err, docs){
//
//      if(err) throw err;
//
//      res.render('index.jade', {data: docs});
//
//      db.close();
//
//    });
//
//  });
//
//});

/* GET reports listing. */
router.get('/keys', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('registration_keys').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('key.jade', {data: docs});

      db.close();

    });

  });

});

// ADD

router.post('/addReport', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err;  }

    var collection = db.collection('reports');

    var report = {  title: req.body.title,  location: req.body.location, time: req.body.time, date: req.body.date, flight_num: req.body.flight_num, status: req.body.status };

    collection.insert(report, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/reports');   
  });

  });

});

router.post('/addUser', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err;  }

    var collection = db.collection('users');

    var user = {  FirstName: req.body.FirstName,  LastName: req.body.LastName, Email: req.body.Email };

    collection.insert(user, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/users');   
  });

  });

});

router.post('/addKey', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err;  }

    var collection = db.collection('registration_keys');

    var key = {  key: req.body.key };

    collection.insert(key, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/keys');   
  });

  });

});

router.get('/fetchdataReport', function(req, res, next) {

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

router.get('/fetchdataUser', function(req, res, next) {

   var id = req.query.id;

   MongoClient.connect(dburl, function(err, db) {

    if(err) {  throw err;  }

    db.collection('users').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){

      if(err) throw err;

      res.send(docs);

      db.close();

    });

  });

});

router.get('/fetchdataKey', function(req, res, next) {

   var id = req.query.id;

   MongoClient.connect(dburl, function(err, db) {

    if(err) {  throw err;  }

    db.collection('registration_keys').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){

      if(err) throw err;

      res.send(docs);

      db.close();

    });

  });

});

router.post('/editReport', function(req, res, next){ 
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
      res.redirect('/reports'); 
    }); 
  });
});

router.post('/editUser', function(req, res, next){ 
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err; } 
    var collection   = db.collection('users'); 
    var FirstName = req.body.FirstName;
    var LastName = req.body.LastName;
    var Email = req.body.Email;
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, 
    { $set: {'FirstName': FirstName, 'LastName': LastName, 'Email': Email } }, function(err, result) { 
      if(err) { throw err; } 
      db.close(); 
      res.redirect('/users'); 
    }); 
  });
});

router.post('/editKey', function(req, res, next){ 
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err; } 
    var collection   = db.collection('registration_keys'); 
    var key = req.body.key;
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, 
    { $set: {'key': key} }, function(err, result) { 
      if(err) { throw err; } 
      db.close(); 
      res.redirect('/keys'); 
    }); 
  });
});

router.get('/deleteReport', function(req, res, next) {
  var id = req.query.id;
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    db.collection('reports', function(err, reports) {
      reports.deleteOne({_id: new mongodb.ObjectID(id)});
      if (err){
       throw err;
      }else{
         db.close();
          res.redirect('/reports');
      }
    });
  });
});

router.get('/deleteUser', function(req, res, next) {
  var id = req.query.id;
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    db.collection('users', function(err, reports) {
      reports.deleteOne({_id: new mongodb.ObjectID(id)});
      if (err){
       throw err;
      }else{
         db.close();
          res.redirect('/users');
      }
    });
  });
});

router.get('/deleteKey', function(req, res, next) {
  var id = req.query.id;
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    db.collection('registration_keys', function(err, reports) {
      reports.deleteOne({_id: new mongodb.ObjectID(id)});
      if (err){
       throw err;
      }else{
         db.close();
          res.redirect('/keys');
      }
    });
  });
});

module.exports = router;