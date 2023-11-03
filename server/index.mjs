#!/usr/bin/nodejs

import In from '/etc/node/In.v1.mjs';
import { 
  test,
  login, 
  register, 
  getHeroes, 
  saveStatus
} from './controller.mjs';

console.log('content-type: application/json');
console.log('Access-Control-Allow-Origin: https://homelightarchive.com\n');

//import Path from '/etc/node/Path.mjs';
//import * as fs from '/etc/node/SimpleFS.mjs';
//const { path } = Path(import.meta);
//const logPath = `${path}/app.log`;
//export const log = (...message) => fs.appendFile(logPath, ((Array.isArray(message)) ? message.join(' ') : message) + '\n');

const main = async (input) => {
  const route = input.route || process.argv[2];
  
  if (route === 'test') {
    console.log(await test())
  }
  
  if (route === 'login') {
    process.stdout.write(JSON.stringify(await login(input)));
  }
  
  if (route === 'register') {
    process.stdout.write(JSON.stringify(await register(input)));
  }

  if (route === 'heroes') {
//let heroes = await getHeroes(input);
//heroes = JSON.stringify(heroes);
    process.stdout.write(JSON.stringify(await getHeroes(input)));
    //process.stdout.write(heroes);
  }
  
  if (route === 'save') {
    process.stdout.write(JSON.stringify(await saveStatus(input)));
  }
  
}

In((userInput) => {main(userInput, {allowPost: false});});
