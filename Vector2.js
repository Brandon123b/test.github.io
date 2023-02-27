/**
 * Vector2.js
 * A 2D vector class with an x and y component
 */

class Vector2{

    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
    }

    // Add the given x and y values to the vector
    Add(_x, _y) {
        this.x += _x;
        this.y += _y;
    }

    // Add the given vector to this vector (multiplied by the given multiplier if given)
    Add(_vector, multiplier = 1) {
        this.x += _vector.GetX() * multiplier;
        this.y += _vector.GetY() * multiplier;
    }

    // Rotate the vector by the given angle in degrees
    Rotate(_angle) {

        // Store sin and cos values in degrees
        var cos = Math.cos(_angle * Math.PI / 180);
        var sin = Math.sin(_angle * Math.PI / 180);

        // Store the current vector values
        var tempX = this.x;
        var tempY = this.y;

        // Rotate the vector
        this.x = tempX * cos - tempY * sin;
        this.y = tempX * sin + tempY * cos;
    }

    //
    // Static Methods
    //

    // Returns a random vector with a magnitude of 1
    static Random() {
        var newVector = new Vector2(0, 1);
        newVector.Rotate(Math.random() * 360);
        return newVector;
    }

    //
    // Basic Getters and Setters
    //

    // Get the angle of the vector in degrees
    GetAngle() {
        return Math.atan2(this.y, this.x) * 180 / Math.PI;
    }

    GetX() {
        return this.x;
    }

    GetY() {
        return this.y;
    }

    SetX(_x) {
        this.x = _x;
    }

    SetY(_y) {
        this.y = _y;
    }

    Set(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}