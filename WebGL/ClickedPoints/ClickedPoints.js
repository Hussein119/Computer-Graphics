// ClickedPoints.js (c) 2012 matsuda
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
  // Get the storage PointSize of a_PointSize
  var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize'); // ask for the index of 'a_Position' in the shader , gl.program -> compiled shader 
  if (a_PointSize < 0) {
    console.log('Failed to get the storage location of a_PointSize');
    return;
  }
  
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_Position); };
  // onmousedown : data type , by defult null , take one argument that's why we made function(ev)
  


  // Pass vertex position to attribute variable
  gl.vertexAttrib1f(a_PointSize, 10.0);  

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 2.0, 1.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var g_points = []; // The array for the position of a mouse press
function click(ev, gl, canvas, a_Position) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect() ;  // object يمثل المربع اللي دوست عليه 

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);  
  // (x - rect.left) -> distance from the left of the canvas to the point 
  // - canvas.width/2 -> to get the distance between the point and the center of the canvas 
  //  /(canvas.width/2) -> canvas (1,-1) half (0,1) or (-1 ,0) 
  
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  // canvas.height/2 -> half of the canvas 
  // - (y - rect.top) -> distance from the top of the canvas to the point
  //  /(canvas.height/2) -> canvas (1,-1) half (0,1) or (-1 ,0) 

/*
• The center position of a <canvas> : (0.0, 0.0, 0.0)
• The two edges of the x-axis of the <canvas> : (–1.0, 0.0, 0.0) and (1.0, 0.0, 0.0)
• The two edges of the y-axis of the <canvas> : (0.0, –1.0, 0.0) and (0.0, 1.0, 0.0)
*/
  // Store the coordinates to g_points array
  g_points.push([x, y]);
    

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for(var i = 0; i < len; i ++) { // i+=2 -> Click -> (x,y)
    var xy = g_points[i]; // array in array 
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}

}
