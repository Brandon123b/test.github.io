class Layer {

    /**
     * Creates a new layer
     * Sets each node to 0
     * 
     * @param numberOnNodes: The number of nodes in the layer
     * @param numberOfNodesInNextLayer: The number of nodes in the next layer
     */
    constructor(numberOnNodes, numberOfNodesInNextLayer){
        
        this.nodes = [];
        this.numberOfNodesInNextLayer = numberOfNodesInNextLayer;

        // Create each node in the layer (Add 1 for the bias node)
        for(let i = 0; i < numberOnNodes; i++){
            this.nodes.push(new Node(numberOfNodesInNextLayer));
        }

        // Set the bias node to 1
        this.nodes[this.nodes.length - 1].SetValue(1);
        
    }

    /**
     * Multiplies the value of each node by its weights
     * 
     * @returns An array of the values of the next layer
     */
    GetNextLayerValues(){

        var retVal = [];

        // For each node in the next layer (except the bias node)
        for(let i = 0; i < this.numberOfNodesInNextLayer - 1; i++){

            var sum = 0;

            // For each node in this layer
            for(let j = 0; j < this.nodes.length; j++){
                sum += this.nodes[j].GetOutput(i);
            }

            retVal.push(sum);
        }

        // Apply the activation function to each value
        // Bounds the values between -1 and 1
        for(let i = 0; i < retVal.length; i++){
            retVal[i] = 1 / (1 + Math.exp(-retVal[i])) * 2 - 1;
        }

        return retVal;
    }

    /**
     * Sets the value of each node in the layer
     * 
     * @param values The values to set the next layer to 
     */
    SetLayerValues(values){
        for(let i = 0; i < values.length; i++){
            this.nodes[i].SetValue(values[i]);
        }
    }

    /**
     * Sets the value of each node in the next layer
     * 
     * @params index: The index of the node to set
     * @params value: The value to set the node to
     */
    SetNodeValue(index, value){
        this.nodes[index].SetValue(value);
    }

    GetNodeValue(index){
        return this.nodes[index].GetValue();
    }

    /**
     * Draws the layer
     * 
     * @param graphics: The graphics object to draw the layer with
     * @param nextLayer: The points of the next layer
     * @param x: The x position of the layer
     */
    DrawNetwork(graphics, nextLayer, x){

        const boxHeight = 230;

        // Store the points of the nodes in the layer
        var points = [];

        // For each node in the layer  
        for(let i = 0; i < this.nodes.length - 1; i++){

            // Calculate the y position of the node centered in the column
            var y = (boxHeight / (this.nodes.length)) * (i + 1);

            // Draw a line to the next layer if it exists (Will be null for the output layer)
            if(nextLayer != null){

                // For each node in the next layer
                for(let j = 0; j < nextLayer.length; j++){

                    // Calculate the thickness of the line based on the weight
                    var lineThickness = 5 * this.nodes[i].weights[j];

                    // Make sure the line is at least 1 pixel thick
                    if(lineThickness < 1)
                        lineThickness = 1;

                    // Calculate the color of the line based on the weight
                    var green = Math.round(255 * this.nodes[i].weights[j]);

                    // Draw a line from the current node to the next layer
                    graphics.lineStyle(lineThickness, "0x00" + green + "00", 1);
                    graphics.moveTo(x, y);
                    graphics.lineTo(nextLayer[j][0], nextLayer[j][1]);
                }
            }

            // Draw the node at the calculated position (Done last so it is on top of the lines)
            this.nodes[i].DrawNetwork(graphics, x, y);

            // Add the node to the list of points
            points.push([x,y]);
        }

        return points;
    }
}