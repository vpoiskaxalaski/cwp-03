const child_process = require('child_process');
const fs = require('fs');

const catalogs = process.argv[2];
const dirrs = catalogs.split('!');
let id = 0;

function client(){
	if(id<process.env.CLIENTS){
		fs.writeFile("client-files"+(id+1)+".txt", dirrs[id], function(){});
		console.log('client'+(id++)+' started')
		child_process.fork('client-qa.js');  
	}
				
}


function start(){
	setInterval(client, 4000);
}

start();
