import express from 'express';
import {emailQueue} from './worker.js';

const app = express();
app.use(express.json());    

app.post('/welcome-email', async (req, res) => {
    const job = emailQueue.add('send-welcome-email', {
        to: req.body.to,
        name: req.body.name || 'Welcome!',
    },
    {
        attempts: 3, // Retry up to 3 times if the job fails
        backoff: {
            type: 'exponential', // Use exponential backoff for retries
            delay: 1000, // Initial delay of 1 second
        },
    }
    );
    res.json({ message: "Welcome email job added to the queue:", jobId: job.id});
});

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
