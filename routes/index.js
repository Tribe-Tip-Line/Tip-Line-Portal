/* NodeJs mongodb tutorial - insert update delete records */

var express = require('express');

var router = express.Router();

var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;

var bcrypt = require('bcryptjs');
const saltRounds = 10;

var dburl = "mongodb://tipdev:tipdev123567@ds123534.mlab.com:23534/tiplineapplication";

const cryptoRandomString = require('crypto-random-string');

router.get('/', function(req, res, next) {
    res.redirect('/login');
});

router.get('/login', function(req, res, next) {
  res.render('login.jade', {title: 'Tip Line: Login'});
});

router.get('/registration', function(req, res, next) {
  res.render('registration.jade', {title: 'Tip Line: Registration'});
});

router.get('/reports', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('reports').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('report.jade', {title: 'Tip Line: Reports', data: docs});

      db.close();

    });

  });

});


router.get('/users', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('users').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('user.jade', {title: 'Tip Line: Users', data: docs});

      db.close();

    });

  });

});

router.get('/keys', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('registration_keys').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('key.jade', {title: 'Tip Line: Keys', data: docs});

      db.close();

    });

  });

});


router.get('/numbers', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) {  console.log(err); throw err;  }

    data = '';

    db.collection('hotline_numbers').find().toArray(function(err, docs){

      if(err) throw err;

      res.render('hotline.jade', {title: 'Tip Line: Hotline Numbers', data: docs});

      db.close();

    });

  });

});

router.post('/addUser', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err;  }

    var collection = db.collection('users');

    var user = {  FirstName: req.body.FirstName,  LastName: req.body.LastName, Email: req.body.Email, Phone_Number: req.body.Phone_Number, Company: req.body.Company, Location: req.body.Location };

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
    
    var strVal = cryptoRandomString(10);

    var key = {  key: strVal };

    collection.insert(key, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/keys');
  });

  });

});

router.post('/addNumber', function(req, res, next) {

  MongoClient.connect(dburl, function(err, db) {

    if(err) { throw err;  }

    var collection = db.collection('hotline_numbers');

    var number = {  country: req.body.country, number: req.body.number };

    collection.insert(number, function(err, result) {

    if(err) { throw err; }

      db.close();

      res.redirect('/numbers');
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

router.get('/fetchdataNumber', function(req, res, next) {

   var id = req.query.id;

   MongoClient.connect(dburl, function(err, db) {

    if(err) {  throw err;  }

    db.collection('hotline_numbers').find({_id: new mongodb.ObjectID(id)}).toArray(function(err, docs){

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
    var status = req.body.status;
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, 
    { $set: {'status': status } }, function(err, result) { 
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
    var Phone_Number = req.body.Phone_Number;
    var Company = req.body.Company;
    var Location = req.body.Location;
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, 
    { $set: {'FirstName': FirstName, 'LastName': LastName, 'Email': Email, 'Phone_Number': Phone_Number, 'Company': Company, 'Location': Location } }, function(err, result) { 
      if(err) { throw err; } 
      db.close();
      res.redirect('/users');
    });
  });
});

router.post('/editNumber', function(req, res, next){
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err; }
    var collection   = db.collection('hotline_numbers');
    var country = req.body.country;
    var number = req.body.number;
    collection.update({'_id':new mongodb.ObjectID(req.body.id)}, 
    { $set: {'country': country, 'number': number } }, function(err, result) { 
      if(err) { throw err; } 
      db.close();
      res.redirect('/numbers'); 
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

router.get('/banUser', function(req, res, next) {
  var id = req.query.user_id;
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    var collection   = db.collection('users');
    collection.update({'_id':new mongodb.ObjectID(id)}, 
    { $set: {'Ban_Status': 'true' } }, function(err, result) { 
      if(err) { throw err; } 
      db.close();
      res.redirect('/reports'); 
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

router.get('/deleteNumber', function(req, res, next) {
  var id = req.query.id;
  MongoClient.connect(dburl, function(err, db) {
    if(err) { throw err;  }
    db.collection('hotline_numbers', function(err, reports) {
      reports.deleteOne({_id: new mongodb.ObjectID(id)});
      if (err){
       throw err;
      }else{
         db.close();
          res.redirect('/numbers');
      }
    });
  });
});

//
//Login and Registration JS things
//

router.post('/attemptLogin', function (req, res) {
  MongoClient.connect(dburl, function(err, db) {
    if (err) { throw err; }
    var collection = db.collection('admins');
    var adminInfo = collection.findOne({'Username': req.body.username});

    adminInfo.then(function(information) {
      if (information != null) {
        var hashedPass = information.Password;
        console.log(hashedPass);
        bcrypt.compare(req.body.password, hashedPass, function(err, result) {
          console.log(result);
          if (result == true) {
            res.redirect('/reports');
          } else {
            res.render('login.jade', {title: 'Tip Line: Login', error: 'Password is incorrect'});
          }
        });
      } else {
        res.render('login.jade', {title: 'Tip Line: Login', error: 'Invalid Username'});
      }
    });
  });
});

router.post('/registerAdmin', function (req, res) {
  if (req.body.password === req.body.passwordConfirm) {
    MongoClient.connect(dburl, function(err, db) {
      if (err) { throw err; }
      var collection = db.collection('admins');
      var adminInfo = collection.find({'Username': req.body.username});
      var adminExists = adminInfo.count().then(function(numItems) {
        if (numItems >= 1) {
          res.render('registration.jade', {title: 'Tip Line: Registration', error: 'Username already exists'});
        } else {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            // hash the password along with our new salt
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) return next(err);
                // override the cleartext password with the hashed one
                var password = hash;
                collection.insertOne({'Username': req.body.username, 'Password': password});
            });
            res.redirect('/');
          });s
        }
      });
    });
  } else {
    res.render('registration.jade', {title: 'Tip Line: Registration', error: "Passwords don't match up"});
  }
});




module.exports = router;