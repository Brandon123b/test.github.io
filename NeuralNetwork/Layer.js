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
     * Adds the values of each node together and applies the sigmoid function
     * 
     * @returns An array of the values of the next layer
     */
    GetNextLayerValues(){

        var retVal = [];

        // For each node in the next layer (except the bias node)
        for(let i = 0; i < this.numberOfNodesInNextLayer; i++){

            var nodeVal = 0;

            // For each node in this layer
            for(let j = 0; j < this.nodes.length; j++){
                nodeVal += this.nodes[j].GetOutput(i);
            }

            // Apply the sigmoid function to the value of the node (Range: -1 to 1)
            nodeVal = this.Sigmoid(nodeVal);

            // Add the value of the node to the array of values
            retVal.push(nodeVal);
        }

        return retVal;
    }

    /**
     * Applies the sigmoid function to the value
     * The sigmoid function is used to normalize the values of the nodes
     * The range of the sigmoid function is -1 to 1
     * 
     * @param x: The value to apply the sigmoid function to
     * @returns The value of the sigmoid function
     */
    Sigmoid(x) {
        return 1 / (1 + Math.exp(-x)) * 2 - 1;
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

        // For each node in the layer (except the bias node)
        for(let i = 0; i < this.nodes.length - 1; i++){

            // Calculate the y position of the node centered in the column
            var y = (boxHeight / (this.nodes.length)) * (i + 1);

            // Draw a line to the next layer if it exists (Will be null for the output layer)
            if(nextLayer != null){

                // For each node in the next layer
                for(let j = 0; j < nextLayer.length; j++){

                    // Calculate the thickness of the line based on the weight (Range: 1 to 5)
                    var lineThickness = 3 * Math.abs(this.nodes[i].weights[j]) + 1;

                    // Differentiate the color of the line based on the value of the node
                    var value = this.nodes[i].weights[j];
                    if (value < 0) {
                        // Turn more red as the value increases
                        var red = Math.round(255 * -value);

                        // Set the color of the circle
                        graphics.lineStyle(lineThickness, "0x" + red.toString(16).toUpperCase() + "0000", 1);
                    }
                    else {
                        // Turn more green as the value increases
                        var green = Math.round(255 * value);

                        // Set the color of the circle
                        graphics.lineStyle(lineThickness, "0x00" + green.toString(16).toUpperCase() + "00", 1);
                    }

                    // Draw the line
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