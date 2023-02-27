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
var internalLayers = [4, 4, 4];

class NeuralNetwork2 {

    constructor(inputCount, outputCount) {

        // The layers in the network
        this.inputArray = [];
        
        // Set the bias node to 1
        this.inputArray[inputCount] = 1;

        // Initialize the output array
        this.outputArray;
        
        // A 3d array of weights
        this.weights = [];

        // Create the input layer (Bias node is added automatically)
        this.weights.push(this.RandomMatrix(this.inputArray.length, internalLayers[0]));
        
        // For each layer in the network (except the last layer)
        for(let i = 0; i < internalLayers.length - 1; i++){
            
            // Create a matrix of weights for the layer
            this.weights.push(this.RandomMatrix(internalLayers[i] + 1, internalLayers[i + 1]));
        }

        // Create the output layer (No next layer)
        this.weights.push(this.RandomMatrix(internalLayers[internalLayers.length - 1] + 1, outputCount));
    }

    /**
     * Creates a random matrix with the given dimensions
     * The values in the matrix are between -1 and 1
     * 
     * @param rows: The number of rows in the matrix
     * @param cols: The number of columns in the matrix
     */
    RandomMatrix(rows, cols) {

        var matrix = [];

        // For each row
        for (var i = 0; i < rows; i++) {
            matrix.push([]);

            // For each column
            for (var j = 0; j < cols; j++) {
                matrix[i].push(Math.random() * 2 - 1);
            }

        }

        return matrix;
    }

    /**
     * Multiplies a matrix by a matrix
     * 
     * 
     * @param matrix1
     * @param matrix2 
     * @returns 
     */
    MultiplyMatrix(matrix1, matrix2) {
        
        console.log("matrix1: " + matrix1.length + " " + matrix1[0].length);
        console.log("matrix2: " + matrix2.length + " " + matrix2[0].length);

        // Check if the number of columns in the first matrix is equal to the number of rows in the second matrix
        if (matrix1[0].length != matrix2.length) {
            throw "The number of columns in the first matrix must be equal to the number of rows in the second matrix";
        }

        // Create a new matrix to store the result
        var result = [];

        // For each row in the first matrix
        for (var i = 0; i < matrix1.length; i++) {
            result.push([]);

            // For each column in the second matrix
            for (var j = 0; j < matrix2[0].length; j++) {
                var sum = 0;

                // For each row in the second matrix
                for (var k = 0; k < matrix2.length; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }

                result[i].push(sum);
            }
        }

        return result;

    }

    /**
     * Multiplies a vector by a matrix
     * 
     * 
     * @param vector
     * @param matrix2 
     * @returns 
     */
    MultiplyVectorMatrix(vector, matrix2) {

        // Check if the number of columns in the first matrix is equal to the number of rows in the second matrix
        if (vector.length != matrix2.length) {
            throw "The number of columns in the first matrix must be equal to the number of rows in the second matrix";
        }

        // Create a new matrix to store the result
        var result  = [];

        // For each column in the second matrix
        for (var j = 0; j < matrix2[0].length; j++) {
            var sum = 0;

            // For each row in the second matrix
            for (var k = 0; k < matrix2.length; k++) {
                sum += vector[k] * matrix2[k][j];
            }

            result.push(sum);
        }

        return result;

    }

    VectorSigmoid(vector){
        var result = [];

        for(let i = 0; i < vector.length; i++){
            result.push(this.Sigmoid(vector[i]));
        }

        return result;
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
     * Runs the neural network
     */
    RunNN(){

        var out;

        // Multiply the input layer by the weights
        out = this.MultiplyVectorMatrix(this.inputArray, this.weights[0]);
        out = this.VectorSigmoid(out);
        out.push(1);    // Add the bias node
        
        // For each layer in the network
        for (var i = 1; i < this.weights.length - 1; i++) {
            // Multiply the output of the previous layer by the weights
            out = this.MultiplyVectorMatrix(out, this.weights[i]);
            out = this.VectorSigmoid(out);
            out.push(1);    // Add the bias node
        }

        // Multiply the output of the last layer by the weights
        this.outputArray = this.MultiplyVectorMatrix(out, this.weights[this.weights.length - 1]);
        
    }

    /**
     * Draws the neural network
     * 
     * @param graphics: The graphics object to draw the network with
     *  
      */
    DrawNetwork(graphics){

        return;

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

        // Check if the index is out of range
        if (index >= this.inputArray.length - 1){
            throw "Index out of range";
        }

        this.inputArray[index] = value;
    }

    /**
     * Gets the value of the given output node
     * 
     * @param index: The index of the output node
     */
    GetOutput(index){
        return this.outputArray[index];
    }
}



