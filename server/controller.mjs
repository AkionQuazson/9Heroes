import postgres from 'postgres';
const db = postgres({database: 'spencer'});

const allHeroes = [
    {type:'Archer', img:'img/heroes/archer.gif', range:3, damage:2, luck:0, atk:() => {
        //Hit lowest priority number in range
    }},
    {type:'Assassin', img:'img/heroes/assassin.gif', range:2, damage:2, luck:10, atk:() => {
        //if luck roll, double damage for hit.
        //Hit first enemy in range.
    }},
    {type:'Barbarian', img:'img/heroes/barbarian.gif', range:1, damage:3, luck:15, atk:() => {
        //if luck roll, add 2 damage to hit
        //Hit lowest priority number in range
    }},
    {type:'Seer', img:'img/heroes/seer.gif', range:2, damage:1, luck:0, atk:() => {
        //For each ally within range, buff damage by my damage 
        //(remember to unbuff those who move away, and not buff multiple times)
    }},
    {type:'Cleric', img:'img/heroes/cleric.gif', range:2, damage:1, luck:10, atk:() => {
        //if base within range, heal 1 (not to exceed max)
        //if luck roll, hit lowest priority number in range
    }},
    {type:'Cryomancer', img:'img/heroes/cryomancer.gif', range:2, damage:1, luck:25, atk:() => {
        //Stun lowest priority number in range
        //if luck roll, hit target
    }},
    {type:'Geomancer', img:'img/heroes/geomancer.gif', range:2, damage:1, luck:50, atk:() => {
        //if luck roll, hit al enemies in range.
    }},
    {type:'Knight', img:'img/heroes/knight.gif', range:1, damage:3, luck:25, atk:() => {
        //hit highest priority number in range
        //if luck roll, stun target
    }},
    {type:'Monk', img:'img/heroes/monk.gif', range:1, damage:2, luck:35, atk:() => {
        //hit highest priority number in range
        //if luck roll, atk()
    }},
    {type:'Paladin', img:'img/heroes/paladin.gif', range:1, damage:3, luck:0, atk:() => {
        //hit first enemy. If target is skeleton/zombie/demon/lich, deal x2 damage
    }},
    {type:'Pyromancer', img:'img/heroes/pyromancer.gif', range:2, damage:2, luck:5, atk:() => {
        //if luck roll, deal +1 damage
        //hit lowest priority number in range
    }},
    {type:'Rogue', img:'img/heroes/rogue.gif', range:1, damage:1, luck:20, atk:() => {
        //hit lowest priority number in range
        //if luck roll, pull enemy back one space.
    }},
    {type:'Spellblade', img:'img/heroes/spellblade.gif', range:1, damage:3, luck:25, atk:() => {
        //hit lowest priority number in range
        //if luck roll, hit all enemies in range
    }}
]

const monsters = {
	clunker: {img:'img/monsters/clunker.gif', damage:5, speed:1, health:10, priority:1000, stunned:true, size:4, rating:4},
	slime: {img:'img/monsters/slime.gif', damage:0, speed:2, health:8, priority:1000, stunned:false, size:2, rating:1},
	goblin: {img:'img/monsters/goblin.gif', damage:1, speed:2, health:4, priority:3000, stunned:false, size:1, rating:3},
	bat: {img:'img/monsters/bat.gif', damage:1, speed:3, health:5, priority:4000, stunned:false, size:1, rating:6},
	dragon: {img:'img/monsters/dragon.gif', damage:10, speed:4, health:12, priority:1000, stunned:true, size:4, rating:40},
	zombie: {img:'img/monsters/zombie.gif', damage:1, speed:1, health:9, priority:3000, stunned:true, size:1, rating:2},
	skeleton: {img:'img/monsters/skeleton.gif', damage:1, speed:2, health:3, priority:1000, stunned:false, size:1, rating:1},
	lich: {img:'img/monsters/lich.gif', damage:4, speed:2, health:6, priority:5000, stunned:false, size:4, rating:12},
	spider: {img:'img/monsters/spider.gif', damage:1, speed:2, health:7, priority:3000, stunned:false, size:2, rating:4},
	rat: {img:'img/monsters/rat.gif', damage:1, speed:3, health:3, priority:3000, stunned:false, size:1, rating:4},
	faerie: {img:'img/monsters/faerie.gif', damage:1, speed:3, health:2, priority:5000, stunned:false, size:.5, rating:6},
	elemental: {img:'img/monsters/elemental.gif', damage:1, speed:2, health:15, priority:3000, stunned:true, size:4, rating:5},
	scorpion: {img:'img/monsters/scorpion.gif', damage:3, speed:2, health:6, priority:2000, stunned:false, size:1, rating:7},
	demon: {img:'img/monsters/demon.gif', damage:4, speed:2, health:13, priority:4000, stunned:false, size:2, rating:13},
	orc: {img:'img/monsters/orc.gif', damage:2, speed:2, health:6, priority:2000, stunned:false, size:1, rating:5},
	cavesnare: {img:'img/monsters/cavesnare.gif', damage:1, speed:1, health:7, priority:3000, stunned:true, size:2, rating:1},
	smogwing: { img:'img/monsters/smogwing.gif', damage:1, speed:3, health:3, priority:2000, stunned:false, size:2, rating:3}
};

module.exports = {
    login: async (req, res) => {
        const {user} = req.body;
        // const profile = await db`SELECT * FROM profiles WHERE username = ${user.username}`;
        res.sendStatus(200);
    }, 
    register: async (req, res) => {
        //Check if username is already used.
        //If username not used, add user 
        res.sendStatus(200);
    }, 
    getHeroes: async (req, res) => {
        let heroes = allHeroes;
        //if logged in, and has previous game
        //send previous heroes, else
        while (heroes.length > 9) {
            const rand = Math.floor(Math.random() * heroes.length);
            heroes.splice(rand, 1);
        }
        //return selected heroes
        res.status(200).send(heroes);

    }, 
    getMonsters: (req, res) => {
        //return Monsters options
        res.status(200).send(monsters);

    },
    saveStatus: async (req, res) => {
        //store gamestate
        // await db``;
    }
    
}