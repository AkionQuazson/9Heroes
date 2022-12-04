#!/usr/bin/nodejs

import In from '/etc/node/In.mjs';
import { 
  login, 
  register, 
  getHeroes, 
  getMonsters,
  saveStatus
} from './controller.mjs';

console.log('content-type: text/html\n\n')

// const app = express();

// app.use(cors());

// app.use(express.json());

// app.get("/api/login", login);

// app.post("/api/register", register);

// app.get("/api/heroes", getHeroes);

// app.get("/api/monsters", getMonsters);

// app.get("/api/save", saveStatus);

// const port = 3000;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// });

