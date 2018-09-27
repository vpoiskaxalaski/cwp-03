const dotenv = require('dotenv').load();
const fs = require('fs');
const net = require('net');
const port = 8124;

const client = new net.Socket();
client.setEncoding('utf8');

client.connect(port, function () {
  console.log('Connected');
  sendFILES(client);
});


client.on('data', function (data) {
  if(data == 'ASK'){  
  client.write('arr'); 
  }
  else if(data == 'DEC'){
    client.destroy();
  }
});


function sendFILES(client) {
  console.log('send FILES');
  client.write('FILES');
};

client.on('close', function () {
  console.log('Connection closed');
});

