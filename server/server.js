const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
// We will need a const for our router here

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// We will need to do an app.use for the router here

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });
  