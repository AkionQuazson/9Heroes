import { saveStatus } from "../server/controller.mjs";

const canvas = dom.fields.mapSpace
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 768;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const castle = new Image();
castle.src = './img/castle.png'
const map = new Image()
map.onload = () => {
	animate();
}
map.src = './img/map1.png'

let selectedTile = null;
let selectedHero = null;
let turn = 'player';
let actions = 2;
let frames = 0;
let wave = 1;
let baseHealth = 20;


let activeEnemies = [];

const spawnEnemies = (wave) => {
	let power = 0;
	const maxPower = Math.floor(6 * wave ** (5/4));
	let offset = 128;
	while (power < maxPower){
		let selectable = [];
		for (const monster in allEnemies) {
			if (allEnemies[monster].rating <= maxPower - power) {
				selectable.push(monster)
			}
		}
		const selected = Math.floor(Math.random() * selectable.length);
		const selectedEnemy = allEnemies[selectable[selected]];
		activeEnemies.push(new Enemy(selectedEnemy, {x: waypoints[0].x + offset, y: waypoints[0].y}));
		offset -= 64;
		power += selectedEnemy.rating;
	}
}

const renderHeroes = () => {
	console.log(heroes);
	dom.fields.heroList.innerHTML = '<p class="vertical">HEROES</p>'
	heroes.forEach((hero) => {
		if (!hero.position) {
			hero.appendList();
		}
	});
}

const animate = () => {
	requestAnimationFrame(animate)
    c.drawImage(map, 0, 0)
	dom.fields.statsDisplay.innerHTML = `<p>Health: ${baseHealth}</p><p> Actions: ${actions}</p>`
	if (activeEnemies.length === 0) {
		wave++;
		saveStatus();
		spawnEnemies(wave);
	}
	if (turn === 'enemy') {
		placementTiles.forEach((tile) => {
			tile.update();
		});

		heroes.forEach((hero) => {
			if (hero.position) {
				hero.draw();
			}
		});

		let furthestRight = -96;
		while (furthestRight < -32) {

			for (let i = 0; i < activeEnemies.length; i++) {
				if (activeEnemies[i].position.x > furthestRight){
					furthestRight = activeEnemies[i].position.x;
					break;
				}
			}
			if (furthestRight === -96) {
				activeEnemies.forEach((enemy) => {
					enemy.position.x += 64;
				})
			}
		}
		

		let enemiesMoved = false;
		activeEnemies.forEach((enemy) => {
			if (!enemy.stunned && frames / 32 < enemy.speed){
				enemy.update();
				enemiesMoved = true;
			}
			else {
				enemy.draw();
			}
		});

		if (!enemiesMoved) {
			frames = 0;
			activeEnemies.forEach((enemy) => {
				enemy.stunned = false;
			})
			turn = 'player';
			actions = 2;
		}
		else {
			frames++;
		}
	}
	else if (turn === 'tower') {
		placementTiles.forEach((tile) => {
			tile.update();
		})
		
		heroes.forEach((hero) => {
			if (hero.position) {
				hero.update(activeEnemies);
			}
		})
		
		activeEnemies.forEach((enemy) => {
			if (enemy.pulled) {
				let waypoint = waypoints[enemy.currentObjective - 1];
				if (waypoint == null) waypoint = waypoints[0];
				if (
					enemy.position.x === waypoint.x &&
					enemy.position.y === waypoint.y &&
					enemy.currentObjective > 0
					) {
						enemy.currentObjective--;
				}
					
				waypoint = waypoints[enemy.currentObjective - 1];
				const yDistance = waypoint.y - enemy.position.y;
				const xDistance = waypoint.x - enemy.position.x;
				const angle = Math.atan2(yDistance, xDistance);
				enemy.position.x += (Math.cos(angle) * 8);
				enemy.position.y += (Math.sin(angle) * 8);
			}
			enemy.draw();
				
		})

		if (frames < 8) {
			frames++;
			for (let i = activeEnemies.length - 1; i >= 0; i--) {
				if (activeEnemies[i].health <= 0) {
					activeEnemies.splice(i, 1);
				}
			}
		}
		else{
			turn = 'enemy';
			frames = 0;
			activeEnemies.forEach((enemy) => {
				delete enemy.pulled;
				if (enemy.stunned && luckRoll(15)) {
					enemy.stunned = false;
				}
			})
			heroes.forEach((hero) => {
				hero.attacked = false;
			})
		}
	}
	else {
		placementTiles.forEach((tile) => {
			tile.update();
		});
		
		heroes.forEach((hero) => {
			if (hero.position) {
				hero.draw();
			}
		});

		activeEnemies.forEach((enemy) => {
			enemy.draw();
		});

		if (actions <= 0) {
			turn = 'tower';
		}
	}
	c.drawImage(castle, 960, 448)
}


canvas.addEventListener('click', (e) => {
	if (selectedTile != null && !selectedTile.occupied && selectedHero != null && actions > 0) {
		for (let i = 0; i < heroes.length; i++) {
			if (selectedHero === heroes[i].type){
				selectedHero = heroes[i];
				break;
			}
		}
		if (!selectedHero.position) {
			if (actions < 2) {
				alert('Not enough actions');
				return;
			}
			actions--;
		}
		else {
			for (let i = 0; i < placementTiles.length; i++) {
				if (selectedHero.position === placementTiles[i].position) {
					placementTiles[i].occupied = false;
					break;
				}
			}
		}
		actions--;
		selectedHero.position = selectedTile.position;
		selectedTile.occupied = true;
		selectedHero = null;
		renderHeroes();
	}
	else if (selectedTile === null) {
		console.log('nothing selected')
		selectedHero = null;
		renderHeroes();
	}
	else if (selectedTile.occupied && selectedHero === null || typeof(selectedHero) === 'string') {
		for (let i = 0; i < heroes.length; i++) {
			if (heroes[i].position === selectedTile.position) {
				selectedHero = heroes[i];
				break;
			}
		}
	}
	else if (
		actions > 0 && selectedHero?.position && 
		mouse.x > selectedHero.position.x && mouse.x < selectedHero.position.x + 64 &&
		mouse.y > selectedHero.position.y && mouse.y < selectedHero.position.y + 64
	){
		if (selectedHero.experience >= 5) {
			selectedHero.damage *= 1.05;
			selectedHero.luck *= 1.05;
			selectedHero.experience -= 5;
			actions--;
		}
		else{
			alert("This hero doesn't have enough experience.")
		}
		selectedHero = null;
	}
	
})

dom.inputs.endTurn.addEventListener('click', (e) => {
	e.preventDefault();
	if (turn === 'player') {
		actions = 0;
	}
})

const canvasRect = canvas.getBoundingClientRect();

window.addEventListener('mousemove', (e) => {
	mouse.x = e.clientX - canvasRect.left;
	mouse.y = e.clientY - canvasRect.top;
    selectedTile = null;
    for (let i = 0; i < placementTiles.length; i++){
        const tile = placementTiles[i];
        if (
            mouse.x > tile.position.x && mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && mouse.y < tile.position.y + tile.size
        ) {
            selectedTile = tile;
            break;
        }
    }
})