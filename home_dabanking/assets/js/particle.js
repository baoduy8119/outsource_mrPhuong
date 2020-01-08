class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(
            this.x + v.x,
            this.y + v.y);
    }

    addTo(v) {
        this.x += v.x;
        this.y += v.y;
    }

    sub(v) {
        return new Vector(
            this.x - v.x,
            this.y - v.y);
    }

    subFrom(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    mult(n) {
        return new Vector(this.x * n, this.y * n);
    }

    multTo(n) {
        this.x *= n;
        this.y *= n;
    }

    div(n) {
        return new Vector(this.x / n, this.y / n);
    }

    divTo(n) {
        this.x /= n;
        this.y /= n;
    }

    setAngle(angle) {
        var length = this.getLength();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    setLength(length) {
        var angle = this.getAngle();
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }

    getAngle() {
        return Math.atan2(this.y, this.x);
    }

    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    getLengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    distanceTo(v) {
        return this.sub(v).getLength();
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}

class BlackHole {
    constructor(x, y) {
        this.pos = new Vector(x, y);
    }

    applyGravityOn(thing) {
        let speed = 2000;
        if($(window).width() < 768) {
            speed = 500;
        }

        let dist = thing.pos.sub(this.pos);
        let length = dist.getLength();
        let g = speed / (length * length);

        // We keep the angle of the distance
        dist.setLength(g);
        thing.vel.subFrom(dist);
    }
}


class Particle {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(0, 0);
    }

    move(force) {
        if (this.vel.getLength() > 4) {
            this.vel.setLength(4);
        }
        this.pos.addTo(this.vel);
    }

    draw() {
        var ratioImg = 10;
        if($(window).width() < 768) {
            ratioImg = 3;
        }

        let r = this.pos.sub(new Vector(w / 2, h / 2)).getLength() / ratioImg;

        var img = new Image();
        img.src="./assets/images/coin-banner.png";
        ctx.drawImage(img, this.pos.x, this.pos.y, r, r);
    }
}


let canvas;
let ctx;
let w, h;
let particles;
let blackHole;
let img;

function setup() {
    canvas = document.querySelector("#canvas-coin");
    ctx = canvas.getContext("2d");
    reset();
    setupParticles();
    blackHole = new BlackHole(w / 2, h / 2);
    window.addEventListener("resize", reset);
}

function setupParticles() {
    particles = [];

    for (let i = 0; i < 10; i++) {
        let p = new Particle(Math.random() * w, Math.random() * h - 100);
        particles.push(p);
    }
}

function reset() {
    w = canvas.width = document.getElementById('dabanking-banner').offsetWidth;
    h = canvas.height = w/2.4;
}

function draw() {
    requestAnimationFrame(draw);
    var backgroundWidth = document.getElementById('dabanking-banner').offsetWidth;
    var backgroundHeight = backgroundWidth/2.4;
    var img = new Image();
    img.src="./assets/images/background-dabanking.png";
    ctx.drawImage(img, 0, 0, backgroundWidth, backgroundHeight);
    particles.forEach(p => {
        blackHole.applyGravityOn(p);
        p.draw();
        p.move();
    });
    let newParticle = new Particle(random(-50, w + 50), random(0, h - 100));
    if($(window).width() >= 768) {
        if (newParticle.pos.x%2 == 0 && newParticle.pos.x%4 == 0 && newParticle.pos.x%6 == 0) {
            particles.push(newParticle);
        }
    } else {
        if (newParticle.pos.x%3 == 0 && newParticle.pos.x%4 == 0 && newParticle.pos.x%8 == 0) {
            particles.push(newParticle);
        }
    }
    particles = particles.filter(p => blackHole.pos.sub(p.pos).getLength() > 2);
}

function random(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}



setup();
draw();