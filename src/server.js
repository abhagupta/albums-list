'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'prod';

const MongoClient = require('mongodb').MongoClient;
const config = require('../config');

app.set('env', ENV);

app.use(bodyParser.json());

let db;

MongoClient.connect(config.MONGO_URL, { useNewUrlParser: true }, (err, client) => {
    if (err) return console.log(err);
    db = client.db('albums-list');
    app.listen(port, () => {
        console.log('Listening at 3000');
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/albums', (req, res) => {
    db.collection('albums-list').find().toArray((err, results) => {
        res.send(results);
    });
});