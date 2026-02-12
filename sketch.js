
let mic;
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(260, 30, 5, 12); 
  let vol = mic.getLevel();
  if (vol > 0.01) { 
    let count = map(vol, 0, 0.5, 2, 15);
    for (let i = 0; i < count; i++) {
      particles.push(new Particle(vol));
    }
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(vol) {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = random(-5, 5) * vol * 5;
    this.vy = random(-3, -0.5); 
    this.alpha = 100;
    this.h = random(250, 285);
    this.s = map(vol, 0, 0.2, 60, 30); 
    this.b = map(vol, 0, 0.2, 40, 60); 
    this.size = random(2, 12) * (vol * 10 + 1);
    this.type = floor(random(2));
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.8; 
  }
  show() {
    noStroke();
    fill(this.h, this.s, this.b, this.alpha);
    if (this.type === 0) {
      ellipse(this.x, this.y, this.size);
    } else {
      push();
      translate(this.x, this.y);
      rotate(frameCount * 0.1);
      rectMode(CENTER);
      rect(0, 0, this.size * 0.7, this.size * 0.7);
      pop();
    }
  }
  finished() {
    return this.alpha < 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
