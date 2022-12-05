let user = {};
let heroes = [];

const loginStipulation = () => {
    //When the user has clicked the login button, 
    //check if username has at least 3 characters
    if (dom.inputs.username.value.length < 3) {
        return false;
    }
    //check if password has at least 5 characters
    if (dom.inputs.password.value.length < 5) {
        return false;
    }

    if (!dom.inputs.password2.classList.contains('hidden') && dom.inputs.password2.value !== dom.inputs.password.value) {
        return false;
    }
    return true;
}

const attemptLogin = (e) => {
    e.preventDefault();
    //run loginStipulation
    console.log(loginStipulation());
    //send a request serverside
    //on success, advance to game
    //on failure, update message box to say
    //error logging in
    //incorrect credentials
}

const attemptRegister = (e) => {
    e.preventDefault();
    //run loginStipulation
    //send a serverside request
    //on success, advance to game
    //on failure, update message box to say
        //error creating account
        //username exists. pick another
}

const startGuest = (e) => {
    e.preventDefault();

    runGame();
}

const switchLoginOrRegister = (e) => {
    e.preventDefault();
    dom.inputs.password2.classList.toggle('hidden');

	if (dom.inputs.password2.classList.contains('hidden')){
		dom.screens.login.removeEventListener('submit', attemptRegister);
		dom.screens.login.addEventListener('submit', attemptLogin);
		dom.inputs.switchToRegister.innerText = 'Register';
		dom.inputs.submitBtn.innerText = 'Log in';
	}
	else {
		dom.screens.login.removeEventListener('submit', attemptLogin);
		dom.screens.login.addEventListener('submit', attemptRegister);
		dom.inputs.switchToRegister.innerText = 'Log in';
		dom.inputs.submitBtn.innerText = 'Register';
	}
}

const getHeroes = () => {
    axios.post('https://homelightarchive.com/games/9Heroes/server/?/heroes')
        .then((res) => {
            heroes = res.data;
            
            while (heroes.length > 9) {
                const rand = Math.floor(Math.random() * heroes.length);
                heroes.splice(rand, 1);
            }
            
            heroes.forEach((hero, i) => {
                heroes[i] = new Hero(hero);
            });

            renderHeroes();
        })
        .catch(() => {
            heroes = [
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
            ];
        });
}

const saveData = (data) => {
    //post data to server
}

const runGame = () => {
    getHeroes();
    //switch screen to playfield
    dom.screens.login.classList.add('hidden');
    dom.screens.playfield.classList.remove('hidden');
    
}

dom.inputs.switchToRegister.addEventListener('click', switchLoginOrRegister);
dom.inputs.guest.addEventListener('click', startGuest);
dom.screens.login.addEventListener('submit', attemptLogin);


