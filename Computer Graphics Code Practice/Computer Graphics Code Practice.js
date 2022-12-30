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

var Trans_STEP = 1.0;
var Tx=0;

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
tMatrix.translate(Tx, 0, 0);
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
Tx = Tx + (Trans_STEP * elapsed) / 1000.0;
if(Tx>0.8||Tx<-0.8)
Trans_STEP=-1*Trans_STEP;
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
/*
//  Square Animate right and left
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  void main() {
    gl_Position = u_ModelMatrix * a_Position;
  }`;
var FSHADER_SOURCE = `
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
*/
// Cube
/*
var vShader=`
attribute vec4 myPosition;
uniform mat4 myFinaleMatrix;
void main() {
    gl_Position = myFinaleMatrix*myPosition;
    gl_PointSize = 10.0;
}`;
var fShader=`
precision mediump float;
uniform vec4 myColor;
void main(){
    gl_FragColor = myColor;
}`; 

var transStep1 = 0.5;
var Tx = 0.0;
var transStep2 = 0.5;
var Ty = 0.0

var angleStep = -90.0;
var currentAngle = 0.0;

function main() {
    var canvas=document.getElementById("webgl");
    var gl = getWebGLContext(canvas);

    initShaders(gl,vShader,fShader)

    //getting attrib and uniform
    var positionLocation = gl.getAttribLocation(gl.program,"myPosition");
    var colorLocation = gl.getUniformLocation(gl.program,"myColor");
    var finaleMatrixLocation = gl.getUniformLocation(gl.program,"myFinaleMatrix");

    //init buffer
    var n= initBuffer(gl,positionLocation);

    //set finale matrix
    var finaleMatrix = new Matrix4();

    gl.clearColor(0.0,0.0,0.0,1.0);


    var tick = function(){
        animate();
        draw(gl,finaleMatrixLocation,finaleMatrix,colorLocation);
        requestAnimationFrame(tick);
    };
    tick();
}
function initBuffer(gl,positionLocation)
{
    var vertices = new Float32Array([
        -0.5-0.30,-0.25-0.25,
        -0.5-0.30, 0.25-0.25,
        0.0-0.30,0.05-0.25,
      
        -0.5-0.30,-0.25-0.25,
        0.0-0.30,0.05-0.25,
        0.0-0.30,-0.45-0.25,
        
        -0.5-0.25, 0.25-.10,
        0.0 -0.25, 0.45-.10,
        0.0-0.25,0.05-.10,

        0.0 -0.25, 0.45-.10,
        0.0-0.25,0.05-.10,
        0.5-0.25,0.25-.10,
        
        0.5-0.20, 0.25-0.25,
        0.0-0.20,0.05-0.25,
        0.0-0.20,-0.45-0.25,
        
        0.5-0.20, 0.25-0.25,
        0.5-0.20,-0.25-0.25,
        0.0-0.20,-0.45-0.25
    ]);
    var n = 18;

    var myBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,myBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    gl.vertexAttribPointer(positionLocation,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(positionLocation); 
    return n; 
}
function draw(gl,finaleMatrixLocation,finaleMatrix,colorLocation) {
    finaleMatrix.setTranslate(Tx,Ty,0.0);
    finaleMatrix.rotate(currentAngle,0.0,0.0,1.0);
    gl.uniformMatrix4fv(finaleMatrixLocation,false,finaleMatrix.elements);
    finaleDraw(gl,colorLocation);
}

function finaleDraw(gl,colorLocation) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform4f(colorLocation,Math.random(),Math.random(),Math.random(),1.0);
    gl.drawArrays(gl.TRIANGLES,0,18);
    gl.uniform4f(colorLocation,Math.random(),Math.random(),Math.random(),1.0);
    gl.drawArrays(gl.TRIANGLES,6,6);
    gl.uniform4f(colorLocation,Math.random(),Math.random(),Math.random(),1.0); 
    gl.drawArrays(gl.TRIANGLES,12,6);
}
var lastTime=Date.now();
function animate() {
    var now = Date.now();
    var elapse = now - lastTime;
    lastTime = now;
    Tx = Tx + (transStep1 * elapse) / 1000.0;
    if(Tx > 0.7 || Tx < -0.2)
    transStep1 *=-1;
    Ty = Ty + (transStep2 * elapse) / 1000.0;
    if(Ty > 0.7 || Ty < -0.2)
    transStep2 *=-1;
    currentAngle = currentAngle + (angleStep * elapse) / 1000.0;
    currentAngle %= 360;
}
*/
/*
// Rotating Translation Square
var Vshader = `
attribute vec4 Position;
uniform mat4 vMatrix;
void main(){
  gl_Position = vMatrix*Position;
}`;
var Fshader = `
void main(){
  gl_FragColor = vec4 (1.0,0.0,0.0,1.0);
}`;

var transStep1 = 1.0;
var Tx =0.0;
var transStep2 = 2.0;
var Ty =0.0;
var angleStep = 45.0;

function main() {
   // Retrieve <canvas> element
   var canvas = document.getElementById('webgl');
 
   // Get the rendering context for WebGL
   var gl = canvas.getContext('webgl');
   if (!gl) {
     console.log('Failed to get the rendering context for WebGL');
     return;
   }

   initShaders(gl,Vshader,Fshader);

   var n = initBuffers(gl);

      // Set clear color
      gl.clearColor(0.0, 0.0, 0.0, 1.0);

   var vMatrix = gl.getUniformLocation(gl.program,'vMatrix');

   var Matrix = new Matrix4();

   var currentAngle = 0.0;
  
   var tick = function(){
    currentAngle = animate(currentAngle);
    draw(gl,n,vMatrix,Matrix,currentAngle);
    requestAnimationFrame(tick);
   }
   tick();
 }
 function initBuffers(gl){
  var vertices = new Float32Array([
    -0.2, 0.2, 
     0.2, 0.2, 
     0.2, -0.2, 
    -0.2, -0.2
  ]);
  var n = 4;
  var Buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);
  gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
  var Position = gl.getAttribLocation(gl.program, 'Position');
  gl.vertexAttribPointer(Position,2,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(Position);
  return n;
 }
 var last = Date.now();
 function animate(currentAngle){
  var now = Date.now();
  var elapsed = now - last;
  last = now ; 
  Tx = Tx + (transStep1 * elapsed) / 1000.0;
  if(Tx > 0.8 || Tx < -0.8)
    transStep1 *=-1;
    Ty = Ty + (transStep2 * elapsed) / 1000.0;
  if(Ty > 0.8 || Ty < -0.8)
    transStep2 *=-1;

    currentAngle = currentAngle +(angleStep*elapsed) / 1000.0;
    return currentAngle %=360;
 }
 function draw(gl,n,vMatrix,Matrix,currentAngle){
  Matrix.setTranslate(Tx,Ty,0);
  Matrix.rotate(currentAngle,0.0,0.0,1.0);
  gl.uniformMatrix4fv(vMatrix, false,Matrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN,0, n);
 }
*/
/*
// Clock 
var VSHADER_SOURCE = `
   attribute vec4 a_Position; 
   uniform mat4 u_ModelMatrix; 
   void main() { 
     gl_Position = u_ModelMatrix * a_Position; 
  }`;

var FSHADER_SOURCE = `  
   void main() {
   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); 
   }`;

var SecsStep = -200;
var MinsStep = SecsStep / 60.0;
var HoursStep = MinsStep / 60.0;

var HoursAngle = 0.0;
var MinsAngle = 0.0;
var SecsAngle = 0.0;

function main() {
  var canvas = document.getElementById("webgl");
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  var u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  var modelMatrix = new Matrix4();

  var tick = function () {
    animate();
    draw(gl, modelMatrix, u_ModelMatrix);
    requestAnimationFrame(tick, canvas);
  };
  tick();
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.4, 0.0, 0.0, 0.0, 0.6,
  ]);

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
}

function draw(gl, modelMatrix, u_ModelMatrix) {
  gl.clear(gl.COLOR_BUFFER_BIT);

  modelMatrix.setRotate(HoursAngle, 0, 0, 1);
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.LINES, 0, 2);

  modelMatrix.setRotate(MinsAngle, 0, 0, 1);
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.LINES, 2, 2);

  modelMatrix.setRotate(SecsAngle, 0, 0, 1);
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.LINES, 4, 2);
}

var g_last = Date.now();
function animate() {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;

  HoursAngle = HoursAngle + (HoursStep * elapsed) / 1000.0;
  MinsAngle = MinsAngle + (MinsStep * elapsed) / 1000.0;
  SecsAngle = SecsAngle + (SecsStep * elapsed) / 1000.0;
}
*/
/*
let vshader = `
  attribute vec4 pos;
  uniform mat4 transformation;
  attribute float size;
  attribute vec4 color;
  varying vec4 v_color;
  void main() {
    gl_Position = transformation * pos;
    gl_PointSize = size;
    v_color = color;
  }
`;

let fshader = `
  precision mediump float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;

let translate = 0;
let translate_step = 0.01;
let angle = 0.0;
let angle_step = 45;

function main() {
  let canvas = document.getElementById("webgl");
  let gl = getWebGLContext(canvas);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  initShaders(gl, vshader, fshader);

  let vertices = new Float32Array([
    0.0, 0.5, 10.0, 1.0, 0.0, 0.0, -0.5, 0.0, 20.0, 0.0, 1.0, 0.0, 0.5, 0.0,
    30.0, 0.0, 0.0, 1.0,
  ]);

  let n = initBuffer(gl, vertices);

  let frame = function () {
    animate(gl);
    transformation_matrix(gl);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
    requestAnimationFrame(frame);
  };

  frame();
}

function initBuffer(gl, vertices) {
  let vertex_buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  let pos_idx = gl.getAttribLocation(gl.program, "pos");
  let size_idx = gl.getAttribLocation(gl.program, "size");
  let color_idx = gl.getAttribLocation(gl.program, "color");

  let SIZE = vertices.BYTES_PER_ELEMENT;

  gl.vertexAttribPointer(pos_idx, 2, gl.FLOAT, false, SIZE * 6, 0);
  gl.vertexAttribPointer(size_idx, 1, gl.FLOAT, false, SIZE * 6, SIZE * 2);
  gl.vertexAttribPointer(color_idx, 3, gl.FLOAT, false, SIZE * 6, SIZE * 3);

  gl.enableVertexAttribArray(pos_idx);
  gl.enableVertexAttribArray(size_idx);
  gl.enableVertexAttribArray(color_idx);

  return vertices.length;
}

function transformation_matrix(gl) {
  let transformation_idx = gl.getUniformLocation(gl.program, "transformation");

  let transformation = new Matrix4();

  transformation.setRotate(angle, 0, 0, 1);
  transformation.translate(translate, 0.0, 0.0);

  gl.uniformMatrix4fv(transformation_idx, false, transformation.elements);
}

let last = Date.now();
function animate() {
  let now = Date.now();
  let elapsed = now - last;
  last = now;

  angle = angle + (angle_step * elapsed) / 1000;
  angle %= 360;

  if (translate >= 0.5 || translate <= -0.5) translate_step *= -1;

  translate += translate_step;
}
*/
// // Prctice Exam 
// var Vshader = `
// attribute vec4 Position;
// void main(){
// gl_Position = Position;
// }`;
// var Fshader = `
// void main(){
//     gl_FragColor = vec4(1.0,0.0,0.0,1.0);
// }`;

// function main (){
// var canvas = document.getElementById("webgl");
// var gl = canvas.getContext('webgl');

// if(!initShaders(gl,Vshader,Fshader)){
//     alert("Filed pass Vshader and Fshader !!");
//     return;
// }

// initBuffers(gl);

// gl.clearColor(0,0,0,1);
// gl.clear(gl.COLOR_BUFFER_BIT);
// gl.drawArrays(gl.TRIANGLES, 0, 3);
// gl.drawArrays(gl.TRIANGLE_FAN, 4, 7);
// }
// function initBuffers(gl){
// var vertices = new Float32Array([
//     -0.9,0.0,  -0.7,0.5,   -0.5,0.0, 
//     0.0,0.0,   0.0,0.5,   0.5,0.5,  0.5,0.0
// ]);
// var vBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER,vBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, vertices,gl.STATIC_DRAW);
// var Position = gl.getAttribLocation(gl.program,'Position');
// gl.vertexAttribPointer(Position,2,gl.FLOAT,false,0,0);
// gl.enableVertexAttribArray(Position);
// }

var Vshader = `
attribute vec4 Position;
uniform mat4 Matrix;
void main(){
gl_Position = Matrix * Position;
}`;
var Fshader = `
void main(){
gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}`;

var ANGLE_STEP1 = 90;
var ANGLE_STEP2 = -90;
var ANGLE_STEP3 = -45;
var ANGLE_STEP4 = 45;

var currentAngle1 = 0.0;
var currentAngle2 = 0.0;
var currentAngle3 = 0.0;
var currentAngle4 = 0.0;

var transStep1 = 0.6;
var transStep2 = 0.3;
var transStep3 = 0.4;
var transStep4 = 0.1;

var Tx1 = 0.0 ;
var Tx2 = 0.0 ;
var Tx3 = 0.0 ;
var Tx4 = 0.0 ;

function main() {
  var canvas = document.getElementById("webgl");
  var gl = canvas.getContext("webgl");

  // pass Vshader and Fshader
  if (!initShaders(gl, Vshader, Fshader)) {
    alert("Cannot pass Vshader and Fshader !!");
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  var Matrix = gl.getUniformLocation(gl.program, "Matrix");

  var gMatrix = new Matrix4();

  initBuffers(gl);

  var tick = function () {
    animate();
    Draw(gl, gMatrix, Matrix);
    requestAnimationFrame(tick);
  };
  tick();
}
function initBuffers(gl) {
  var vertices = new Float32Array([
    -0.7, 0.3, -0.43, 0.7, -0.2, 0.3,
    0.7, 0.3, 0.2, 0.3, 0.2, 0.7, 0.7, 0.7,
    0.7, -0.3, 0.2, -0.3, 0.2, -0.5, 0.7, -0.5,
    -0.7, -0.4, -0.4, -0.001, -0.1, -0.4, -0.4, -0.8
  ]);
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var Position = gl.getAttribLocation(gl.program, "Position");
  gl.vertexAttribPointer(Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(Position);
}
var last = Date.now();
function animate() {
  var now = Date.now();
  var elapsed = now - last;
  last = now;
  currentAngle1 = currentAngle1 + (ANGLE_STEP1 * elapsed) / 1000.0;
  currentAngle1 %= 360;
  currentAngle2 = currentAngle2 + (ANGLE_STEP2 * elapsed) / 1000.0;
  currentAngle2 %= 360;
  currentAngle3 = currentAngle3 + (ANGLE_STEP3 * elapsed) / 1000.0;
  currentAngle3 %= 360;
  currentAngle4 = currentAngle4 + (ANGLE_STEP4 * elapsed) / 1000.0;
  currentAngle4 %= 360;

  Tx1 = Tx1 + (elapsed * transStep1) / 1000.0;
  if (Tx1 >0.3 || Tx1 < -0.3) transStep1 *= -1;
  Tx2 = Tx2 + (elapsed * transStep2) / 1000.0;
  if (Tx2 >0.1 || Tx2 < -0.1) transStep2 *= -1;
  Tx3 = Tx3 + (elapsed * transStep3) / 1000.0;
  if (Tx3 >0.3 || Tx3 < -0.3) transStep3 *= -1;
  Tx4 = Tx4 + (elapsed * transStep4) / 1000.0;
  if (Tx4 >0.3 || Tx4 < -0.3) transStep4 *= -1;
}
function Draw(gl, gMatrix, Matrix) {
  gl.clear(gl.COLOR_BUFFER_BIT);
  gMatrix.setRotate(currentAngle1, 0, 0, 1);
  gMatrix.translate(Tx1, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gMatrix.setRotate(currentAngle2, 0, 0, 1);
  gMatrix.translate(Tx2, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_FAN, 3, 4);
  gMatrix.setRotate(currentAngle3, 0, 0, 1);
  gMatrix.translate(Tx3, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_FAN, 7, 4);
  gMatrix.setRotate(currentAngle4, 0, 0, 1);
  gMatrix.translate(Tx4, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_FAN, 11, 4);
}

