import redis from 'ioredis';

const subscriber = new redis(process.env.REDIS_URL || 'redis://localhost:6379');

subscriber.subscribe('notifications', (err) => {
    if (err) {
        console.error('Failed to subscribe: %s', err.message);
    } else {
        console.log('Successfully subscribed to notifications');
    }
});

subscriber.on('message', (channel, message) => {
    console.log("Received on ", channel, ":",   JSON.parse(message));
    // Here you can add logic to handle the notification, e.g., send an email, push notification, etc.
});