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
/*
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

//gl.drawArrays(gl.LINES,0,n);
//gl.drawArrays(1,0,n);

//gl.drawArrays(gl.LINE_LOOP,0,n);
//gl.drawArrays(2,0,n);

//gl.drawArrays(gl.LINE_STRIP,0,n);
//gl.drawArrays(3,0,n);

//gl.drawArrays(gl.TRIANGLES,0,n);
//gl.drawArrays(4,0,n);

//gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
//gl.drawArrays(5,0,n);

//gl.drawArrays(gl.TRIANGLE_FAN,0,n);
//gl.drawArrays(6,0,n);
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
*/
/*
// TranslatedTriangle
var Vshader =`
attribute vec4 Position;
uniform mat4 translationMatrix;
void main(){
gl_Position = translationMatrix * Position;
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

var tMatrix = new Matrix4();
var Tx = 0.5;
tMatrix.setTranslate(Tx,0,0);

var translationMatrix = gl.getUniformLocation(gl.program,'translationMatrix');
gl.uniformMatrix4fv(translationMatrix,false, tMatrix.elements);

var fragColor = gl.getUniformLocation(gl.program,'fragColor');
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(4,0,n);

//gl.drawArrays(gl.LINES,0,n);
//gl.drawArrays(1,0,n);

//gl.drawArrays(gl.LINE_LOOP,0,n);
//gl.drawArrays(2,0,n);

//gl.drawArrays(gl.LINE_STRIP,0,n);
//gl.drawArrays(3,0,n);

//gl.drawArrays(gl.TRIANGLES,0,n);
//gl.drawArrays(4,0,n);

//gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
//gl.drawArrays(5,0,n);

//gl.drawArrays(gl.TRIANGLE_FAN,0,n);
//gl.drawArrays(6,0,n);
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
*/
/*
// RotatedTriangle
var Vshader =`
attribute vec4 Position;
uniform mat4 formMatrix;
void main(){
gl_Position = formMatrix * Position;
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

var xformMatrix = new Matrix4();
var ANGLE = 90.0;
xformMatrix.setRotate(ANGLE,0,0,1);

var formMatrix = gl.getUniformLocation(gl.program,'formMatrix');
gl.uniformMatrix4fv(formMatrix,false,xformMatrix.elements);

var fragColor = gl.getUniformLocation(gl.program,'fragColor');
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(4,0,n);

//gl.drawArrays(gl.LINES,0,n);
//gl.drawArrays(1,0,n);

//gl.drawArrays(gl.LINE_LOOP,0,n);
//gl.drawArrays(2,0,n);

//gl.drawArrays(gl.LINE_STRIP,0,n);
//gl.drawArrays(3,0,n);

//gl.drawArrays(gl.TRIANGLES,0,n);
//gl.drawArrays(4,0,n);

//gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
//gl.drawArrays(5,0,n);

//gl.drawArrays(gl.TRIANGLE_FAN,0,n);
//gl.drawArrays(6,0,n);
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
*/
/*
// ScaledTriangle_Matrix
var Vshader =`
attribute vec4 Position;
uniform mat4 formMatrix;
void main(){
gl_Position = formMatrix * Position;
}`;
var Fshader=`
precision mediump float;
uniform vec4 fragColor;
void main(){
gl_FragColor = fragColor;
}`;

var Sx = 1.0, Sy = 1.5, Sz = 1.0; 
function main(){
var canvas = document.getElementById("webgl");
var gl = canvas.getContext('webgl');

if(!initShaders(gl,Vshader,Fshader)){
    alert("Cannot pass Vshader and Fshader !!");
    return;
}

var n = initBuffers(gl);

var formMatrixArray = new Float32Array([
    Sx, 0.0,  0.0,  0.0,
    0.0,  Sy, 0.0,  0.0,
    0.0,  0.0,  Sz, 0.0,
    0.0,  0.0,  0,  1.0
]);
var formMatrix = gl.getUniformLocation(gl.program,'formMatrix');
gl.uniformMatrix4fv(formMatrix,false,formMatrixArray);

var fragColor = gl.getUniformLocation(gl.program,'fragColor');
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(4,0,n);

//gl.drawArrays(gl.LINES,0,n);
//gl.drawArrays(1,0,n);

//gl.drawArrays(gl.LINE_LOOP,0,n);
//gl.drawArrays(2,0,n);

//gl.drawArrays(gl.LINE_STRIP,0,n);
//gl.drawArrays(3,0,n);

//gl.drawArrays(gl.TRIANGLES,0,n);
//gl.drawArrays(4,0,n);

//gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
//gl.drawArrays(5,0,n);

//gl.drawArrays(gl.TRIANGLE_FAN,0,n);
//gl.drawArrays(6,0,n);
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
*/
// Ch4
/*
// RotatedTranslatedTriangle 
// TranslatedRotatedTriangle
var Vshader =`
attribute vec4 Position;
uniform mat4 translationMatrix;
void main(){
gl_Position = translationMatrix * Position;
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

var tMatrix = new Matrix4();
var ANGLE = 60.0;
var Tx = 0.5;

// rotated first then translated 
//tMatrix.setTranslate(Tx,0,0);
//tMatrix.rotate(ANGLE,0,0,1);

// translated but not rotated 
//tMatrix.rotate(ANGLE,0,0,1);
//tMatrix.setTranslate(Tx,0,0);

// translated first then rotated 
//tMatrix.setRotate(ANGLE,0,0,1);
//tMatrix.translate(Tx,0,0);

// rotated but not translated 
//tMatrix.translate(Tx,0,0);
//tMatrix.setRotate(ANGLE,0,0,1);

// rotated first then translated 
//tMatrix.translate(Tx,0,0);
//tMatrix.rotate(ANGLE,0,0,1);

// translated first then rotated 
//tMatrix.rotate(ANGLE,0,0,1);
//tMatrix.translate(Tx,0,0);

// rotated but not translated 
//tMatrix.setTranslate(Tx,0,0);
//tMatrix.setRotate(ANGLE,0,0,1);

// translated but not rotated 
//tMatrix.setRotate(ANGLE,0,0,1);
//tMatrix.setTranslate(Tx,0,0);

var translationMatrix = gl.getUniformLocation(gl.program,'translationMatrix');
gl.uniformMatrix4fv(translationMatrix,false, tMatrix.elements);

var fragColor = gl.getUniformLocation(gl.program,'fragColor');
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(4,0,n);

//gl.drawArrays(gl.LINES,0,n);
//gl.drawArrays(1,0,n);

//gl.drawArrays(gl.LINE_LOOP,0,n);
//gl.drawArrays(2,0,n);

//gl.drawArrays(gl.LINE_STRIP,0,n);
//gl.drawArrays(3,0,n);

//gl.drawArrays(gl.TRIANGLES,0,n);
//gl.drawArrays(4,0,n);

//gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
//gl.drawArrays(5,0,n);

//gl.drawArrays(gl.TRIANGLE_FAN,0,n);
//gl.drawArrays(6,0,n);
}
function initBuffers (gl){
var vertices = new Float32Array([
    0, 0.3,   -0.3, -0.3,   0.3, -0.3
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
*/
/*
// ScaledTriangle_Matrix
// RotatedTranslatedTriangle 
// TranslatedRotatedTriangle
var Vshader =`
attribute vec4 Position;
uniform mat4 translationMatrix;
uniform mat4 formMatrix;
void main(){
gl_Position = translationMatrix * formMatrix * Position;
}`;
var Fshader=`
precision mediump float;
uniform vec4 fragColor;
void main(){
gl_FragColor = fragColor;
}`;
var Sx = 1.0, Sy = 1.5, Sz = 1.0; 
function main(){
var canvas = document.getElementById("webgl");
var gl = canvas.getContext('webgl');

if(!initShaders(gl,Vshader,Fshader)){
    alert("Cannot pass Vshader and Fshader !!");
    return;
}

var n = initBuffers(gl);

var formMatrixArray = new Float32Array([
    Sx, 0.0,  0.0,  0.0,
    0.0,  Sy, 0.0,  0.0,
    0.0,  0.0,  Sz, 0.0,
    0.0,  0.0,  0,  1.0
]);
var formMatrix = gl.getUniformLocation(gl.program,'formMatrix');
gl.uniformMatrix4fv(formMatrix,false,formMatrixArray);

var tMatrix = new Matrix4();
var ANGLE = 60.0;
var Tx = 0.5;

// rotated first then translated 
tMatrix.setTranslate(Tx,0,0);
tMatrix.rotate(ANGLE,0,0,1);

// translated but not rotated 
//tMatrix.rotate(ANGLE,0,0,1);
//tMatrix.setTranslate(Tx,0,0);

// translated first then rotated 
//tMatrix.setRotate(ANGLE,0,0,1);
//tMatrix.translate(Tx,0,0);

// rotated but not translated 
//tMatrix.translate(Tx,0,0);
//tMatrix.setRotate(ANGLE,0,0,1);

// rotated first then translated 
//tMatrix.translate(Tx,0,0);
//tMatrix.rotate(ANGLE,0,0,1);

// translated first then rotated 
//tMatrix.rotate(ANGLE,0,0,1);
//tMatrix.translate(Tx,0,0);

// rotated but not translated 
//tMatrix.setTranslate(Tx,0,0);
//tMatrix.setRotate(ANGLE,0,0,1);

// translated but not rotated 
//tMatrix.setRotate(ANGLE,0,0,1);
//tMatrix.setTranslate(Tx,0,0);

var translationMatrix = gl.getUniformLocation(gl.program,'translationMatrix');
gl.uniformMatrix4fv(translationMatrix,false, tMatrix.elements);

var fragColor = gl.getUniformLocation(gl.program,'fragColor');
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

gl.clearColor(0,0,0,1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(4,0,n);

//gl.drawArrays(gl.LINES,0,n);
//gl.drawArrays(1,0,n);

//gl.drawArrays(gl.LINE_LOOP,0,n);
//gl.drawArrays(2,0,n);

//gl.drawArrays(gl.LINE_STRIP,0,n);
//gl.drawArrays(3,0,n);

//gl.drawArrays(gl.TRIANGLES,0,n);
//gl.drawArrays(4,0,n);

//gl.drawArrays(gl.TRIANGLE_STRIP,0,n);
//gl.drawArrays(5,0,n);

//gl.drawArrays(gl.TRIANGLE_FAN,0,n);
//gl.drawArrays(6,0,n);
}
function initBuffers (gl){
var vertices = new Float32Array([
    0, 0.3,   -0.3, -0.3,   0.3, -0.3
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
*/
/*
//RotatingTriangle
var Vshader =`
attribute vec4 Position;
uniform mat4 aMatrix;
void main(){
gl_Position = aMatrix * Position;
}`;
var Fshader=`
precision mediump float;
uniform vec4 fragColor;
void main(){
gl_FragColor = fragColor;
}`;
var ANGLE_STEP = 45.0;
function main(){
var canvas = document.getElementById("webgl");
var gl = canvas.getContext('webgl');

if(!initShaders(gl,Vshader,Fshader)){
    alert("Cannot pass Vshader and Fshader !!");
    return;
}

var n = initBuffers(gl);

gl.clearColor(0.0, 0.0, 0.0, 1.0);

var aMatrix = gl.getUniformLocation(gl.program,'aMatrix');

var fragColor = gl.getUniformLocation(gl.program,'fragColor');
gl.uniform4f(fragColor,1.0,0.0,0.0,1.0);

var tMatrix = new Matrix4();
var currentAngle = 0.0;

var tick = function(){
currentAngle = animate(currentAngle);
draw(gl,n,currentAngle,tMatrix,aMatrix);
requestAnimationFrame(tick); 
};
tick();
}
function initBuffers (gl){
var vertices = new Float32Array([
    0, 0.3,   -0.3, -0.3,   0.3, -0.3
]);
var n = 3;
var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
var Position = gl.getAttribLocation(gl.program,'Position');
gl.vertexAttribPointer(Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(Position);
return n ;
}
function draw(gl,n,currentAngle,tMatrix,aMatrix){
tMatrix.setRotate(currentAngle,0,0,1);
tMatrix.translate(0.35, 0, 0);
gl.uniformMatrix4fv(aMatrix,false,tMatrix.elements);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES,0,n);
}
var last = Date.now();
function animate(angle){
var now = Date.now();
var elapsed = now - last;
last = now; 
var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
return newAngle %= 360;
}
*/
// Ch5
/*
// ColoredTriangle
var Vshader =`
attribute vec4 Position;
attribute vec4 vColor;
varying vec4 fColor;
void main(){
gl_Position = Position;
fColor = vColor;
}`;
var Fshader =`
precision mediump float;
varying vec4 fColor;
void main(){
gl_FragColor = fColor;
}`;

function main(){
var canvas = document.getElementById("webgl");
var gl = canvas.getContext('webgl');

if(!initShaders(gl,Vshader,Fshader)){
    alert("Cannot pass Vshader and Fshader");
}

var n = initBuffers(gl);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initBuffers(gl){
var vertices = new Float32Array([
    0.0,  0.3,  1.0,  0.0,  0.0,
   -0.3, -0.3,  0.0 , 1.0 , 0.0,
    0.3, -0.3,  0.0 , 0.0 , 1.0
]);
var n =3;

var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices ,gl.STATIC_DRAW);

var fSize = vertices.BYTES_PER_ELEMENT;

var Position = gl.getAttribLocation(gl.program, 'Position');
gl.vertexAttribPointer(Position,2 ,gl.FLOAT ,false ,fSize*5 ,0);
gl.enableVertexAttribArray(Position);

var vColor = gl.getAttribLocation(gl.program, 'vColor');
gl.vertexAttribPointer(vColor,2 ,gl.FLOAT ,false ,fSize*5 ,fSize*2);
gl.enableVertexAttribArray(vColor);

return n;
}
*/
/*
// HelloTriangle_FragCoord 
var Vshader =`
attribute vec4 Position;
void main(){
gl_Position = Position;
}`;
var Fshader =`
precision mediump float;
uniform float Width;
uniform float Height;
void main(){
gl_FragColor = vec4 (gl_FragCoord.x/Width ,0.0, gl_FragCoord.y/Height ,1.0);
}`;
function main(){
var canvas = document.getElementById("webgl");
var gl = canvas.getContext('webgl');

if(!initShaders(gl,Vshader,Fshader)){
    alert("Cannot pass Vshader and Fshader !!");
}

var n = initBuffer(gl);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initBuffer (gl){
var vertices = new Float32Array([
    0, 0.5,   -0.5, -0.5,   0.5, -0.5
]);
var n = 3;

var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

var Position = gl.getAttribLocation(gl.program, 'Position');

gl.vertexAttribPointer(Position,2,gl.FLOAT,false,0,0);

var Width = gl.getUniformLocation(gl.program, 'Width');
gl.uniform1f(Width, gl.drawingBufferWidth);

var Height = gl.getUniformLocation(gl.program, 'Height');
gl.uniform1f(Height, gl.drawingBufferHeight);

gl.enableVertexAttribArray(Position);

return n;
}
*/
//  Square Animate right and left
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  void main() {
    gl_Position = u_ModelMatrix * a_Position;
  }`;
var FSHADER_SOURCE =`
 void main() { 
   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`;
function main() {
  var canvas = document.getElementById("webgl");
  var gl = getWebGLContext(canvas);

  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    alert("Failed to intialize shaders.");
  }
 
  var n = initVertexBuffers(gl);

  gl.clearColor(0, 0, 0, 1);
 
  var u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
 
  var tr = 0.0;

  var modelMatrix = new Matrix4();

  var right = 1;

  var tick = function () {
    tr = animate(tr, right);
    if (tr >= 0.7) right = 0;
    else if (tr <= -0.7) right = 1;
    draw(gl, n, 0, modelMatrix, u_ModelMatrix, tr); 
    requestAnimationFrame(tick); 
  };
  tick();
}
 
function initVertexBuffers(gl) {
  var vertices = new Float32Array([-0.3, 0.3, -0.3, -0.3, 0.3, -0.3, 0.3, 0.3]);
  var n = 4; // The number of vertices
 
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }
 
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
 
  // Assign the buffer object to a_Position variable
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
 
  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
 
  return n;
}
function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix, tr) {
  // Set the rotation matrix
  modelMatrix.setRotate(currentAngle, 0, 0, 1);
  modelMatrix.translate(tr, 0, 0);
 
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
 
  gl.clear(gl.COLOR_BUFFER_BIT);
 
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}
function animate(tr, right) {
  var newTR = tr;
  if (right == 1) newTR += 0.01;
  else newTR -= 0.01;
  return newTR;
}