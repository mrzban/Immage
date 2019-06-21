var express = require("express"),
  app = express(),
  server = require("http").Server(app),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 5000;

var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB, {
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Imagerec = require('./models/imagerec');

const Clarifai = require('clarifai');
var history = [];
var imgIndex = 0;

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const clarifai = new Clarifai.App({
  apiKey: 'f8dd703360fa4f4b82ded25856cd0b57'
});


function log(d) {
  try {
    console.log(JSON.stringify(d, null, 2));
    console.log("Error");
  } catch (e) {
    console.log("Error, resp: " + d);
  }
}

app.get("/history", function (req, res) {
  Imagerec.find(function (err, images) {
    if (err) {
      return res.send(err);
    }
    res.json(images);
  });

});

app.post("/examineImage", function (req, resp) {
  console.log(req.body);
  var imageURL = req.body.imageRequested.replace("data:image/jpeg;base64,", "");
  // console.log("Response was ", imageURL);

  clarifai.models.predict(Clarifai.GENERAL_MODEL, {
    base64: imageURL
  }).then(
    function (response) {
      // console.log('Request done!')
      var concepts = response['outputs'][0]['data']['concepts'];

      var objToSave = {
        concepts: concepts,
        imgbase64: req.body.imageRequested
      }
      history[imgIndex] = objToSave;

      var imgTodDb = new Imagerec(objToSave);

      imgTodDb.save(function (err) {
        if (err) {
          return console.log(err);
        }
      });
      console.log(history);
      imgIndex++;
      if (concepts) {
        resp.send(concepts);
      } else {
        resp.send(response)
      }

    },
    function (err) {
      console.log(error);
      resp.send(JSON.stringify({
        error: err
      }));
    }

  ).catch(function (d) {
    log(d);
    resp.send({
      error: "failed"
    });

  });

});

app.get(/^(.+)$/, function (req, res) {
  res.sendFile(__dirname + "/public/" + req.params[0]);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.listen(port, function () {
  console.log("Listening on " + port);
});