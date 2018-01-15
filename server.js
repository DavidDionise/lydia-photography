require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const Email = require('./utils/Email');

app.use(cors());
app.use(express.json());

app.post('/receive-message', async (req, res) => {
  const { name, email_address, subject, message } = req.body;
  const email_options = { name, email_address, subject, message };
  const email = new Email(email_options);
  try {
    await email.sendMail();
    res.json({ message: 'Success' });
  }
  catch(ex) {
    console.log('Error sending email', ex);
    res.status(500).json({ error: true, message: ex.message || ex });
  }
});

app.listen(port, () => {
  console.log(`Server Listening On Port ${port}`);
});
