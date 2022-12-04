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