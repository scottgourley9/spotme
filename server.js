var express = require('express');
var jwt = require('jwt-simple')
var moment = require('moment')
var bodyParser = require('body-parser');
var massive = require('massive');
var connectionString = "postgres://postgres:pass1234@localhost/spotme";
// var connectionString = config.connectionString;
var db = massive.connectSync({ db : "spotme"});
var massiveInstance = massive.connectSync({connectionString : connectionString})
var app = module.exports = express();

app.set('db', db);

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())


var createJWT = (user) => {
  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, 'mytestsecret')
}

//require the Twilio module and create a REST client
var client = require('twilio')('AC0050222b2c12244e5e56b37c7cd82824', '0876ad8ae136e8ff0b78261cf59964ee');

//Send an SMS text message
app.post('/api/sendmessage', function(req, res){
  client.sendMessage({

      to:req.body.phone, // Any number Twilio can deliver to
      from: '+13858812619', // A number you bought from Twilio and can use for outbound communication
      body: req.body.message + " " + req.body.link// body of the SMS message
      // mediaUrl: req.body.image
  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if(err){
      console.log(err);
      res.status(500).json(err)
    }
      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1
           // outputs "word to your mother."
          res.status(200).json({sent: true})
      }
  });
})
//USER ENDPOINTS
app.post('/auth/signup', function(req, res){
  db.create_new_user([req.body.business, req.body.first, req.body.last, req.body.phone, req.body.email, req.body.password], function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).send({
        token: createJWT(user[0])
      })
    }
  })
})

app.post('/auth/login', function(req, res){
  db.get_user([req.body.email], function(err, user){
      if (err) return res.status(500)
      if (!user[0]) {
        return res.status(401).send({
          message: 'Invalid email and/or password'
        })
      }

      if(req.body.password === user[0].password) {
        res.send({
          token: createJWT(user[0])
        })
      }
      else {
        return res.status(401).send({
          message: 'Invalid email and/or password'
        })
      }


      })
    })

app.post('/api/customers', function(req, res){
  db.find_customer([req.body.email, req.body.userid], function(err, theUser){
    if(!theUser.length){
      db.add_customer([req.body.first, req.body.last, req.body.phone, req.body.email, req.body.userid], function(err, success){
        if(err){
          res.status(500).json(err)
        }
        else {
          res.status(200).json('success')
        }

      })
    }
    else {
      res.json('customer already exists')
    }
  })

})

app.get('/api/customers/:userid', function(req, res){
  db.get_customers([req.params.userid], function(err, customers){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(customers)
    }
  })
})

app.delete('/api/customers/:id', function(req, res){
  db.delete_customer([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.put('/api/customers/:id', function(req, res){
  db.update_customer([req.params.id, req.body.first, req.body.last, req.body.phone, req.body.email], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

//Location ENDPOINTS

app.get('/api/locations/:userId', function(req, res){
  db.get_locations([req.params.userId], function(err, locations){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(locations)
    }
  })
})
app.post('/api/locations', function(req, res){
  db.add_location([req.body.address, req.body.phone, req.body.link, req.body.userid], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }

  })
})
app.delete('/api/locations/:locationId', function(req, res){
  db.delete_location([req.params.locationId], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})
app.put('/api/locations/:locationId', function(req, res){
  db.update_location([req.params.locationId, req.body.address, req.body.phone, req.body.link], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})


// Campain ENDPOINTS

app.get('/api/campaigns/:userId', function(req, res){
  db.get_campaigns([req.params.userId], function(err, campaigns){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(campaigns)
    }
  })
})
app.post('/api/campaigns', function(req, res){
  db.add_campaign([req.body.name, req.body.image, req.body.message, req.body.status, req.body.userid], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }

  })
})
app.delete('/api/campaigns/:campaignId', function(req, res){
  db.delete_campaign([req.params.campaignId], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})
app.put('/api/campaigns/:campaignId', function(req, res){
  db.update_campaign([req.params.campaignId, req.body.name, req.body.image, req.body.message, req.body.status], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})




function ensureAuthenticated (req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header'
    })
  }
  var token = req.header('Authorization').split(' ')[1]

  var payload = null
  try {
    payload = jwt.decode(token, 'mytestsecret')
  } catch (err) {
    return res.status(401).send({
      message: err.message
    })
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({
      message: 'Token has expired'
    })
  }
  req.user = payload.sub
  next()
}

function adminEnsureAuthenticated (req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({
      message: 'Please make sure your request has an Authorization header'
    })
  }
  var token = req.header('Authorization').split(' ')[1]

  var payload = null
  try {
    payload = jwt.decode(token, constants.ADMIN_TOKEN_SECRET)
  } catch (err) {
    return res.status(401).send({
      message: err.message
    })
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({
      message: 'Token has expired'
    })
  }
  req.user = payload.sub
  next()
}




var port = 3000
app.listen(3000, function(){
  console.log('listening on port ' + port);
})
