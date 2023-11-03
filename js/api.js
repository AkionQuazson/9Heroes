let user;
let heroes = [];

const loginStipulation = () => {
    if (dom.inputs.username.value.length < 3) {
        return false;
    }
    if (dom.inputs.password.value.length < 5) {
        return false;
    }
    if (dom.inputs.username.value.includes(';')) {
        alert('Invalid character ";". Please use something else.');
        return false;
    }
    if (!dom.inputs.password2.classList.contains('hidden') && dom.inputs.password2.value !== dom.inputs.password.value) {
        return false;
    }
    return true;
}

const attemptLogin = (e) => {
    e.preventDefault();
    if (!loginStipulation()) {
		alert('Username or password too short.');
		return;
	}
	const data = {
		username: dom.inputs.username.value,
		password: dom.inputs.password.value
	}
	axios.post(`https://homelightarchive.com/games/9Heroes/server/?route=login&username=${data.username}&password=${data.password}`)
	.then((res) => {
		console.log(res);
        if (!res.data.dne) {
			user = data.username;
			runGame();
		}
        else {
            alert('Error logging in. Check your credentials or create a new account.');
        }
	})
    .catch(() => {
        alert('Error with server. Please try again later or play as a guest.');
    })
}

const attemptRegister = (e) => {
    e.preventDefault();
    if (!loginStipulation()) {
		alert('Username or password too short, or passwords do not match.');
		return;
	}

	const data = {
		route: 'register',
		username: dom.inputs.username.value,
		password: dom.inputs.password.value
	}
	axios.post('https://homelightarchive.com/games/9Heroes/server/', data)
	.then((res) => {
		if (res.data.dne) {
			user = data.username;
			runGame();
			return;
		}
        else {
            alert('User already exists')
        }
	})
    .catch(() => {
        alert('Error creating account. Please try again later or play as guest.');
    })
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
		dom.inputs.submitBtn.value = 'Log in';
	}
	else {
		dom.screens.login.removeEventListener('submit', attemptLogin);
		dom.screens.login.addEventListener('submit', attemptRegister);
		dom.inputs.switchToRegister.innerText = 'Log in';
		dom.inputs.submitBtn.value = 'Register';
	}
}

const getHeroes = () => {
    axios.post(`https://homelightarchive.com/games/9Heroes/server/?route=heroes&user=${user}`)
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
                {type:'Barbarian', img:'img/heroes/barbarian.png', range:1, damage:3, luck:15, experience:0},
                {type:'Cleric', img:'img/heroes/cleric.png', range:2, damage:1, luck:30, experience:0},
                {type:'Cryomancer', img:'img/heroes/cryomancer.png', range:2, damage:1, luck:25, experience:0},
                {type:'Geomancer', img:'img/heroes/geomancer.png', range:2, damage:1, luck:50, experience:0},
                {type:'Monk', img:'img/heroes/monk.png', range:1, damage:1, luck:45, experience:0},
                {type:'Paladin', img:'img/heroes/paladin.png', range:1, damage:3, luck:0, experience:0},
                {type:'Pyromancer', img:'img/heroes/pyromancer.png', range:2, damage:2, luck:5, experience:0},
                {type:'Rogue', img:'img/heroes/rogue.png', range:1, damage:1, luck:20, experience:0},
                {type:'Spellblade', img:'img/heroes/spellblade.png', range:1, damage:3, luck:25, experience:0}
            ];
        });
}

const saveData = (data) => {
    //post data to server
	const gamestate = json.stringify(data);
	axios.post('https://homelightarchive.com/games/9Heroes/server/', {route: 'save', user: user, gamestate: gamestate})
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


