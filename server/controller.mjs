import postgres from 'postgres';
const db = postgres({database: 'spencer'});

const allHeroes = [
    {type:'Archer', img:'img/heroes/archer.png', range:3, damage:2, luck:0, experience:0},
    {type:'Assassin', img:'img/heroes/assassin.png', range:2, damage:2, luck:10, experience:0},
    {type:'Barbarian', img:'img/heroes/barbarian.png', range:1, damage:3, luck:15, experience:0},
    {type:'Cleric', img:'img/heroes/cleric.png', range:2, damage:1, luck:30, experience:0},
    {type:'Cryomancer', img:'img/heroes/cryomancer.png', range:2, damage:1, luck:25, experience:0},
    {type:'Geomancer', img:'img/heroes/geomancer.png', range:2, damage:1, luck:50, experience:0},
    {type:'Knight', img:'img/heroes/knight.png', range:1, damage:3, luck:25, experience:0},
    {type:'Monk', img:'img/heroes/monk.png', range:1, damage:1, luck:45, experience:0},
    {type:'Paladin', img:'img/heroes/paladin.png', range:1, damage:3, luck:0, experience:0},
    {type:'Pyromancer', img:'img/heroes/pyromancer.png', range:2, damage:2, luck:5, experience:0},
    {type:'Rogue', img:'img/heroes/rogue.png', range:1, damage:1, luck:20, experience:0},
    {type:'Spellblade', img:'img/heroes/spellblade.png', range:1, damage:3, luck:25, experience:0}
]

export const login = async () => {
        // const {user} = req.body;
        // const profile = await db`SELECT * FROM profiles WHERE username = ${user.username}`;
        //if profile.length === 0, return {dne: true}
        //else if password(hashed) !== profile.password, return {dne: true}
        //else return {dne: false}
    }
export const register = async () => {
        //const profile = await db`SELECT * FROM profiles WHERE username = ${user.username}`;
        //if username is already used.
        // get user from body
        // const user = {username:'asdf'}
        // const profile = await db`SELECT * FROM profiles WHERE username = ${user.username}`;
        //If username not used, add user 
        // if (profile.includes(user.username)) {

        // }
    }
export const getHeroes = async () => {
        let heroes = [];
        //if logged in, and has previous game
        // const profile = await db`SELECT * FROM profiles WHERE username = ${user.username}`;
        // const game = await db`SELECT * FROM games WHERE player_id = ${profile.id}`;
        // if game, load game.heroes, else run \/
        while (heroes.length < 9) {
            const rand = Math.floor(Math.random() * allHeroes.length);
            heroes.push(...allHeroes.splice(rand, 1));
        }

        //return selected heroes
        return heroes;
    }
export const saveStatus = async () => {
        //store gamestate
        // const profile = await db`SELECT * FROM profiles WHERE username = ${user.username}`;
        // const game = await db`SELECT * FROM gamestates WHERE player_id = ${profile.id}`;
        // if game, await db`DELETE * FROM gamestates WHERE player_id = ${profile.id}`;
        // then await db`INSERT (game) INTO gamestates VALUES (${data.gamestate})`;
        return;
    }