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

const atks = {
    Archer:(targets, luck, damage) => {
        let target = targets[0];
        for (let i = 1; i < targets.length; i++) {
            if (targets[i].priority < target.priority) {
                target = targets[i];
            }
        }
        target.health -= damage;
    },
    Assassin:(targets, luck, damage) => {
        let atkDmg = damage;
        if (luckRoll(luck)) {
            atkDmg *= 2;
        }
        let target = targets[0];
        target.health -= atkDmg;
    },
    Barbarian:(targets, luck, damage) => {
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
    },
    Cleric:(targets, luck, damage) => {
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
    },
    Cryomancer:(targets, luck, damage) => {
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
    },
    Geomancer:(targets, luck, damage) => {
        if (luckRoll(luck)){
            targets.forEach((enemy) => {
                enemy.health -= damage;
            })
        }
    },
    Knight:(targets, luck, damage) => {
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
    },
    Monk:(targets, luck, damage) => {
        let target = targets[0];
        do {
            for (let i = 1; i < targets.length; i++) {
                if (targets[i].priority < target.priority) {
                    target = targets[i];
                }
            }
            target.health -= damage;
        } while (luckRoll(luck) && target.health > 0);
    },
    Paladin:(targets, luck, damage) => {
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
    },
    Pyromancer:(targets, luck, damage) => {
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
        
    },
    Rogue:(targets, luck, damage) => {
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
    },
    Spellblade:(targets, luck, damage) => {
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
    }
}

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