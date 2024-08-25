const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
  
      defaultSrc: ["'self'"],
  
      scriptSrc: ["'self'", 'trusted-cdn.com']
      }
  },
  frameguard: {action: 'deny'},
  dnsPrefetchControl: false,
  hsts:{
    maxAge: 7776000, 
    force: true
  },
  
}));

app.use(helmet.hidePoweredBy());

app.use(helmet.xssFilter());

app.use(helmet.noSniff());

app.use(helmet.ieNoOpen());

app.use(helmet.noCache());




module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
