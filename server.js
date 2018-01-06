var express = require('express');
var jwt = require('jwt-simple')
var moment = require('moment')
var bodyParser = require('body-parser');
var massive = require('massive');
var config = require('./config.js')
var connectionString = "postgres://" + config.connectString;
var axios = require('axios');
var bcrypt = require('bcrypt');
var cors = require('cors');
var saltRounds = 10;
var stripe = require('stripe')(config.stripe)
// var connectionString = config.connectionString;
//var db = massive.connectSync({ db : "spotme"});
var db = massive.connectSync({connectionString : connectionString})
var app = module.exports = express();

app.set('db', db);

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(cors())
// app.use(cors(corsOptions))

// var corsOptions = {
//   origin: 'http://www.yes-or-no.info'
// }

var createJWT = (user) => {
  var payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }
  return jwt.encode(payload, config.jwtSecret)
}

//require the Twilio module and create a REST client
var client = require('twilio')(config.twilio1, config.twilio2);

//Send an SMS text message
app.post('/api/sendmessage', function(req, res){
  if(req.body.image){
    client.sendMessage({
        to:req.body.phone, // Any number Twilio can deliver to
        from: config.fromNumber, // A number you bought from Twilio and can use for outbound communication
        body: req.body.message + " " + req.body.link,// body of the SMS message
        mediaUrl: req.body.image
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if(err){
        console.log(err);
        res.status(500).json(err)
      }
        if (!err) {
            res.status(200).json({sent: true})
        }
    })
  }
  else {
    client.sendMessage({
        to:req.body.phone, // Any number Twilio can deliver to
        from: config.fromNumber, // A number you bought from Twilio and can use for outbound communication
        body: req.body.message + " " + req.body.link // body of the SMS message
        // mediaUrl: req.body.image
    }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if(err){
        console.log(err);
        res.status(500).json(err)
      }
        if (!err) {
            res.status(200).json({sent: true})
        }
    })
  }


})

//STRIPE
app.post('/api/payment', function(req, res){

  stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      source: req.body.token,
      // customer: req.body.customerId,
      receipt_email: req.body.receipt_email
  }, function(err, charge) {
      if (err) {
          console.log(err);
          res.status(500).json('error')
      } else {
            res.status(200).json('success')

      }
  });
})

//PASSWORD
app.post('/api/password/:id', function(req, res){
  db.get_user_by_id([req.params.id], function(err, user){
    if(err){
      res.status(500).json(err)
      return
    }
  bcrypt.compare(req.body.input, user[0].password, function(err, resp) {
    if(resp) {
      res.status(200).json(true)
    }
    else {
      res.status(200).json(false)
    }
  })
  })

})
app.put('/api/password/:id', function(req, res){
  db.get_user_by_id([req.params.id], function(err, user){
    if(err){
      res.status(500).json(err)
      return
    }
    else {
      bcrypt.hash(req.body.input2, saltRounds, function(err, hash) {
        db.update_password([user[0].id, hash], function(err, success){
          if(err){
            res.status(500).json(err)
          }
          else {
            res.status(200).json('success')
          }
        })
      })
    }
  })

})
//USER ENDPOINTS
app.post('/auth/signup', function(req, res){
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {



  db.create_new_user([req.body.business, req.body.first, req.body.last, req.body.phone, req.body.email, hash, req.body.employeeCode, true, new Date()], function(err, user){
    if(err){
      res.json({message: 'already taken'})
    }
    else {
      res.status(200).send({
        token: createJWT(user[0])
      })
    }
  })
  })
})

app.post('/auth/login', function(req, res){
  db.get_user([req.body.email], function(err, user){
      if (err) return res.status(500)
      if (!user[0]) {
        return res.send({
          message: 'Invalid email and/or password'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, function(err, resp) {
        if(resp) {
          res.send({
            token: createJWT(user[0])
          })
        }
        else {
          res.send({
            message: 'Invalid email and/or password'
          })
        }
      })



      })
    })

app.post('/api/customers', function(req, res){
  db.find_customer([req.body.phonenumber, req.body.userid], function(err, theUser){
    if(!theUser.length){
      db.add_customer([req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.email, req.body.userid], function(err, success){
        if(err){
          res.status(500).json(err)
        }
        else {
          res.status(200).json(success[0])
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

app.get('/api/customer/:userid/:phone', function(req, res){
  db.get_customer([req.params.userid, req.params.phone], function(err, customer){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(customer)
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
  db.update_customer([req.params.id, req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.email], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.get('/api/user/:id', function(req, res){
  db.get_user_by_id([req.params.id], function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {

      res.status(200).json(user)
    }
  })
})
app.put('/api/user/:id', function(req, res){
  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  db.update_user([req.params.id, req.body.businessname, req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.email], function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(user)
    }
  // })
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
  var address = req.body.address.split(' ').join('+')
  axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + config.googleApiKey).then(function(theRes){
  db.add_location([req.body.address, req.body.phonenumber, req.body.link, req.body.userid, theRes.data.results[0].geometry.location.lat, theRes.data.results[0].geometry.location.lng, req.body.name], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }

  })
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
  var address = req.body.address.split(' ').join('+')
  axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + config.googleApiKey).then(function(theRes){

  db.update_location([req.params.locationId, req.body.address, req.body.phonenumber, req.body.link, theRes.data.results[0].geometry.location.lat, theRes.data.results[0].geometry.location.lng, req.body.name], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})
})


// Campaign ENDPOINTS

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
      res.status(200).json(success)
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

app.put('/api/updatecampaignstatus/:campaignId', function(req, res){
  console.log(req.body);
  db.remove_campaign_status([req.body.userid], function(err, success){
    db.update_campaign_status([req.params.campaignId], function(err, yeah){
      if(err){
        res.status(500).json(err)
      }
      else {
        res.status(200).json('success')
      }
    })
  })
})

app.get('/api/getactivecampaign/:id', function(req, res){
  db.get_active_campaign([req.params.id], function(err, campaigns){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(campaigns)
    }
  })
})

// Links ENDPOINTS
app.get('/api/links/:id', function(req, res){
  db.get_links([req.params.id], function(err, links){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(links)
    }
  })
})

app.get('/api/link/:id', function(req, res){
  db.get_link([req.params.id], function(err, link){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(link)
    }
  })
})

app.post('/api/links', function(req, res){
  db.add_link([req.body.name, req.body.reviewlink, req.body.locationId], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.put('/api/links', function(req, res){
  db.update_link([req.body.id, req.body.name, req.body.reviewlink], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

app.delete('/api/links/:id', function(req, res){
  db.delete_link([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')
    }
  })
})

// Message ENDPOINTS

app.post('/api/messages', function(req, res){
  db.add_message([req.body.senttime, req.body.message, req.body.linkid, req.body.userid, req.body.customerid, req.body.linktype], function(err, messageId){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(messageId[0])
    }
  })
})

app.get('/api/messages/:userId', function(req, res){
  db.get_messages([req.params.userId], function(err, messages){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(messages)
    }
  })
})

app.put('/api/positivemessage/:id/:customerId/:userId', function(req, res){
  db.positive_message([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      db.get_user_by_id([req.params.userId], function(err3, user){

      db.get_one_customer([req.params.customerId], function(err2, customer){

      client.sendMessage({
          to: user[0].phonenumber, // Any number Twilio can deliver to
          from: config.fromNumber, // A number you bought from Twilio and can use for outbound communication
          body: 'Customer ' + customer[0].firstname + ' ' + customer[0].lastname + ' gave positive feedback!'
      }, function(err, responseData) { //this function is executed when a response is received from Twilio
        if(err){
          console.log(err);
          res.status(500).json(err)
        }
          if (!err) {
            console.log(responseData);
              res.status(200).json({sent: true})
          }
      })
    })
  })
    }
  })
})

app.put('/api/negativemessage/:id', function(req, res){
  db.negative_message([req.params.id], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('success')

    }
  })
})

app.post('/api/complaint/:id/:complaint/:customerId/:userId', function(req, res){
  db.complaint([req.params.id, req.params.complaint], function(err, success){
    if(err){
      res.status(500).json(err)
    }
    else {
      db.get_user_by_id([req.params.userId], function(err3, user){
      db.get_one_customer([req.params.customerId], function(err2, customer){


      client.sendMessage({
          to: user[0].phonenumber, // Any number Twilio can deliver to
          from: config.fromNumber, // A number you bought from Twilio and can use for outbound communication
          body: 'Customer ' + customer[0].firstname + ' ' + customer[0].lastname + ' gave negative feedback... Message: "' + req.params.complaint + '"' // body of the SMS message
      }, function(err, responseData) { //this function is executed when a response is received from Twilio
        if(err){
          console.log(err);
          res.status(500).json(err)
        }
          if (!err) {
            console.log(responseData);
              res.status(200).json({sent: true})
          }
      })
      })
      })
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
    payload = jwt.decode(token, config.jwtSecret)
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
  // var token = req.body.token;
  var payload = null
  try {
    payload = jwt.decode(token, config.jwtSecret)
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
  if (payload.sub.admin) {
      req.user = payload.sub
      next()
  } else {
      return res.status(401).send({
          message: 'Unauthorized'
      });
  }
}

app.get('/admin/getusers', adminEnsureAuthenticated, function(req, res){
    db.admin_get_all_users([], function(err, users) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(users);
        }
    })
});
app.get('/admin/getuser/:id', adminEnsureAuthenticated, function(req, res){
    db.admin_get_user_by_id([req.params.id], function(err, user) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(user[0]);
        }
    })
});

app.post('/admin/adduser', adminEnsureAuthenticated, function(req, res){
    console.log('what up', req.user);
});
app.put('/admin/updateuser', adminEnsureAuthenticated, function(req, res){
    db.admin_update_user([req.body.id, req.body.businessname, req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.email, req.body.paid, req.body.admin, req.body.freetrial, req.body.freetrialstart], function(err, success) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json('Successfully Updated');
        }
    })
});
app.delete('/admin/deleteuser', adminEnsureAuthenticated, function(req, res){
    console.log('what up', req.user);
});





app.listen(config.port, function(){
  console.log('listening on port ' + config.port);
})
