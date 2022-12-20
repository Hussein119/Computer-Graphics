// ClickedPints.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 a_color;
  void main() {
    gl_FragColor = a_color; 
  }`;
// a_color = vec4(1.0, 0.0, 0.0, 1.0)

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
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }


   // Get the color of a_color
   var a_color = gl.getUniformLocation(gl.program, 'a_color');
   if (a_color < 0) {
     console.log('Failed to get the color of a_color');
     return;
   }
   
  
  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = function(ev){ click(ev, gl, canvas, a_Position,a_color); };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = []; // The array for the position of a mouse press
var g_color =[]; // The array for the color of a_color
function click(ev, gl, canvas, a_Position,a_color) {
 var x = ev.clientX; // x coordinate of a mouse pointer
 var y = ev.clientY; // y coordinate of a mouse pointer
 var rect = ev.target.getBoundingClientRect() ;

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  // Store the coordinates to g_points array
  g_points.push(x,y);
  g_color.push(Math.random(),Math.random(),Math.random(),Math.random());

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for(var i = 0; i < len; i += 2) {
    // Pass the position of a point to a_Position variable
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
    gl.uniform4f(a_color,g_color[i],g_color[i+1],g_color[i+2],g_color[i+3]);
    
    // Draw
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}