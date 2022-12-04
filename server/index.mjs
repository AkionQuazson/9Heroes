#!/usr/bin/nodejs

import In from '/etc/node/In.mjs';
import { 
  login, 
  register, 
  getHeroes, 
  saveStatus
} from './controller.mjs';

console.log('content-type: application/json');
console.log('Access-Control-Allow-Origin: https://homelightarchive.com\n');

const route = process.env.QUERY_STRING || process.argv[2];

let input = {};
const main = async () => {
  // app.get("/api/login", login);
  
  // app.post("/api/register", register);
  
  if (route === '/heroes'){
    process.stdout.write(JSON.stringify(await getHeroes()));
  }
  
  // app.get("/api/save", saveStatus);
  
}

await In(async (userInput) => {input = userInput; await main();})