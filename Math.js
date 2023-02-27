
// Raycasts a ray against all circles in the scene
// Returns true if the ray hit a circle or false if it did not
// raycastResult is the result of the raycast
// drawRay is whether or not to draw the ray
function Raycast(raycastResult, x, y, dirX, dirY, maxLength, drawRay = false) {

    var hasHit = false;

    tempResult = new RaycastResult2D();

    // Loop through all circles in the scene
    for (var i = 0; i < food.length; i++) {

        // If the ray did not hit a circle, continue
        if (!RaycastCircle(tempResult, x, y, dirX, dirY, food[i], maxLength))
            continue;
        
        // If the hit distance is less than the current hit distance, set the current hit distance to the new hit distance
        if (!hasHit || tempResult.GetDistance() < raycastResult.GetDistance()){
            hasHit = true
            raycastResult.Set(tempResult.GetX(), tempResult.GetY(), tempResult.GetDistance());
        }
    }

    
    if (drawRay) {
        // Draw the ray
        gGraphics.lineStyle(4, "0xFF0000", 1);
        gGraphics.beginFill(0x0000FF);
        gGraphics.moveTo(x, y);

        if (hasHit)
            gGraphics.lineTo(raycastResult.GetX(), raycastResult.GetY());
        else
            gGraphics.lineTo(x + dirX * maxLength, y + dirY * maxLength);
    }

    // Return whether or not the ray hit a circle
    return hasHit;
}

// Raycasts a ray against a single circle
// Returns true if the ray hit a circle or false if it did not
// raycastResult is the result of the raycast
function RaycastCircle(raycastResult, x, y, dirX, dirY, circle, maxLength) {

    // Store the radius of the circle
    var r = circle.GetRadius();

    // Store the square of the radius of the circle
    var rSq = r * r;

    // Store the vector from the circle to the ray origin
    var e = [circle.GetX() - x, circle.GetY() - y];

    // Calculate the dot product of the direction vector and the vector from the circle to the ray origin
    var a = e[0] * dirX + e[1] * dirY;

    // If the dot product is negative, the ray is pointing away from the circle
    if (a < 0) 
        return false;

    // Calculate the square of the magnitude of the vector from the circle to the ray origin
    var eMagSqar = e[0] * e[0] + e[1] * e[1];

    // If the origin of the ray is inside the circle, set the raycast result to the origin of the ray
    if (eMagSqar < rSq){
        raycastResult.Set(x, y, 0);
        return true;
    }

    // Calculate the distance from the clocest point on the ray to the center of the circle
    var bSq = eMagSqar - a * a;

    // If the distance from the closest point on the ray to the center of the circle is greater than the radius of the circle, there is no intersection
    if (bSq > rSq) 
        return false;
    
    // Find the distance from the bSq to the intercection of the ray and the circle
    var f = Math.sqrt(rSq - bSq);

    // Calculate the distance from the ray origin to the closest point on the ray to the circle
    var t = a - f;

    // If the ray is longer than the maximum length, there is no intersection
    if (t > maxLength)
        return false;

    // Set the raycast result
    raycastResult.Set(x + t * dirX, y + t * dirY, t, circle);

    // Raycast was successful
    return true;
}

class RaycastResult2D {
    
    Set(hitX, hitY, distance) {
        this.hitX = hitX;
        this.hitY = hitY;
        this.distance = distance;
    }

    GetX() {
        return this.hitX;
    }

    GetY() {
        return this.hitY;
    }

    GetDistance() {
        return this.distance;
    }

    Clear() {
        this.hitX = 0;
        this.hitY = 0;
        this.distance = 0;
    }
}