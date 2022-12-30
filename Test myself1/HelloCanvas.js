// HelloShapes
var Vshader = `
attribute vec4 Position;
void main(){
gl_Position = Position;
gl_PointSize = 20.0;
}`;
var Fshader = `
precision mediump float;
uniform vec4 fragColor;
void main(){
gl_FragColor = fragColor;
}`;

var g_points = [];

function main() {
  var canvas = document.getElementById("webgl");
  var gl = canvas.getContext("webgl");

  if (!initShaders(gl, Vshader, Fshader)) {
    alert("Cannot pass Vshader and Fshader !!");
    return;
  }

  //var n = initBuffers(gl);

  var fragColor = gl.getUniformLocation(gl.program, "fragColor");
  gl.uniform4f(fragColor, 1.0, 0.0, 0.0, 1.0);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var Position = gl.getAttribLocation(gl.program, "Position");

  //drawVLine(gl, -0.8 , 0.6 , -0.8 , g_points , 0.01 , Position);
  //drawHLine(gl, -0.8 , 0.6 , -0.8 , g_points , 0.01 , Position);
  
   drawDLine(gl, -0.8 , -0.8 , 0.8 , g_points , 0.1 , Position);
  

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
function initBuffers(gl) {
  var vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  var n = 3;
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var Position = gl.getAttribLocation(gl.program, "Position");
  gl.vertexAttribPointer(Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(Position);
  return n;
}

function drawHLine(gl, startx , endx , y , g_points , step , pos) {
  for (var start = startx; start < endx; start += step) {
    g_points.push([start, y]);
  }
  for (var i = 0; i < g_points.length; i++) {
    gl.vertexAttrib2fv(pos, g_points[i]);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  console.log(g_points);
}

function drawVLine(gl, startY , endY , x , g_points , step , pos) {
  for (var start = startY; start < endY; start += step) {
    g_points.push([x, start]);
  }
  for (var i = 0; i < g_points.length; i++) {
    gl.vertexAttrib2fv(pos, g_points[1]);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  console.log(g_points);
}
function drawDLine(gl, startx, startY , endY , g_points , step , pos) {
  for (var start = startY; start < endY; start += step) {
    g_points.push([startx, start]);
    startx += step
  }
  for (var i = 0; i < g_points.length; i++) {
    gl.vertexAttrib2fv(pos, g_points[1]);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
  console.log(g_points);
}




function drawCircle() {}
