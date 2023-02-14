/**
 * A node in the neural network
 * 
 */
class Node {
    
    constructor(numberOfWeights){

        this.value = 0;
        this.weights = [];

        // Set each weight to a random number (Range: -1 to 1)
        for(let i = 0; i < numberOfWeights; i++){
            this.weights.push(Math.random() * 2 - 1);
        }
    }

    /**
     * Gets the output of the weight at the given index
     * 
     * @param index The index of the weight to get the output of 
     * @returns The output of the weight at the given index
     */
    GetOutput(index){
        return this.value * this.weights[index];
    }

    GetValue(){
        return this.value;
    }

    SetValue(value){
        this.value = value;
    }

    ToString(){
        return "Value: " + Math.round(this.value * 100) / 100; // + " Weights: " + this.weights;
    }

    DrawNetwork(graphics, x, y){

        var circleRadius = 20;

        // Set the border color to blue
        graphics.lineStyle(1, 0x0000FF);
        
        // Differentiate the color of the circle based on the value of the node
        if (this.value < 0) {
            // Turn more red as the value increases
            var red = Math.round(255 * -this.value);

            // Set the color of the circle
            graphics.beginFill("0x" +  red.toString(16).toUpperCase() + "0000");
        }
        else {
            // Turn more green as the value increases
            var green = Math.round(255 * this.value);

            // Set the color of the circle
            graphics.beginFill("0x" +  "00" + green.toString(16).toUpperCase() + "00");
        }

        // Draw the circle
        graphics.drawCircle(x, y, circleRadius);

        // End the fill
        graphics.endFill();
    }
}
