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

var Trans_STEP = 1.0;

var Tx=0;

function main() {
    var canvas = document.getElementById('myCanvas');
    var gl = getWebGLContext(canvas);
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    var n = initVertexBuffers(gl);


    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    var modelMatrix = new Matrix4();

    var tick = function () {
        newTranslate = animate();
        draw(gl, n, modelMatrix, u_ModelMatrix);
        requestAnimationFrame(tick, canvas);
    };
    tick();
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        -0.2, 0.2, 
        0.2, 0.2, 
        0.2, -0.2, 
        -0.2, -0.2
    ]);
    var n = 4;

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

function draw(gl, n, modelMatrix, u_ModelMatrix) {
    modelMatrix.setTranslate(Tx, 0, 0);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

var g_last = Date.now();
function animate() {
    var now = Date.now();
    var elapsed = now - g_last;
    g_last = now;

    Tx = Tx + (Trans_STEP * elapsed) / 1000.0;
    if(Tx>0.8||Tx<-0.8)
    Trans_STEP=-1*Trans_STEP;
}