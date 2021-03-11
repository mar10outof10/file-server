const net = require('net');
const fs = require('fs');

const server = net.createServer();

server.listen('3000', () => {
  console.log('Server listening at port 3000!');
});

server.on('connection', (client) => {
  console.log('New client connected!');
  client.write('Hello');
  client.setEncoding('utf8');

  client.on('data', (data) => {
    let filePath = data.slice(0, -1); // must remove trailing newline character
    console.log('Request from client: ', filePath);
    console.log('Accessing file at, ', filePath);

    fs.readFile(filePath, 'utf8', (err, contents) => {
      if (err) {
        client.write('Invalid file name or file does not exist, please try again.');
        console.error(`Error: ENOENT: File does not exist`);
      } else {
        client.write(contents);
      }
    });

  });

});
