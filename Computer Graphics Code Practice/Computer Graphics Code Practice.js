// Ch2
/*
// Hello Point 1 
// Vshader 
var Vshader = `
void main(){
    gl_Position = vec4 (0.0,0.0,0.0,1.0);
    gl_PointSize = 10.0;
}`;
//Fshader 
var Fshader =`
void main(){
    gl_FragColor = vec4 (1.0,1.0,1.0,1.0);
}`;
function main(){
var canvas = document.getElementById('webgl');
var gl = canvas.getContext('webgl');
if(!gl){
    console.log("failed get gl !");
    return;
}
if(!initShaders(gl,Vshader,Fshader)){
    console.log("failed pass Vshader and Fshader !");
    return;
}
gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, 1);
}
*/
/*
// Hello Point 2 
var Vshader = `
attribute vec4 Position;
void main(){
    gl_Position = Position;
    gl_PointSize = 10.0;
}`;
var Fshader = `
void main(){
    gl_FragColor = vec4 (1.0,0.0,0.0,1.0);
}`;
function main(){
    var canvas = document.getElementById("webgl");
    var gl = canvas.getContext('webgl');
    if(!initShaders(gl,Vshader,Fshader)){
        console.log("Fialed pass Vshader and Fshader !!");
        return;
    }
    var Position = gl.getAttribLocation(gl.program, 'Position');
    if(Position<0){
        console.log("Fialed get Position");
    }
    gl.vertexAttrib3f(Position, 0.0, 0.0, 0.0);
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1)
}
*/
/*
// Clicked Colored Points
var Vshader = `
attribute vec4 Position;
attribute float PointSize;
void main(){
    gl_Position = Position;
    gl_PointSize = PointSize;
}`;
var Fshader = `
precision mediump float;
uniform vec4 FragColor;
void main(){
    gl_FragColor = FragColor;
}`;
function main(){
    var canvas = document.getElementById("webgl");
    var gl = canvas.getContext('webgl');
    if(!initShaders(gl,Vshader,Fshader)){
        alert("failed pass Vshader and Fshader !!");
        return;
    }
    var Position = gl.getAttribLocation(gl.program, 'Position');
    var PointSize = gl.getAttribLocation(gl.program, 'PointSize');
    var FragColor = gl.getUniformLocation(gl.program, 'FragColor');

    gl.vertexAttrib1f(PointSize, 20.0);
    gl.uniform4f(FragColor,1.0,0.0,0.0,1.0);

    canvas.onmousedown = function(ev){click(ev,gl,canvas,Position);};

    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
var points= [];
function click(ev,gl,canvas,Position){
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x-rect.left) - canvas.width/2) /(canvas.width/2);
    y =  (canvas.height/2 - (y-rect.top))/(canvas.height/2);
    
    points.push(x); points.push(y);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var size = points.length;
    for(var i =0 ; i<size;i+=2){
        gl.vertexAttrib3f(Position,points[i],points[i+1],0.0);
        gl.drawArrays(gl.POINTS,0,1);
    }
}
*/
// Ch3 
/*
// MultiPoint
var Vshader = `
attribute vec4 Position;
attribute float pointSize;
void main(){
gl_Position = Position;
gl_PointSize = pointSize;
}`;
var Fshader = `
precision mediump float;
uniform vec4 fragColor;
void main(){
    gl_FragColor = fragColor;
}`;

function main (){
var canvas = document.getElementById("webgl");
var gl = canvas.getContext('webgl');

if(!initShaders(gl,Vshader,Fshader)){
    alert("Filed pass Vshader and Fshader !!");
    return;
}

var n = initBuffers(gl);

var pointSize = gl.getAttribLocation(gl.program,'pointSize');
var fragColor = gl.getUniformLocation(gl.program,'fragColor');

gl.vertexAttrib1f(pointSize,10.0);
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, n);
}
function initBuffers(gl){
var vertices = new Float32Array([
    0.5,-0.5,  -0.6,-0.5,   0.5,0.5
]);
var n = 3;
var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices,gl.STATIC_DRAW);
var Position = gl.getAttribLocation(gl.program,'Position');
gl.vertexAttribPointer(Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(Position);
   return n;
}
*/
// HelloShapes
var Vshader =`
attribute vec4 Position;
void main(){
gl_Position = Position;
}`;
var Fshader=`
precision mediump float;
uniform vec4 fragColor;
void main(){
gl_FragColor = fragColor;
}`;
function main(){
var canvas = document.getElementById("webgl");
var gl = canvas.getContext('webgl');

if(!initShaders(gl,Vshader,Fshader)){
    alert("Cannot pass Vshader and Fshader !!");
    return;
}

var n = initBuffers(gl);

var fragColor = gl.getUniformLocation(gl.program,'fragColor');
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(4,0,n);
/*
gl.drawArrays(gl.LINES,0,n);
gl.drawArrays(1,0,n);

gl.drawArrays(gl.LINE_LOOP,0,n);
gl.drawArrays(2,0,n);

gl.drawArrays(gl.LINE_STRIP,0,n);
gl.drawArrays(3,0,n);

gl.drawArrays(gl.TRIANGLES,0,n);
gl.drawArrays(4,0,n);

gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
gl.drawArrays(5,0,n);

gl.drawArrays(gl.TRIANGLE_FAN,0,n);
gl.drawArrays(6,0,n);

*/
}
function initBuffers (gl){
var vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5
])
var n = 3;
var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
var Position = gl.getAttribLocation(gl.program,'Position');
gl.vertexAttribPointer(Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(Position);
    return n ;
}
