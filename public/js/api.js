let heroes = {};

const loginStipulation = (usernameBox, passwordBox, passwordBox2 = {value: passwordBox.value}) => {
    //When the user has clicked the login button, 
    //check if username has at least 3 characters
    if (usernameBox.value.length < 3) {
        return false;
    }
    //check if password has at least 5 characters
    if (passwordBox.value.length < 5) {
        return false;
    }

    if (passwordBox2.value !== passwordBox.value) {
        return false;
    }
    return true;
}

const attemptLogin = (e) => {
    //run loginStipulation
    //send a request serverside
    //on success, advance to game
    //on failure, update message box to say
    //error logging in
    //incorrect credentials
}

const attemptRegister = (e) => {
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
  //Make 2nd password field appear
  console.log('switch')
    dom.inputs.password2.classList.toggle('hidden');
    //Change Login and Register buttons to be their inverse
}

const getHeroes = () => {
    axios.get('http://localhost:3000/api/heroes')
        .then((res) => {
            heroes = res.data;
            return heroes;
        })
}

const getMonsters = () => {
    //axios.get monsters
}

const runGame = (loadState = '') => {
    getHeroes();
    getMonsters();
    //switch screen to playfield
    dom.screens.login.classList.add('hidden');
    dom.screens.playfield.classList.remove('hidden');
    
}

dom.inputs.switchToRegister.addEventListener('click', switchLoginOrRegister);
dom.inputs.guest.addEventListener('click', startGuest);