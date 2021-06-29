const express = require('express');
const path = require('path');
const app = express();
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '7d37c89ddd2047fab01e3d1c7ef5b293',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(express.json());

function students(){
    
}

app.get('/', function(req, res){
    rollbar.log("Hello Avery");
    res.sendFile(path.join(__dirname, '/public/index.html'))
});



const port = process.env.PORT || 4000;
app.listen(port, function(){console.log(`server working on ${port}`)})