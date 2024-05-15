// utils/redis.js

const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        // Create a client to Redis
        this.client = redis.createClient();

        // Display any errors in the console
        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    async isAlive() {
        // Check if the connection to Redis is successful
        return new Promise((resolve) => {
            this.client.ping('alive', (err, reply) => {
                resolve(reply === 'alive');
            });
        });
    }

    async get(key) {
        // Retrieve the Redis value stored for the given key
        const getAsync = promisify(this.client.get).bind(this.client);
        return getAsync(key);
    }

    async set(key, value, durationInSeconds) {
        // Store a value in Redis with an expiration set by the duration argument
        const setAsync = promisify(this.client.setex).bind(this.client);
        return setAsync(key, durationInSeconds, value);
    }

    async del(key) {
        // Remove the value in Redis for the given key
        const delAsync = promisify(this.client.del).bind(this.client);
        return delAsync(key);
    }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
module.exports = redisClient;
