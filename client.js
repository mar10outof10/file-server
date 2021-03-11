const net = require('net');

const stdin = process.stdin;
stdin.setEncoding('utf8');

const client = net.createConnection({
  host: 'localhost',
  port: '3000'
});

client.setEncoding('utf8');

client.on("data", (data) => {
  console.log(data);
});

stdin.on('data', (input) => {
  client.write(input);
});