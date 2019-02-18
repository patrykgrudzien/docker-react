const express = require('express');
const redis = require('redis'); // redis client

const app = express();
const client = redis.createClient(); // connecting to redis server

client.set('visits', 0);

app.get('/', (request, response) => {
    client.get('visits', (error, visits) => {
        response.send(`Number of visits is ${visits}`);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081...');
});