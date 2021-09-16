// const backgroundColor = [230,220,190];
const sounds = Array.from({ length: 6 });

const defaultFillColor = [190, 80, 230]
const defaultStrokeColor = [0,220,20]
const lineColor = [0, 0, 0];
const activeLineColor = [190, 20, 110];
const lineWidth = 3;
const activeLineWidth = 6;

const ball1 = {
    x: 300,
    y: 300,
    size: 100,
    speed: 1,
    fillColor: defaultFillColor,
    strokeColor: defaultStrokeColor,
    outlineWidth: 6,
    soundLenght: 2000,
}

const ball2 = {
    x: 300,
    y: 100,
    size: 50,
    speed: 2,
    fillColor: defaultFillColor,
    strokeColor: defaultStrokeColor,
    outlineWidth: 6,
    soundLenght: 1000,
}

const ball3 = {
    x: 300,
    y: 200,
    size: 80,
    speed: 2,
    fillColor: defaultFillColor,
    strokeColor: defaultStrokeColor,
    outlineWidth: 6,
    soundLenght: 500,
}

const leftEdge = {
    x1: 130, 
    y1: 0, 
    x2: 130, 
    y2: 800, 
    color: lineColor, 
    width: lineWidth,
}

const rightEdge = {
    x1: 670, 
    y1: 0, 
    x2: 670, 
    y2: 800, 
    color: lineColor, 
    width: lineWidth,
}

const balls = [ball1, ball2, ball3]
const lines = [leftEdge, rightEdge]

const drawCircle = ({x, y, size, strokeColor, fillColor}) => {
    stroke(strokeColor)
    fill(fillColor)
    ellipse(x, y, size)
}

const activateLine = (line) => {
    line.color = activeLineColor
    line.width = activeLineWidth
    setTimeout(() => resetLine(line), 500)
}

const resetLine = (line) => {
    line.color = lineColor
    line.width = lineWidth
} 


const updateBall = (ball) => {
    if(ball.x > rightEdge.x1 - ball.size/2){
        ball.speed *= -1
        activateLine(rightEdge)
        console.log(ball)
        ball.rightSound.play()
    } else if(ball.x - ball.size/2 < leftEdge.x1){
        ball.speed *= -1
        activateLine(leftEdge)
        ball.leftSound.play()
    }
    ball.x += ball.speed
}

const drawLine = ({x1, y1, x2, y2, color, width}) => {
    strokeWeight(width)
    stroke(color)
    line(x1,y1,x2,y2)
}

function preload(){

    sounds.forEach((sound, index) => {
        sounds[index] = loadSound(`sounds/${index}.mp3`)
    })

    ball1.rightSound = sounds[0];
    ball1.leftSound = sounds[1];
    ball2.rightSound = sounds[2];
    ball2.leftSound = sounds[3];
    ball3.rightSound = sounds[4];
    ball3.leftSound = sounds[5];

    // for(let i = 0; i < sounds.length; i++){
    //     sounds[i] = loadSound(`sounds/${i}.mp3`)
    // }
}

function setup(){
    createCanvas(800, 800);
    background(230,220,190);
}

function draw(){
    background(230,220,190);

    lines.forEach(line => {
        drawLine(line)
    })

    balls.forEach(ball => {
        updateBall(ball)
        drawCircle(ball)
    })

}