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
var nnetworkLayers = [3, 3, 2];

class NeuralNetwork {

    

    constructor(){
        
        // The layers in the network
        this.layers = [];

        // Create each layer
        for(let i = 0; i < nnetworkLayers.length; i++){
                
            // If the layer is the last layer, set the number of nodes in the next layer to 0
            if(i === nnetworkLayers.length - 1){
                this.layers.push(new Layer(nnetworkLayers[i] + 1, 0));
            }
            else{
                this.layers.push(new Layer(nnetworkLayers[i] + 1, nnetworkLayers[i + 1] + 1));
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

    //
    //
    //  Setters
    //
    //

    SetLeftEye(value){
        this.layers[0].SetNodeValue(0, value);
    }

    SetMiddleEye(value){
        this.layers[0].SetNodeValue(1, value);
    }

    SetRightEye(value){
        this.layers[0].SetNodeValue(2, value);
    }

    //
    //
    //  Getters
    //
    //

    GetRotationOutput(){
        return this.layers[this.layers.length - 1].GetNodeValue(0);
    }

    GetSpeedOutput(){
        return this.layers[this.layers.length - 1].GetNodeValue(1);
    }
}



