const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.get('/api/supervisors', (req, res) => {
  const url = 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers';

  https.get(url, response => {
    let body = [];

    response.on('data', chunk => {
      body.push(chunk);
    });

    response.on('end', () => {
      let result = JSON.parse(Buffer.concat(body).toString());
      
      result.sort((a, b) => {
        if (a.lastName.toUpperCase() === b.lastName.toUpperCase()) {
          return a.firstName > b.firstName ? 1 : -1;
        }

        if (a.jurisdiction === b.jurisdiction) {
          return a.lastName > b.lastName ? 1 : -1;
        }

        return a.jurisdiction > b.jurisdiction ? 1 : -1;
      });

      res.send(result);
    });
  });
});

app.listen(port, () => {
  
});