import { Svix } from 'svix';
import express from 'express';
import axios from 'axios';

import { API_KEY } from './config.js';

const server = express();
server.use(express.json());

const svix = new Svix(API_KEY);

// creates application per user
//const app = await svix.application.create({ "uid": "unique_id", "name": "test_1" });
//const app = 'app_1wNBs3UwwspFo4qZf6qxSs90Jgr'

server.get('/', (req, res) => {
  res.send('hello world');
})

server.delete('/delete', async (req, res) => {
  await svix.application.delete('test_1');
  res.send('success');

})

server.post('/dashboard', async (req, res) => {
  const dashboardAccessOut = await svix.authentication.get('test_1');
  res.send(dashboardAccessOut);
  console.log(dashboardAccessOut);
})

server.post('/createEndpoint', async (req, res) => {
  const body = req.body;

  return await svix.endpoint.create('test_two', {
    "url": "https://webhook.site/e0d1519b-5d04-4588-88d3-c556a2565929",
    "version": 1,
    "description": "Webhook.site link",
    "filterTypes": [
      "invoice.paid"
    ]
   })
   .then((response) => {
    res.json(response);
   })
   .catch((err) => {
     res.json(err);
   })
})

server.post('/createMessage', async (req, res) => {
  return await svix.message.create('test_two', {
    "eventType": "invoice.paid",
    "payload": {
      "status": "successful",
      "message": "test again again"
    }
  })
  .then((res) => { 
    res.send(res);
  })
  .catch((err) => {
    res.send(err);
  })
});


server.listen(3000, () => {
  console.log('Server Started!');
});
