// main.js

import redisClient from './utils/redis';

(async () => {
    console.log(await redisClient.isAlive());
    console.log(await redisClient.get('myKey'));
    await redisClient.set('myKey', 12, 5);
    console.log(await redisClient.get('myKey'));

    setTimeout(async () => {
        console.log(await redisClient.get('myKey'));
    }, 10000); // 10 seconds
})();