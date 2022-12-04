const mouse = {
	x: null,
	y: null
}

const luckRoll = (chance) => {
    const roll = Math.ceil(Math.random() * 100);
    return (chance >= roll);
};

const waypoints = [
	{x:-160, y:352}, 
	{x:224, y:352}, 
	{x:224, y:672}, 
	{x:544, y:672}, 
	{x:544, y:224}, 
	{x:160, y:224}, 
	{x:160, y:96}, 
	{x:1120, y:96}, 
	{x:1120, y:288}, 
	{x:800, y:288}, 
	{x:800, y:608}, 
	{x:992, y:608}
];
const towerSpaces = [
	[true, true, false, true, true, false, true, true, true, true, true, false, true, true, false, true, true, false, false, false],
	[true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
	[true, true, false, true, false, true, true, false, true, true, false, true, true, true, true, false, true, false, false, false],
	[false, true, false, false, false, false, false, false, false, true, true, false, true, false, false, true, true, false, false, false],
	[true, true, true, true, true, true, true, false, false, false, true, false, false, false, false, false, false, false, false, false],
	[false, false, false, false, true, false, true, true, false, false, false, true, false, true, true, true, false, false, false, false],
	[true, true, true, false, true, false, true, true, false, false, false, false, false, true, true, true, true, false, false, false],
	[true, true, false, false, false, true, true, false, false, true, false, false, false, true, false, false, false, false, false, false],
	[true, false, true, false, true, false, false, true, false, true, true, false, false, false, true, false, false, false, true, true],
	[true, true, false, false, true, true, false, true, false, true, true, true, false, false, false, false, false, false, false, false],
	[true, false, true, false, false, false, false, false, false, false, true, false, true, true, false, false, true, false, false, true],
	[true, true, true, true, true, true, true, false, true, true, true, true, true, false, true, false, true, true, false, true]
]
const allEnemies = {
	bat: {img:'img/enemies/bat.png', damage:1, speed:3, health:10, priority:4, stunned:false, rating:5},
	cavesnare: {img:'img/enemies/cavesnare.png', damage:1, speed:1, health:14, priority:3, stunned:true, rating:1},
	clunker: {img:'img/enemies/clunker.png', damage:5, speed:1, health:20, priority:1, stunned:true, rating:4},
	demon: {img:'img/enemies/demon.png', damage:4, speed:2, health:26, priority:4, stunned:false, rating:13},
	dragon: {img:'img/enemies/dragon.png', damage:10, speed:4, health:30, priority:1, stunned:true, rating:40},
	elemental: {img:'img/enemies/elemental.png', damage:1, speed:2, health:27, priority:3, stunned:true, rating:5},
	faerie: {img:'img/enemies/faerie.png', damage:1, speed:3, health:4, priority:5, stunned:false, rating:6},
	goblin: {img:'img/enemies/goblin.png', damage:1, speed:2, health:8, priority:3, stunned:false, rating:2},
	lich: {img:'img/enemies/lich.png', damage:4, speed:2, health:12, priority:5, stunned:false, rating:12},
	orc: {img:'img/enemies/orc.png', damage:2, speed:2, health:12, priority:2, stunned:false, rating:4},
	rat: {img:'img/enemies/rat.png', damage:1, speed:3, health:6, priority:3, stunned:false, rating:3},
	scorpion: {img:'img/enemies/scorpion.png', damage:3, speed:2, health:12, priority:2, stunned:false, rating:7},
	skeleton: {img:'img/enemies/skeleton.png', damage:1, speed:2, health:6, priority:1, stunned:false, rating:1},
	slime: {img:'img/enemies/slime.png', damage:0, speed:2, health:20, priority:1, stunned:false, rating:1},
	smogwing: { img:'img/enemies/smogwing.png', damage:1, speed:3, health:6, priority:2, stunned:false, rating:3},
	spider: {img:'img/enemies/spider.png', damage:1, speed:2, health:14, priority:3, stunned:false, rating:4},
	zombie: {img:'img/enemies/zombie.png', damage:1, speed:1, health:18, priority:3, stunned:true, rating:2}
}

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
let heroes = [...allHeroes]
while (heroes.length > 9) {
	const rand = Math.floor(Math.random() * heroes.length);
	heroes.splice(rand, 1);
}

heroes.forEach((hero, i) => {
	heroes[i] = new Hero(hero);
});

let placementTiles = [];
towerSpaces.forEach((row, y) => {
	row.forEach((symbol, x) => {
		if (symbol){
			placementTiles.push(
				new PlacableSpace({
					position: {
						x: x * 64, 
						y: y * 64
					}
				})
			)
		}
	})
})