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

var ANGLE_STEP = 45;

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

  var n = initBuffers(gl);
  var s = initBuffers4(gl, 0.7, 0.3, 0.2, 0.3, 0.2, 0.7, 0.7, 0.7);
  var r = initBuffers4(gl, 0.7, -0.3, 0.2, -0.3, 0.2, -0.5, 0.7, -0.5);
  var rh = initBuffers4(gl, -0.7, -0.4, -0.4, -0.001, -0.1, -0.4, -0.4, -0.8);

  var currentAngle = 0.0;

  var tick = function () {
    currentAngle = animate(currentAngle);
    nDraw(gl, n, currentAngle, gMatrix, Matrix);
    sDraw(gl, s, currentAngle, gMatrix, Matrix);
    rDraw(gl, r, currentAngle, gMatrix, Matrix);
    rhDraw(gl, rh, currentAngle, gMatrix, Matrix);
    requestAnimationFrame(tick);
  };
  tick();
}
function initBuffers(gl) {
  var vertices = new Float32Array([-0.7, 0.3, -0.43, 0.7, -0.2, 0.3]);
  var n = 3;
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var Position = gl.getAttribLocation(gl.program, "Position");
  gl.vertexAttribPointer(Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(Position);
  return n;
}
function initBuffers4(gl, a, b, c, d, e, f, g, h) {
  var vertices = new Float32Array([a, b, c, d, e, f, g, h]);
  var n = 4;
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var Position = gl.getAttribLocation(gl.program, "Position");
  gl.vertexAttribPointer(Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(Position);
  return n;
}
var last = Date.now();
function animate(currentAngle) {
  var now = Date.now();
  var elapsed = now - last;
  last = now;
  var newAngle = currentAngle + (ANGLE_STEP * elapsed) / 1000.0;
  return (newAngle %= 360);
}
function nDraw(gl, n, currentAngle, gMatrix, Matrix) {
  gMatrix.setRotate(currentAngle, 0, 0, 1);
  gMatrix.translate(0.2, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}
function sDraw(gl, s, currentAngle, gMatrix, Matrix) {
  gMatrix.setRotate(currentAngle, 0, 0, 1);
  gMatrix.translate(0.2, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, s);
}
function rDraw(gl, r, currentAngle, gMatrix, Matrix) {
  gMatrix.setRotate(currentAngle, 0, 0, 1);
  gMatrix.translate(0.2, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, r);
}
function rhDraw(gl, rh, currentAngle, gMatrix, Matrix) {
  gMatrix.setRotate(currentAngle, 0, 0, 1);
  gMatrix.translate(0.2, 0, 0);
  gl.uniformMatrix4fv(Matrix, false, gMatrix.elements);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, rh);
}
