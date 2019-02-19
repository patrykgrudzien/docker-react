const express = require('express');
const redis = require('redis'); // redis client
const app = express();
const process = require('process');

const client = redis.createClient({ // connecting to redis server
    // if we didn't use docker here, we'd have to put some address here like: 'https://my-redis-server.com'
    // but we use docker-compose so we can connect to the docker container only specifying its name
    host: 'redis-server', // it's a name exactly the same as specified in the (docker-compose.yml)
    port: 6379 // it's default port and there is no need to write it explicitly
});

client.set('visits', 0); // initial value

app.get('/', (request, response) => {

    // simulating that server crashes all the time when user visits root route
    process.exit(0); // "0" is an exit status code
    // "0" means that we exited and everything is OK
    // 1,2,3, etc... means that we exited because something went wrong!
    // based on that number, docker decides to restart or not

    client.get('visits', (error, visits) => {
        response.send(`Number of visits is ${visits}`);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081...');
});