const fs = require('fs');
const path = require('path');
const net = require('net');
const S = require('string');
const port = 8124;

var id = 0; 
let clientId;
var nameDir;

const server = net.createServer((client) => {
  console.log('--------------- Connected client: ' + (++id) + ' ---------------');
  client.setEncoding('utf8');

  client.on('data', (data) => {
    String(data);
    console.log(data);
    if(data == 'FILES'){      
      client.write('ASK');
    }
    else if(data == 'DEC') {
      client.write('DEC');
    }
     else if(data == 'arr'){
    
      nameDir =path.join(process.env.DIR ,'Client' + id);
      console.log(nameDir);
      fs.mkdir(nameDir, function (err, data) {
  
      fs.readFile("client-files"+id+".txt", "utf8", function(error,data){
        if(error) {
          console.log(error); 
        }

        if(data!=null){
        //  let dirrs = data.split(',');
         // dirrs.forEach(function(d){
            filewalker(String(data));
        //  });
        }
      });
      });    
      client.write('DEC');
    }
  });

  function filewalker(dir) {

    if(dir!=null){
      fs.readdir(dir, function(err, list) {
      if (err) {
        console.log(err);
      }

      list.forEach(function(file){
        file = path.join(dir, file);

        fs.stat(file, function(err, stat){
          if(err){
            console.log(err);
          }
    
          if (stat && stat.isDirectory()) {
            filewalker(file, function(err, res){});
          }
          else{
          let f = path.basename(file);
          fs.createReadStream(file).pipe(fs.createWriteStream(path.join(nameDir, f)));
          }
        });
        
      });
    });
    }     
  }

  client.on('end', () => console.log('Client disconnected'));
});


server.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
});