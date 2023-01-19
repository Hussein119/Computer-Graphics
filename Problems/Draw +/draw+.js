// VSHADER
var VSHADER = `
attribute vec4 a_Position;
attribute float a_PointSize;
void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
}`;
// FSHADER 
var FSHADER = `
precision mediump float;  
uniform vec4 u_FrageColor;
void main(){
    gl_FragColor = u_FrageColor;
}`; 

var pointSize = 10.0;

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
// Get Storage Location of a_Position 
var a_Position = gl.getAttribLocation(gl.program,'a_Position');
if(a_Position<0){
    console.log("failed to get Storage Location of a_Position ");
    return;
}
// Get Storage Location of a_PointSize 
var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
if(a_PointSize<0){
    console.log("failed to get Storage Location of a_PointSize ");
    return;
}
// Get Storage Location of u_FrageColor 
var u_FrageColor = gl.getUniformLocation(gl.program,'u_FrageColor');
if(u_FrageColor<0){
    console.log("failed to get Storage Location of u_FrageColor ");
    return;
}

// pass vertex position to attribute variable  
gl.vertexAttrib3f(a_Position,0.0,0.0,0.0);
// pass vertex PointSize to attribute variable  
gl.vertexAttrib1f(a_PointSize,pointSize);
// pass vertex FrageColor to attribute variable  
gl.uniform4f(u_FrageColor,1.0,1.0,0.0,1.0);


// Clear Color 
gl.clearColor (0.0,0.0,0.0,1.0);
// Clear canvas 
gl.clear(gl.COLOR_BUFFER_BIT);
// Draw 
gl.drawArrays(gl.points,0,1);

for(i=1;i<10;i++){

    x=i/10;
    gl.vertexAttrib3f(a_Position,x,0.0,0.0);
    gl.drawArrays(gl.points,0,1);
    gl.vertexAttrib3f(a_Position,-x,0.0,0.0);
    gl.drawArrays(gl.points,0,1);

    y=i/10;
    gl.vertexAttrib3f(a_Position,0.0,y,0.0);
    gl.drawArrays(gl.points,0,1);
    gl.vertexAttrib3f(a_Position,0.0,-y,0.0);
    gl.drawArrays(gl.points,0,1);
}
}