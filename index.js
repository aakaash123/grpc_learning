const express = require('express');
const grpc = require('grpc');

const app = express();

const protoPath = require('path').join(__dirname, 'proto');
const proto = grpc.load({root: protoPath, file: 'auth.proto' });

const client = new proto.auth.AuthService('localhost:50050', grpc.credentials.createInsecure());

const port = 3000;

app.get('/', (req, res) => {
  client.varify({ number: '9695960616' }, (error, response) => {
    if (!error) {
      if (response.exists) {
        console.log("The current number exists in our database");
      } else {
        console.log("The current number does not exist in our database");
      }
    } else {
      console.log("Error:", error.message);
    }
  });
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
