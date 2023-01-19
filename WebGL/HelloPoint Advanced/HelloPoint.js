/*
// VSHADER
var VSHADER = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
}`;
*/
// VSHADER
var VSHADER = `
attribute vec4 a_Position;
void main(){
    gl_Position = a_Position;
}`;
// FSHADER 
var FSHADER = `
precision mediump float;  
uniform vec4 u_FrageColor;
void main(){
    gl_FragColor = u_FrageColor;
}`; 
function main(){
// Retrive canvas element 
var canvas = document.getElementById('mycanvas');
// get canvas context for webGL
var gl = canvas.getContext('webgl');
if(!gl){
    console.log("failed to get the randring context from webgL");
    return;
}
// initialize Shaders 
if (!initShaders(gl,VSHADER,FSHADER)){
console.log("failed to initailize Shaders");
return;
}
/*
// Get Storage Location of a_Position 
var a_Position = gl.getAttribLocation(gl.program,'a_Position');
if(a_Position<0){
    console.log("failed to get Storage Location of a_Position ");
    return;
}
*/
/*
// Get Storage Location of a_PointSize 
var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
if(a_PointSize<0){
    console.log("failed to get Storage Location of a_PointSize ");
    return;
}
*/
// Get Storage Location of u_FrageColor 
var u_FrageColor = gl.getUniformLocation(gl.program,'u_FrageColor');
if(u_FrageColor<0){
    console.log("failed to get Storage Location of u_FrageColor ");
    return;
}

// Write the positions of vertices to a vertex shader
var n = initVertexBuffers(gl);
if (n < 0) {
  console.log('Failed to set the positions of the vertices');
  return;
}

/*
// pass vertex position to attribute variable  
gl.vertexAttrib3f(a_Position,0,0,0);
*/

/*
// pass vertex PointSize to attribute variable  
gl.vertexAttrib1f(a_PointSize,10.0);
*/

// pass vertex FrageColor to attribute variable  
gl.uniform4f(u_FrageColor,0.0,0.0,0.0,1.0);


// Clear Color 
gl.clearColor (1.0,1.0,0.0,1.0);
// Clear canvas 
gl.clear(gl.COLOR_BUFFER_BIT);
// Draw 
gl.drawArrays(2,0,n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
      -0.25, -0.25,-0.25, 0.25,0.0, 0.25,0.25,-0.25 , 0.5 ,0.9
    ]);
    var n = 5; // The number of vertices
  
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.log('Failed to create the buffer object');
      return -1;
    }
  
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return -1;
    }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
  
    return n;
  }