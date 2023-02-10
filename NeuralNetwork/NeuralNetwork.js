/**
 * The neural network class
 * 
 * Inputs:
 *  0: x
 *  1: y
 * 
 * Outputs:
 * 0: turnLeft
 * 1: turnRight
 * 
 */

class NeuralNetwork {

    constructor(){

        // The number of nodes in each layer (Arbitrary)
        const numberOfNodes = [2, 5, 5, 3];

        // The layers in the network
        this.layers = [];

        // Create each layer
        for(let i = 0; i < numberOfNodes.length; i++){
                
            // If the layer is the last layer, set the number of nodes in the next layer to 0
            if(i === numberOfNodes.length - 1){
                this.layers.push(new Layer(numberOfNodes[i], 0));
            }
            else{
                this.layers.push(new Layer(numberOfNodes[i], numberOfNodes[i + 1]));
            }
        }
    }

    /**
     * Runs the neural network
     */
    RunNN(){

        // For each layer in the network (except the last layer)
        for(let i = 0; i < this.layers.length - 1; i++){

            // Get the values of the next layer
            var nextLayerValues = this.layers[i].GetNextLayerValues();

            // Set the values of the next layer
            this.layers[i + 1].SetLayerValues(nextLayerValues);
        }
    }

    /**
     * Sets the value of the input node at the given index
     * 
     * @param index: The index of the input node
     * @param value: The value to set the input node to
     */
    SetInput(index, value){
        this.layers[0].SetNodeValue(index, value);
    }

    SetXPosition(value){
        this.SetInput(0, value);
    }

    SetYPosition(value){
        this.SetInput(1, value);
    }

    GetLeftOutput(){
        return this.layers[this.layers.length - 1].GetNodeValue(0);
    }

    GetRightOutput(){
        return this.layers[this.layers.length - 1].GetNodeValue(1);
    }

    Print(){
        
        // Print each layer
        for(let i = 0; i < this.layers.length; i++){
            var layerString = "Layer " + i + ":" + this.layers[i].ToString();

            console.log(layerString);
        }
    }


    DrawNetwork(graphics){

        const boxWidth = 400;
        const boxHeight = 250;
        const xPadding = 50;
        
        // Clear the graphics object
        graphics.clear();

        // Set the background color to black
        graphics.beginFill(0x000000);
    
        // Draw a rounded rectangle for the background of the container and add it to the container
        graphics.drawRoundedRect(0, 0, boxWidth, boxHeight, 10);

        // Set the border color to white
        graphics.lineStyle(2, 0xFFFFFF);

        // Draw a rounded rectangle for the border of the container and add it to the container
        graphics.drawRoundedRect(0, 0, boxWidth, boxHeight, 10);

        // Store the points of the last layer to draw the lines between the layers
        var points;

        // Draw each layer with the given graphics object
        for(let i = this.layers.length - 1; i >= 0; i--){

            // Calculate the x position of the layer centered in the box
            var x = (boxWidth - 2 * xPadding) / (this.layers.length - 1) * i + xPadding;

            // Draw the layer
            points = this.layers[i].DrawNetwork(graphics, points, x);
        }

        // Print the Left and Right outputs
        //console.log("Left: " + this.GetLeftOutput() + " Right: " + this.GetRightOutput());
        // Print Left - Right
        //console.log("Left - Right: " + (this.GetLeftOutput() - this.GetRightOutput()));


        return graphics;
    }
}



