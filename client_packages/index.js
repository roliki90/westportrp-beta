try {
    require('./game_resources/handlers');
} catch (e) {
    mp.game.graphics.notify(`${e.toString()}`);
}