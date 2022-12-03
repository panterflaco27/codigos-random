var canvas;
var ctx;
var fps = 30;

//tamaño del canvas
var canvasX = 500;
var canvasY = 500;

//tamaño de los pixeles
var tileX, tileY;

//variables del tablero
var tablero;
var filas = 100;
var columnas = 100;
var blanco ='#FFFFFF';
var negro = '#000000';

//funcion de inicio
function inicializa(){
  //asociamos el canvas
  canvas = document.getElementById('pantalla');
  ctx = canvas.getContext('2d');

  //tamaño del canvas
  canvas.width = canvasX;
  canvas.height = canvasY;

  //calcular el tamaño de los tiles
  tileX = Math.floor(canvasX / filas);
  tileY = Math.floor(canvasY / columnas);

  //crear el tablero
  tablero = creaArray2D(filas, columnas);

  //iniciar tablero
  inicializaTablero(tablero);

  //ejecucion del bucle principal
  setInterval(function(){principal();},1000/fps);
}

//maquina de turing
var agente = function(x, y, estado){
  this.x = x;
  this.y = y;
  this.estado = estado; //vivo = 1, muerto = 2
  this.estadoprox = this.estado; //siguiente ciclo
  this.vecinos = []; //array de los vecinos (8)

  //los vecinos sigan de ambos lados simultaneamente
  this.addVecinos = function(){
    var xVecino;
    var yVecino;

    //bucle que recorre la matriz de 3x3 para los vecinos
    for(i = -1; i < 2; i++){
      for(j = -1; j < 2; j++){
        xVecino = (this.x + j + columnas) % columnas;
        yVecino = (this.y + i + filas) % filas;

        //descartar el agente actual
        if(i != 0 || j != 0){
          this.vecinos.push(tablero[yVecino][xVecino]);
        }
      }
    }
    /*la matriz queda asi
        [(-1,-1),(0,-1),(1,-1)]
        [(-1,0 ),(0,0 ),(1,0 )]
        [(-1,1 ),(0,1 ),(1,1 )]
    */
  }

  //dibujar
  this.dibuja = function(){
    var color;
    if(this.estado == 1){
      color = blanco;
    }else{
      color = negro;
    }
    ctx.fillStyle = color;
    ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
  }

  //leyes de conway
  this.nuevoCiclo = function(){
    var suma = 0;
    //calcular los vecinos vivos
    for(i = 0; i < this.vecinos.length; i++){
      suma += this.vecinos[i].estado;
    }
    /* aplicamos las normas

      si tiene menos de 2 vecinos, muere
      si tiene 2 vecinos, se queda igual
      si tiene 3 vecinos, se reproduce
      si tiene mas de 3 vecinos, muere

    */
    this.estadoprox = this.estado; //por defecto, igual

    //muerte -> menos de 2, o mas de 3
    if(suma < 2 || suma > 3){
      this.estadoprox = 0;
    }

    //vivo, reproduccion, 3 vecinos
    if(suma == 3){
      this.estadoprox = 1;
    }
  }

  //mutacion
  this.mutacion = function(){
    this.estado = this.estadoprox;
  }
}

//inicializar tablero
function inicializaTablero(obj){
  var estado;
  for(y = 0; y < filas; y++){
    for(x = 0; x < columnas; x++){
      estado = Math.floor(Math.random()*2);
      obj[y][x] = new agente(x, y, estado);
    }
  }
  for(y = 0; y < filas; y++){
    for(x = 0; x < columnas; x++){
      obj[y][x].addVecinos();
    }
  }

}

//tablero
function creaArray2D(f,c){
  var obj = new Array(f);
  for(i = 0; i < c; i++){
    obj[i] = new Array(c);
  }
  return obj;
}

//borrar el canvas
function borraCanvas(){
  canvas.width = canvas.width;
  canvas.height = canvas.height;
}

//dibujar los agentes
function dibujaTablero(obj){
  for(y = 0; y < filas; y++){
    for(x = 0; x < columnas; x++){
      obj[y][x].dibuja();
    }
  }

  //calcular el siguiente ciclo
  for(y = 0; y < filas; y++){
    for(x = 0; x < columnas; x++){
      obj[y][x].nuevoCiclo();
    }
  }

  //aplica la mutacion
  for(y = 0; y < filas; y++){
    for(x = 0; x < columnas; x++){
      obj[y][x].mutacion();
    }
  }
}

//main
function principal(){
  borraCanvas();
  dibujaTablero(tablero);
}
