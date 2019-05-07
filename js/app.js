var volHistory = Array(360).fill(0);
var filter;
var filterRes;
var reverb;
var darkColor;
var lightColor;
var div;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    mySound = loadSound('https://www.dl.dropboxusercontent.com/s/q33gc7cxmh3qieb/Changing%20it%20master.mp3?dl=0', loaded);
    mySound.setVolume(0.5);
    amp = new p5.Amplitude();
    reverb = new p5.Reverb();
    filter = new p5.LowPass();
    mySound.connect(reverb);
    mySound.connect(filter);
    darkColor = color(126,164,179);
    lightColor = color(206,221,226);
    div = createDiv('').size(200, 50);
    div.html(' Wait 2 sec, then click anywhere to play/pause and move your mouse for filter');
    div.position(100, 50);   // brings it inside the canvas, disable to show it below
    div.class('yeet');
}

function mouseClicked() {
if (!mySound.isPlaying()) {
    mySound.play();
} else {
    mySound.pause();
}
}

function mouseMoved() {
    ellipse(mouseX, mouseY, 5, 5);
    // prevent default
    return false;
}

function isMouseOverCanvas() {
    var mX = mouseX, mY = mouseY;
    if (mX > 0 && mX < windowWidth && mY < windowHeight && mY > 0) {
      mySound.amp(0.7, 1);
    } else {
      mySound.amp(0.5, 1);
    }
  }
 
function mousePressed() {
    getAudioContext().resume()
}

function loaded() {
    console.log('song is loaded');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}
    
function draw() {
    var t = map(mouseX, 0, width, 0, 1.0);
    var c = lerpColor(darkColor, lightColor, t);
    background(c);
    var vol = amp.getLevel();
    volHistory.push(vol);
    stroke(255);
    noFill();
    translate(width / 2, height / 2);
    beginShape();
    for (var i = 0; i < 360; i++) {
        var r = map(volHistory[i], 0, 1, 175, 100);
        var x = r * cos(i);
        var y = r * sin(i);
        // var y = map(volHistory[i], 0, 1, height/2, 0);
        vertex(x, y);
    }
        endShape();

    if (volHistory.length > 360) {
        volHistory.splice(0, 1);
    }
    // ellipse(100, 100, 200, vol * 200);
     // set the BandPass frequency based on mouseX
    var freq = map(mouseX, 0, windowWidth, 20, 10000);
    filterRes = map(mouseY, 0, windowHeight, 15, 5);
    filter.set(freq, filterRes);
    // filter.freq(freq);
    // // give the filter a narrow band (lower res = wider bandpass)
    // filter.res(1);
    isMouseOverCanvas();
    timer();

} 

function timer() {
    if ( frameCount > 600 ) div.html('');     // 5 sec ?
  }

