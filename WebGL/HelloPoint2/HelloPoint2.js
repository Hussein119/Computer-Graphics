// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =` 
  attribute vec4 a_Position; 
  attribute float a_PointSize; 
  void main() {
    gl_Position = a_Position; 
    gl_PointSize = a_PointSize;
  }`; 

// Fragment shader program
var FSHADER_SOURCE = `
    void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`;

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = canvas.getContext('webgl');
  if (!gl) {  
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position'); // ask for the index of 'a_Position' in the shader , gl.program -> compiled shader 
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }
  // Get the storage location of a_PointSize
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize'); // ask for the index of 'a_Position' in the shader , gl.program -> compiled shader 
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }
  
  console.log(a_PointSize);
  console.log(a_Position);
  
    // Pass vertex position to attribute variable
  var positions = new Float32Array([0.0, 0.0, 0.0]);
  gl.vertexAttrib3fv(a_Position, positions);

  // Pass vertex position to attribute variable
  //gl.vertexAttrib4f(a_Position, 0.0, 0.0, 0.0);  // the fourth value take 1 by defult
  // in canvas the position -> x (1,-1) , y (1,-1) the max  

  // Pass vertex PointSize to attribute variable
  gl.vertexAttrib1f(a_PointSize, 10.0);  

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
    
  // Draw
  gl.drawArrays(gl.points, 0, 1);
}
