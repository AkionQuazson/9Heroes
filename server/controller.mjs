import postgres from 'postgres';
const db = postgres({database: 'spencer'});

const allHeroes = [
    {type:'Archer', img:'img/heroes/archer.png', range:3, damage:2, luck:0, experience:0, atk:(targets, luck, damage) => {
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.health -= damage;
    }},
    {type:'Assassin', img:'img/heroes/assassin.png', range:2, damage:2, luck:10, experience:0, atk:(targets, luck, damage) => {
        let atkDmg = damage;
        if (luckRoll(luck)) {
            atkDmg *= 2;
        }
        let target = targets[0];
        target.health -= atkDmg;
    }},
    {type:'Barbarian', img:'img/heroes/barbarian.png', range:1, damage:3, luck:15, experience:0, atk:(targets, luck, damage) => {
            if (luckRoll(luck)){
            damage += 3;
        }
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.health -= damage;
    }},
    {type:'Cleric', img:'img/heroes/cleric.png', range:2, damage:1, luck:30, experience:0, atk:(targets, luck, damage) => {
        if (baseHealth < 20 && luckRoll(luck)) {
            baseHealth++;
        }
        
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.health -= damage;
    }},
    {type:'Cryomancer', img:'img/heroes/cryomancer.png', range:2, damage:1, luck:25, experience:0, atk:(targets, luck, damage) => {
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.stunned = true;
        if (luckRoll(luck)){
            target.health -= damage;
        }
    }},
    {type:'Geomancer', img:'img/heroes/geomancer.png', range:2, damage:1, luck:50, experience:0, atk:(targets, luck, damage) => {
        if (luckRoll(luck)){
            targets.forEach((enemy) => {
                enemy.health -= damage;
            })
        }
    }},
    {type:'Knight', img:'img/heroes/knight.png', range:1, damage:3, luck:25, experience:0, atk:(targets, luck, damage) => {
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.health -= damage;
        if (luckRoll(luck)) {
            target.stunned = true;
        }
    }},
    {type:'Monk', img:'img/heroes/monk.png', range:1, damage:1, luck:45, experience:0, atk:(targets, luck, damage) => {
        let target = targets[0];
        do {
            for (let i = 1; i < targets.length; i++) {
                if (targets[i].priority < target.priority) {
                    target = targets[i];
                }
            }
            target.health -= damage;
        } while (luckRoll(luck) && target.health > 0);
    }},
    {type:'Paladin', img:'img/heroes/paladin.png', range:1, damage:3, luck:0, experience:0, atk:(targets, luck, damage) => {
        const target = targets[0];
        if (
            target.img.includes('lich') ||
            target.img.includes('skeleton') ||
            target.img.includes('zombie') ||
            target.img.includes('demon') 
        ) {
            damage *= 2;
        }
        target.health -= damage;
    }},
    {type:'Pyromancer', img:'img/heroes/pyromancer.png', range:2, damage:2, luck:5, experience:0, atk:(targets, luck, damage) => {
        if (luckRoll(luck)){
            damage += 1;
        }
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.health -= damage;
        
    }},
    {type:'Rogue', img:'img/heroes/rogue.png', range:1, damage:1, luck:20, experience:0, atk:(targets, luck, damage) => {
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.health -= damage;
        if(luckRoll(luck)) {
            target.pulled = true;
        }
    }},
    {type:'Spellblade', img:'img/heroes/spellblade.png', range:1, damage:3, luck:25, experience:0, atk:(targets, luck, damage) => {
        if (luckRoll(luck)){
            targets.forEach((enemy) => {
                enemy.health -= damage;
            })
        }
        else {
            let target = targets[0];
            for (let i = 1; i < targets.length; i++) {
                if (targets[i].priority < target.priority) {
                    target = targets[i];
                }
            }
            target.health -= damage;
        }
    }}
]

export const login = async (req, res) => {
        const {user} = req.body;
        const profile = await db`SELECT * FROM profiles WHERE username = ${user.username}`;
    }
export const register = async (req, res) => {
        //Check if username is already used.
        //If username not used, add user 
    }
export const getHeroes = async (req, res) => {
        let heroes = [];
        //if logged in, and has previous game
        //send previous heroes, else
        while (heroes.length < 9) {
            const rand = Math.floor(Math.random() * allHeroes.length);
            heroes.push(...allHeroes.splice(rand, 1));
        }
        heroes.forEach((hero) => {
            delete hero.atk;
        });
        //return selected heroes
        return heroes;

    }
export const saveStatus = async (req, res) => {
        //store gamestate
        // await db``;
    }
    
