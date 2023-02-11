
// Some global variables
var bibites = [];
var food = [];
var app;
var gGraphics;

function main(){

    // Copy/Pasted this
    var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    
    // Copy/Pasted this
    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    
    // Create the application helper and add its render target to the page
    app = new PIXI.Application({width, height});
    document.body.appendChild(app.view);
    app.renderer.background.color = 0x0000FF;
    
    // Create a new graphics object for drawing the lines
    gGraphics = new PIXI.Graphics();

    // Creates some bibites
    for (var i = 0; i < 50; i++)
        bibites.push(new Bibite());

    // Create some food
    for (var i = 0; i < 10; i++)
        food.push(new Food());

    // Add the graphics to the stage last so it is drawn on top
    app.stage.addChild(gGraphics);

    // Start the game loop
    app.ticker.add((delta) => {
        GameLoop(delta);
    });

}

// Game loop. Called every frame.
function GameLoop(delta) {

    // Clear the graphics
    gGraphics.clear();

    // Update the bibites
    for (var i = 0; i < bibites.length; i++)
        bibites[i].Update(delta);
    
    // Draw the food
    for (var i = 0; i < food.length; i++)
        food[i].Draw(gGraphics);

    // Draw the first bibite's network last so it is drawn on top
    if (bibites.length > 0)
        bibites[0].nn.DrawNetwork(gGraphics);
}


main();