var options = {
    rows: 6,
    cols: 5,
    tileWidth: 101,
    tileHeight: 83,
    heightCorrection: 22
}

// Enemies our player must avoid
var Enemy = function (col, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = col * options.tileWidth;
    this.y = row * options.tileHeight - options.heightCorrection;
    this.center = {
        x: this.x + 50,
        y: this.y + 109
    };
    this.radius = 33;

    this.speed = Math.random() * 400 + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var dx,
        dy,
        distance;

    this.x += this.speed * dt;
    this.center.x += this.speed * dt;
    if (this.x >= 505 - options.tileWidth || (this.speed < 0 && this.x < 0)) {
        this.speed = -this.speed;
    }

    dx = this.center.x - player.center.x;
    dy = this.center.y - player.center.y;

    distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + player.radius) {
        setTimeout(function () {
            player.x = 202;
            player.y = (options.rows - 1) * options.tileHeight - options.heightCorrection;
        }, 50);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (col) {
    this.sprite = 'images/char-boy.png';
    this.x = col * options.tileWidth;
    this.y = (options.rows - 1) * options.tileHeight - options.heightCorrection;
    this.center = {
        x: this.x + 50,
        y: this.y + 95
    };
    this.radius = 32;
}

Player.prototype.update = function (dt) {

    if (this.x < 0) this.x = 0;
    if (this.x + options.tileWidth > options.cols * options.tileWidth) this.x = (options.cols - 1) * options.tileWidth;
    if (this.y < 0) {
        this.y = -options.heightCorrection;
        setTimeout(function () {
            this.y = (options.rows - 1) * options.tileHeight - options.heightCorrection;
        }.bind(this), 50);
    }
    if (this.y + options.tileHeight > options.rows * options.tileHeight) this.y = (options.rows - 1) * options.tileHeight - options.heightCorrection;

    this.center.x = this.x + 50;
    this.center.y = this.y + 109;

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            this.x -= options.tileWidth;
            break;
        case 'up':
            this.y -= options.tileHeight;
            break;
        case 'right':
            this.x += options.tileWidth;
            break;
        case 'down':
            this.y += options.tileHeight;
            break;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 1), new Enemy(1, 2), new Enemy(4, 3)];
var player = new Player(2);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
