/*Copyright (c) 2021 by Ben Matthews (https://codepen.io/tsuhre/pen/BYbjyg)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

let points = [];
let tickSpeed = 10;
let base = 180;
let numPoints = 10;
let maxTicks = 5000;
let ticks = 0;

function Point(x = random(width), y = random(height), a = random(PI)){
  this.x = x;
  this.y = y;
  this.a = a;
  this.dx = cos(a);
  this.dy = sin(a);
  this.color = color(214, 89.3, 52.2, .01);
}

Point.prototype.update = function(){
  this.x += this.dx;
  this.y += this.dy;
  if (this.x < 0 || this.x >= width) this.dx *= -1;
  if (this.y < 0 || this.y >= height) this.dy *= -1;
  stroke(this.color);
  line(this.x, this.y, this.neighbor.x, this.neighbor.y);
}

function setup(){
  createCanvas();
  colorMode(HSB);
  windowResized();
  blendMode(ADD);
  strokeWeight(1.5);
}

function init(){
  points = [];
  base = random(360);
  ticks = 0;
  
  for (var i = 0; i < numPoints; i++) points.push(new Point());
  
  for (var i = 0; i < points.length; i++){
    let j = i;
    while(j == i) j = floor(random(points.length));
    points[i].neighbor = points[j];
  }
}

function draw(){
  if (ticks > maxTicks) return;
  for (var n = 0; n < tickSpeed; n++){
    for (var i = 0; i < points.length; i++){
      points[i].update();
    }
    ticks++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  clear();
  background(0);
  init();
}