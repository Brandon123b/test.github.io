var testCount = 100000;

/* Draws a raycast from the center of the screen and rotates it
 * The raycast will hit the circle and draw a line to the point of intersection
 * Should be called in the Update function
 */
var testRaycastAngle = 0;
function TestRaycast(delta){

    testRaycastAngle += .1 * delta;
    var raycastResult = new RaycastResult2D();

    var x = app.renderer.width / 2;
    var y = app.renderer.height / 2;

    // Get the direction of the sight line
    var dirX = Math.cos(testRaycastAngle * Math.PI / 180);
    var dirY = Math.sin(testRaycastAngle * Math.PI / 180);

    // Draw the sight line
    Raycast(raycastResult, x, y, dirX, dirY, 500, true);
}

/* Test the speed of the neural network
 * Prints the time it takes to run 100,000 neural networks
 */
function TestNNSpeed(){

    console.log("Testing neural network speed...");

    var testarray = [];

    for (var i = 0; i < testCount; i++)
        testarray.push(new NeuralNetwork2(3, 3));

    // Set random values for the neural network
    for (var i = 0; i < testarray.length; i++) {
        testarray[i].SetInput(0, Math.random());
        testarray[i].SetInput(1, Math.random());
        testarray[i].SetInput(2, Math.random());
    }

    var now = performance.now();

    // Run the neural network
    for (var i = 0; i < testarray.length; i++) 
        testarray[i].RunNN();

    var end = performance.now();

    console.log("NN speed: " + (end - now) + " ms for " + testCount + " neural networks");

}

/* Test the speed of the raycast function
 * Prints the time it takes to run 100,000 raycasts
 * Each raycast tests against a single circle
 */
function TestRaycastSpeed(){

    console.log("Testing raycast speed...");
    
    var food = new Food();

    var testarray = [];
    var xArray = [];
    var yArray = [];
    var dirXArray = [];
    var dirYArray = [];

    var hitCount = 0;

    for (var i = 0; i < testCount; i++){
        testarray.push(new RaycastResult2D());
        xArray.push(Math.random() * 100);
        yArray.push(Math.random() * 100);

        var angle = Math.random() * 360;

        dirXArray.push(Math.cos(angle * Math.PI / 180));
        dirYArray.push(Math.sin(angle * Math.PI / 180));
    }
    var now = performance.now();

    // Run the raycast
    for (var i = 0; i < testarray.length; i++) 
        if (RaycastCircle(testarray[i], xArray[i], yArray[i], dirXArray[i], dirYArray[i], food, 1000))
            hitCount++;

    var end = performance.now();

    console.log("Raycast time: " + (end - now) + " ms for " + testCount + " raycasts");

    // Print the results
    console.log("Hit count: " + hitCount);

}

function TestAddRemoveNodeMutations(){

    var nn = new NeatNN(4, 3);

    var sec = 1;
    
    // Draw the neural network
    var graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);
    nn.DrawNN(graphics, width, height);
    
    for (var i = 0; i < 10; i++){
        setTimeout(function () {

            nn.MutateAddConnection();
            nn.DrawNN(graphics, width, height);
        }, 1000 * sec++);
    }

    for (var i = 0; i < 10; i++){
        setTimeout(function () {

            nn.MutateAddNode();
            nn.DrawNN(graphics, width, height);
        }, 1000 * sec++);
    }

    
    for (var i = 0; i < 10; i++){
        setTimeout(function () {

            nn.SetInput(0, Math.random() * 2 - 1); 
            nn.SetInput(1, Math.random() * 2 - 1);
            nn.SetInput(2, Math.random() * 2 - 1);
            nn.SetInput(3, Math.random() * 2 - 1);
            nn.RunNN();

            nn.DrawNN(graphics, width, height);
        }, 1000 * sec++);
    }

    for (var i = 0; i < 10; i++){
        setTimeout(function () {

            nn.MutateRemoveNode();
            nn.DrawNN(graphics, width, height);
        }, 1000 * sec++);
    }
    
    for (var i = 0; i < 10; i++){
        setTimeout(function () {

            nn.MutateRemoveConnection();
            nn.DrawNN(graphics, width, height);
        }, 1000 * sec++);
    }


}

function TestNetworkMutate(){

    var nn = new NeatNN(4, 3);
    
    // Draw the neural network
    var graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);
    nn.DrawNN(graphics, width, height);

    // Run Mutate every second
    window.setInterval(function(){
        
        nn.Mutate();

        nn.SetInput(0, Math.random() * 2 - 1);
        nn.SetInput(1, Math.random() * 2 - 1);
        nn.SetInput(2, Math.random() * 2 - 1);
        nn.SetInput(3, Math.random() * 2 - 1);
        nn.RunNN();

        nn.DrawNN(graphics, width, height);
    }, 200);
}

function TestNeatNNSpeed(){

    var mutateCount = 100;

    console.log("Testing NEAT neural network speed...");

    var testarray = [];

    for (var i = 0; i < testCount; i++)
        testarray.push(new NeatNN(3, 3));

    var beforeMutate = performance.now();
    
    // Set random values for the neural network
    for (var i = 0; i < testarray.length; i++) {

        for (var j = 0; j < mutateCount; j++)
            testarray[i].Mutate();

        testarray[i].SetInput(0, Math.random());
        testarray[i].SetInput(1, Math.random());
        testarray[i].SetInput(2, Math.random());
    }

    var afterMutate = performance.now();

    console.log("NEAT NN mutate time: " + (afterMutate - beforeMutate) + " ms for " + testCount + " neural networks and " + mutateCount + " mutations each");

    var now = performance.now();

    // Run the neural network
    for (var i = 0; i < testarray.length; i++) 
        testarray[i].RunNN();

    var end = performance.now();

    console.log("NEAT NN speed: " + (end - now) + " ms for " + testCount + " neural networks");

}

// Test the speed of the neural network
//TestNNSpeed();
//TestNeatNNSpeed();

TestNetworkMutate();