const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '7d37c89ddd2047fab01e3d1c7ef5b293',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let animals = [];

rollbar.log('Hello Avery');

app.post('/api/animals', (req,res) => {
    let { animal } = req.body

    const index = animals.findIndex((animalName) => {
        animalName === animal
    })

    try {
        if (index === -1 && animal !== ''){
            animals.push(animal)
            rollbar.log('animal added successfully', {author: 'avery', type: 'manual'})
            res.status(200).send(animals)
        } else if (animal === '') {
            rollbar.error('no animal provided')
            res.status(400).send('must provide an animal')
        } else {
            rollbar.error('animal already exists')
            res.status(400).send('that animal already exists')
        }
    } catch (err) {
        rollbar.error(err)
    }
});


const port = process.env.PORT || 4000;
app.use(rollbar.errorHandler());
app.listen(port, function(){console.log(`server working on ${port}`)})