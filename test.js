
// Copy/Pasted this
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

// Copy/Pasted this
var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


// Create the application helper and add its render target to the page
let app = new PIXI.Application({width, height});
document.body.appendChild(app.view);
app.renderer.background.color = 51515;

// Create a bibite to draw
let bibite = PIXI.Sprite.from('bibite.png');

// Set the pivot point to the center of the bibite
bibite.anchor.set(0.5);

// Add the bibite to the stage
app.stage.addChild(bibite);

// Set the initial size of the bibite
bibite.width = 100;
bibite.height = 100;

// Set the initial position of the bibite
bibite.x = app.screen.width / 2;
bibite.y = app.screen.height / 2;



nn = new NeuralNetwork();

var angle = 0; 

// Create a new graphics object for the Background of this container
var graphics = new PIXI.Graphics();
app.stage.addChild(graphics);

app.ticker.add((delta) => {
    nn.SetXPosition(bibite.x / width);
    nn.SetYPosition(bibite.y / height);

    nn.RunNN();

    bibite.angle += nn.GetLeftOutput() * 10;
    bibite.angle -= nn.GetRightOutput() * 10;
    bibite.x += Math.cos(bibite.angle * Math.PI / 180) * 1;
    bibite.y += Math.sin(bibite.angle * Math.PI / 180) * 1;

    nn.DrawNetwork(graphics);
});

nn.Print();