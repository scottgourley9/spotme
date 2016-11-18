var express = require('express');
var bodyParser = require('body-parser');
// var massive = require('massive');
// var connectionString = "postgres://postgres:pass1234@localhost/spotme";
// var connectionString = config.connectionString;
// var db = massive.connectSync({ db : "spotme"});
var app = module.exports = express();

// app.set('db', db);

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())



//require the Twilio module and create a REST client
var client = require('twilio')('AC0050222b2c12244e5e56b37c7cd82824', '0876ad8ae136e8ff0b78261cf59964ee');

//Send an SMS text message
app.post('/api/sendmessage', function(req, res){
  console.log(req.body);
  req.body.test = 'www.cnn.com'
  client.sendMessage({

      to:req.body.to, // Any number Twilio can deliver to
      from: '+13858812619', // A number you bought from Twilio and can use for outbound communication
      body: req.body.message// body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio
    if(err){
      console.log(err);
    }
      if (!err) { // "err" is an error received during the request, if any

          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1
          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."

      }
  });
})




var port = 3000
app.listen(3000, function(){
  console.log('listening on port ' + port);
})
