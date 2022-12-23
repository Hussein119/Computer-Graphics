var Vshader = `
attribute vec4 Position; 
attribute float pointSize;
void main(){
  gl_Position = Position;
  gl_PointSize = pointSize;
}`;
var Fshader = `
precision meduimep float;
uniform vec4 fragColor;
void main(){
  gl_FragColor = fragColor;
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

 
   // Set clear color
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
 
   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);
 }