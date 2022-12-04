class PlacableSpace {
	constructor({position = {x: 0, y: 0}}) {
		this.position = position;
		this.size = 64;
		this.color = 'rgba(0, 0, 0, 0)'
        this.occupied = false;
	}
	
	draw() {
		c.fillStyle = this.color;
		c.fillRect(this.position.x, this.position.y, this.size, this.size);
	}
	
	update() {
		this.draw();
		
		if (
			mouse.x > this.position.x && mouse.x < this.position.x + this.size &&
			mouse.y > this.position.y && mouse.y < this.position.y + this.size
		) {
			this.color = 'rgba(255, 255, 255, .5)';
		}
		else {
			this.color = 'rgba(0, 0, 0, 0)';
		}
	}
}
class Hero {
	constructor(hero) {
		const {type, img, range, damage, luck, experience, position} = hero;
		Object.assign(this, {type, range, damage, luck, experience, position});
        this.img = new Image(64, 64);
        this.img.src = img;
        this.attacked = false;
		this.targets = null;
	}

	draw () {
        //range
        if (
            mouse.x > this.position.x && mouse.x < this.position.x + 64 &&
			mouse.y > this.position.y && mouse.y < this.position.y + 64
        ) {
            c.fillStyle = 'rgba(0, 0, 255, .2)'
            c.fillRect(
                this.position.x - (this.range * 64), 
                this.position.y - (this.range * 64), 
                this.range * 128 + 64, 
                this.range * 128 + 64
            );
        }

        c.drawImage(this.img, this.position.x, this.position.y)
        
        let expFillWidth = this.experience * 11.2;
        if (expFillWidth > 56) expFillWidth = 56
        c.fillStyle = '#008d9f';
        c.fillRect(this.position.x + 4, this.position.y + 54, expFillWidth, 10);
        if (this.experience >= 5) {
            c.fillStyle = '#00e3ff';
            c.fillRect(this.position.x + 4, this.position.y + 54, 56, 10);
        }
	}

	update (enemies) {
		this.draw();

        this.targets = [];
		
		for (let i = 0; i < enemies.length; i++) {
            if(
                enemies[i].position.x > this.position.x - (this.range * 64) && 
                enemies[i].position.x < this.position.x + (this.range * 64 + 64) && 
                enemies[i].position.y > this.position.y - (this.range * 64) && 
                enemies[i].position.y < this.position.y + (this.range * 64 + 64)
            ){
                this.targets.push(enemies[i]);
            }
        }
        if (this.targets.length > 0 && !this.attacked) {
            const atk = atks[this.type];
			atk(this.targets, this.luck, this.damage);
            this.experience++;
            this.attacked = true;
        }
	}

	appendList () {
		const heroIcon = document.createElement('div');
		heroIcon.setAttribute('id', this.type);
		heroIcon.classList.add('heroIcon');
		
		heroIcon.addEventListener('click', (e) => {
			const heroButtons = document.querySelectorAll('.heroIcon');
			heroButtons.forEach((button) => {
                button.classList.remove('selectedHero');
			})
			e.target.parentElement.classList.add('selectedHero');
            selectedHero = this.type;
		})
        heroIcon.append(this.img);
		dom.fields.heroList.append(heroIcon);
	}
}
class Enemy {
	constructor(enemy, position) {
	const {img, damage, speed, health, priority, stunned} = enemy;
	Object.assign(this, {img, damage, speed, health, priority, stunned});
	this.position = position;
	this.currentObjective = 1;
	this.width = 64;
	this.height = 64;
    this.art = new Image();
    this.art.src = this.img;
    this.maxHealth = health;
}
draw() {
    if (this.health <= 0) return;
	c.drawImage(this.art, this.position.x - (this.width/2), this.position.y - (this.height/2))
    
	c.fillStyle = 'red'
    c.fillRect(this.position.x - (this.width/2 - 4), this.position.y - (this.height/2 + 15), this.width - 8, 10);
	c.fillStyle = 'green'
    c.fillRect(this.position.x - (this.width/2 - 4), this.position.y - (this.height/2 + 15), (this.width - 8) * this.health / this.maxHealth, 10);
}

update () {
    if (this.health <= 0) return;
	this.draw();
    
    const waypoint = waypoints[this.currentObjective];
	const yDistance = waypoint.y - this.position.y;
	const xDistance = waypoint.x - this.position.x;
	const angle = Math.atan2(yDistance, xDistance);
	this.position.x += (Math.cos(angle) * 2);
	this.position.y += (Math.sin(angle) * 2);
	
	if (
        this.position.x === waypoint.x &&
		this.position.y === waypoint.y)
        {
            if(this.currentObjective < waypoints.length - 1) {
                this.currentObjective++;
            }
            else{
				this.health = 0;
                baseHealth -= this.damage;
				console.log('hit base', this.damage)
            }
		}
	}
}