'use strict';
var express = require('express');
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser');
var opn = require('opn');
const salesforce = require('./Salesforce/salesforce');

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/html5up-identity'));
app.use(express.static(__dirname + '/html5up-astral'));
 // js, css, images
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
const io = require('socket.io')(server);
io.on('connection', function(socket) {
  console.log('a user connected');
});

app.get('/', function(req, res) {
  res.sendfile('index.html');
});
app.get('/manager', function(req, res) {
  res.sendfile(__dirname + '/html5up-identity/index.html');
});
app.get('/roomfinder', function(req, res) {
  res.sendfile(__dirname + '/html5up-astral/index.html');
});

// Web UI
/* app.get('/', (req, res) => {
  console.log("came here");
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

 app.post('/index', (req, res) => {
  var username = req.body.username;
  console.log(username);
  res.sendFile(path.join(__dirname+ '/views/test.html'));
});
*/
io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);
    console.log("You are getting:" + text);
    if (text.includes("account" || "Accounts")) {
      salesforce.findAccountDetails().then(AccountDetails => {
        AccountDetails.forEach(AccountDetail => {
          socket.emit('bot reply', `Account Name: ${AccountDetail.get("Name")}`);
        });
      });
    } else if(text.includes("manager" || "managers")){
      socket.emit('bot reply', `success`);
     // window.location.replace("https://www.google.com");
     // ('/Users/SriharideepKolagani/Downloads/web-speech-ai-master/views/manager_profile.html');
    }
    else if(text.includes("room" || "dirac" || "take me to")){
      socket.emit('bot reply', `room`);
     // window.location.replace("https://www.google.com");
     // ('/Users/SriharideepKolagani/Downloads/web-speech-ai-master/views/manager_profile.html');
    }
    else
     {
      var aiText = "Hello Sri you are the best";
      //return res.redirect('/UserHomePage');
    }

    // Get a reply from API.ai

    //let apiaiReq = apiai.textRequest(text, {
    //  sessionId: APIAI_SESSION_ID
    //});

    //  apiaiReq.on('response', (response) => {
    //  let aiText = response.result.fulfillment.speech;
    //     console.log('Bot reply: ' + aiText);
    //    socket.emit('bot reply', aiText);
    //  });

    /*  apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end(); */

  });
});
