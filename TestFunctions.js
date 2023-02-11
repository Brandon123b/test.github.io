

// Raycast test
// Draws a raycast from the center of the screen and rotates it
// The raycast will hit the circle and draw a line to the point of intersection
// Should be called in the Update function
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