const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { Client, GatewayIntentBits } = require('discord.js')
const api = require('./modules/embed')
const license = require('./modules/license')
const cors = require('cors')
const ejs = require('ejs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
})

client.once('ready', () => {
  console.log('Volt Scripts API is Online!')
})

app.use(express.json());

app.use(cors());
app.options('*', cors());

app.engine('html', ejs.renderFile);

app.post('/discord/product', async (req, res) => {
  const [isValid, user] = await license.validate(req.body.key)

  if (!isValid) {
    res.status(404).send('License not found.');
    return false;
  }
  if (isValid) {
    const publicChannel = client.channels.cache.get('...') || await client.channels.fetch('...');
    const secretChannel = client.channels.cache.get('...') || await client.channels.fetch('...');
    console.log(publicChannel)
    api.publicWebhook(req.body, publicChannel)
    api.secretWebhook(req.body, user, secretChannel)
    res.status(200).send('Message sent.');
    return true
  }
})

app.post('/discord/devtools', async (req, res) => {
  if (req.body.key === '...-...-...-...') return true
  const [isValid, user] = await license.validate(req.body.key)

  if (!isValid) {
    res.status(404).send('License not found.');
    return false;
  }
  if (isValid) {
    const channel = client.channels.cache.get('...') || await client.channels.fetch('...');
    console.log(channel)
    api.devtools(req.body, user, channel)
    res.status(200).send('Message sent.');
    return true
  }
})

app.get('/captcha/harvester', async (req, res) => {
  res.render(__dirname + "/pages/captcha.html");
  res.status(200).send();
})

//basic heartbeat route to check if server is running
app.get('/', async (req, res) => {
  res.send();
})

// 404 Route
app.use(function(req, res) {
  res.status(404).send('Page not found');
});

//start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

client.login('...');