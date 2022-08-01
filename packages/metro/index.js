let methods = require('../modules/methods');
let position = require('./enums/positions');
let user = require('../user');

let metro = exports;

metro.blips = function() {
    position.point.one.forEach(arg => {
        methods.createBlip(arg, 36, 0, 0.7, 'Метрополитен');
    });
}

metro.checkpoint = function() {
    position.point.one.forEach(arg => {
        methods.createCpVector(arg, 'Нажмите ~g~E~s~ чтобы открыть меню.', 0.5, -1, [139, 195, 74, 100]);
    });
}

metro.colshape = function(player) {
    position.point.one.forEach(arg => {
        if (methods.distanceToPos(arg, player.position) < 1.4) {
            player.call('lifesheets:client:module:metro:teleport');
            return;
        }
    });
}

metro.init = function() {
    metro.blips();
    metro.checkpoint();
    mp.events.addRemoteCounted("onKeyPress:E", (player) => {
        if (!user.isLogin(player)) return;
        metro.colshape(player);
    });
}