#!/usr/bin/nodejs

import In from '/etc/node/In.mjs';
import { 
  test,
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
  // console.log(input);
  if (route === '/test') {
    console.log(await test())
  }
  
  if (route === '/login') {
    process.stdout.write(await login(input));
  }
  
  if (route === '/register') {
    process.stdout.write(JSON.stringify(await register(input)));
  }

  if (route === '/heroes') {
    process.stdout.write(JSON.stringify(await getHeroes(input)));
  }
  
  if (route === '/save') {
    process.stdout.write(JSON.stringify(await saveStatus(input)));
  }
  
}

await In(async (userInput) => {input = userInput; await main();})