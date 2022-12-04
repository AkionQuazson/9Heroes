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

// console.log(route);

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.get("/api/login", login);

// app.post("/api/register", register);

// app.get("/api/heroes", getHeroes);
if (route === '/heroes'){
  const heroes = await getHeroes()
  process.stdout.write(JSON.stringify(heroes));
}
// app.get("/api/monsters", getMonsters);

// app.get("/api/save", saveStatus);

// const port = 3000;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// });

