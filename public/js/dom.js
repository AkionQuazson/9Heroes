let dom = {
    screens: {},
    inputs: {},
    fields: {}
}

dom.screens.login = document.getElementById('login');
dom.screens.playfield = document.getElementById('playfield');

dom.inputs.username = document.getElementById('username');
dom.inputs.password = document.getElementById('password');
dom.inputs.password2 = document.getElementById('passwordConfirm');
dom.inputs.switchToRegister = document.getElementById('switchToRegister');
dom.inputs.guest = document.getElementById('nologin');
dom.inputs.endTurn = document.getElementById('endTurn');

dom.fields.heroList = document.getElementById('heroList');
dom.fields.mapSpace = document.getElementById('mapSpace');
dom.fields.statsDisplay = document.getElementById('statDisplay');