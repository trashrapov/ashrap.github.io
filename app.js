var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/*const api = require('binance');
const binanceWS = new api.BinanceWS(true);

binanceWS.onDepthUpdate('BNBBTC', (data) => {
    console.log(data);
});*/







app.use(express.static(__dirname + '/dist'));

app.get('/', function (req, res) {
  
  res.sendFile(__dirname + '/index.html');
  
});

server.listen(3000, function () {
  
  console.log('Example app listening on port 3000!');

});


