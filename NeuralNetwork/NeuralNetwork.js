/**
 * The neural network class
 * 
 * Inputs:
 * 0: leftEye
 * 1: middleEye
 * 2: rightEye
 * 
 * Outputs:
 *  0: Rotation
 *  1: Speed
 * 
 */

// The number of nodes in each layer (Bias node is added automatically)
var internalLayers = [3, 3];

class NeuralNetwork {

    

    constructor(inputCount, outputCount) {
        
        // The layers in the network
        this.layers = [];

        // Create the input layer (Bias node is added automatically)
        this.layers.push(new Layer(inputCount + 1, internalLayers[0]));

        // Create each layer in the network (Bias node is added automatically)
        for(let i = 0; i < internalLayers.length; i++)

            // Last internal layer needs to have the output layer's number of nodes
            if(i == internalLayers.length - 1)  // If this is the last internal layer
                this.layers.push(new Layer(internalLayers[i] + 1, outputCount));
            else                                // If this is not the last internal layer      
                this.layers.push(new Layer(internalLayers[i] + 1, internalLayers[i + 1]));
        
        // Create the output layer (No next layer)
        this.layers.push(new Layer(outputCount + 1, 0));
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
     * Draws the neural network
     * 
     * @param graphics: The graphics object to draw the network with
     *  
      */
    DrawNetwork(graphics){

        const boxWidth = 400;
        const boxHeight = 250;
        const xPadding = 50;

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
    }

    /**
     * Sets the value of the given input node
     * 
     * @param index: The index of the input node
     * @param value: The value to set the input node to
     */
    SetInput(index, value){
        this.layers[0].SetNodeValue(index, value);
    }

    /**
     * Gets the value of the given output node
     * 
     * @param index: The index of the output node
     */
    GetOutput(index){
        return this.layers[this.layers.length - 1].GetNodeValue(index);
    }
}



