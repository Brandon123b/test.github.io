
/**
 * Bibite
 * 
 * A bibite is a creature that can see food and move towards it.
 * It has three eyes that can see food. The eyes are raycasted from the bibite's position.
 * The bibite has a neural network that takes the eye raycasts as inputs and outputs a rotation and speed.
 * The bibite moves in the direction of the rotation and at the speed.
 */

// The maximum distance that the bibite can see
var maxSeeDistance = 500;

// Should the eye rays be drawn?
var drawEyeRays = false;

class Bibite {

    constructor() {
        this.nn = new NeuralNetwork();
        this.maxSeeDistance = 500;
        this.maxSpeed = 5;

        // Create a bibite to draw
        this.sprite = PIXI.Sprite.from('Sprites/Bibite.png');
        
        // Set the pivot point to the center of the bibite
        this.sprite.anchor.set(0.5);
        
        // Add the bibite to the stage
        app.stage.addChild(this.sprite);
        
        // Set the initial size of the bibite
        this.sprite.width = 100;
        this.sprite.height = 100;
        
        // Set the initial position of the bibite to be randoly placed in the middle of the screen
        this.sprite.x = app.renderer.width / 2 + Math.random() * 500 - 250;
        this.sprite.y = app.renderer.height / 2 + Math.random() * 500 - 250;

        // Set the initial rotation of the bibite
        this.sprite.angle = Math.random() * 360;
    }

    Update(delta) {
        
        // Set the neural network inputs from the eye raycasts
        this.nn.SetLeftEye(this.EyeRaycast(-30));
        this.nn.SetMiddleEye(this.EyeRaycast(0));
        this.nn.SetRightEye(this.EyeRaycast(30));

        // Run the neural network
        this.nn.RunNN();

        // Update the bibite's position and rotation from the neural network's outputs
        this.sprite.angle += this.nn.GetRotationOutput() * delta * 10;

        // Calculate the speed of the bibite
        var speed = this.nn.GetSpeedOutput() * this.maxSpeed;

        // If speed is negative, halve it
        if (speed < 0)
            speed /= 2;

        // Update the bibite's position
        this.sprite.x += Math.cos(this.sprite.angle * Math.PI / 180) * delta * speed;
        this.sprite.y += Math.sin(this.sprite.angle * Math.PI / 180) * delta * speed;
    }

    // Returns the ratio of the distance to the closest food to the max distance
    // Returns 0 if no food is found
    EyeRaycast(angleFromMiddle) {
        
        // Create a raycast result object
        var raycastResult = new RaycastResult2D();

        // Calculate the angle of the sight line in radians
        var theta = (this.sprite.angle + angleFromMiddle) * Math.PI / 180;

        // Get the direction of the sight line
        var dirX = Math.cos(theta);
        var dirY = Math.sin(theta);

        // Send the raycast
        if (Raycast(raycastResult, this.sprite.x, this.sprite.y, dirX, dirY, maxSeeDistance, drawEyeRays))
            return 1 -raycastResult.GetDistance() / this.maxSeeDistance;
        else
            return -1;
    }
}