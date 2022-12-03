//variables
var canvas;
var ctx;
var fps = 50;

//tablero
var columnas = 50;
var filas = 50;
var escenario;  //matriz del nivel

//tiles
var anchoT;
var altoT;
const muro = '#000000';
const tierra = '#777777';

//ruta
var principio;
var fin;
var openSet = [];
var closedSet = [];
var camino = [];
var terminado = false;

function creaArray2D(f,c){
  var obj = new Array(f);
  for(a=0;a<f;a++){
    obj[a] = new Array();
  }
  return obj;
}

function heuristica(a,b){
  var x = Math.abs(a.x - b.x);
  var y = Math.abs(a.y - b.y);

  var dist = x + y;

  return dist;
}

//borrar un objeto del Array
function borrarArray(array, elemento){
  for(i = array.length-1; i >= 0; i--){
    if(array[i] == elemento){
      array.splice(i,1);
    }
  }
}

function casilla(x,y){
  //posiscion
  this.x = x;
  this.y = y;

  //tipo, muro = 1 o vacio = 0
  this.tipo = 0;
  var aleatorio = Math.floor(Math.random()*5);  //0 - 4
  if(aleatorio == 1){
    this.tipo = 1;
  }

  //pesos
  this.f = 0;  //(g + h)
  this.g = 0;  //pasos dados
  this.h = 0;  //heuristica (estimacion del destino)

  this.vecinos = [];
  this.padre = null;


  //metodo que calcule los vecinos
  this.addVecinos = function(){
    if(this.x > 0){
      this.vecinos.push(escenario[this.y][this.x-1]);  //vecino izquierdo
    }

    if(this.x < filas-1){
      this.vecinos.push(escenario[this.y][this.x+1]);  //vecino derecho
    }

    if(this.y > 0){
      this.vecinos.push(escenario[this.y-1][this.x]);  //vecino arriba
    }

    if(this.y < columnas-1){
      this.vecinos.push(escenario[this.y+1][this.x]);  //vecino de abajo
    }
  }

//metodo que dibuja la casilla
  this.dibuja = function(){
    var color;
    if(this.tipo == 0){
      color = tierra;
    }else{
      color = muro;
    }

    //dibujar el cuador en el canvas
    ctx.fillStyle = color;
    ctx.fillRect(this.x*anchoT, this.y*altoT, anchoT, altoT);
  }

  //dibujar openSet
  this.dibujaOS = function(){
    ctx.fillStyle = '#008000';
    ctx.fillRect(this.x*anchoT, this.y*altoT, anchoT, altoT);
  }

  //dibujar closedSet
  this.dibujaCS = function(){
    ctx.fillStyle = '#800000';
    ctx.fillRect(this.x*anchoT, this.y*altoT, anchoT, altoT);
  }

  //dibuja camino
  this.dibujaCamino = function(){
    ctx.fillStyle = '#00FFFF';
    ctx.fillRect(this.x*anchoT, this.y*altoT, anchoT, altoT);
  }
}

function inicializar(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  //calcular el tamaño de los tiles
  anchoT = parseInt(canvas.width/columnas);
  altoT = parseInt(canvas.height/filas);

  //creamos la matriz
  escenario = creaArray2D(filas, columnas);

  //añadir los objetos casilla
  for (i = 0; i < filas; i++){
    for(j = 0; j< columnas; j++){
      escenario[i][j] = new casilla(j, i)
    }
  }

  //añadimos los vecinos
  for (i = 0; i < filas; i++){
    for(j = 0; j< columnas; j++){
      escenario[i][j].addVecinos();
    }
  }

  //crear origen y final
  principio = escenario[0][0];
  fin = escenario[columnas-1][filas-1];

  //inicalizar openSet
  openSet.push(principio);

  //empezamos a ejecutar la principal
  setInterval(function(){principal();},1000/fps);
}

function dibujaEscenario(){
  for (i = 0; i < filas; i++){
    for(j = 0; j< columnas; j++){
      escenario[i][j].dibuja();
    }
  }

  //dibuja openSet
  for(i = 0; i < openSet.length; i++){
    openSet[i].dibujaOS();
  }

  //dibuja closedSet
  for(i = 0; i < closedSet.length; i++){
    closedSet[i].dibujaCS();
  }

  //dibuja camino
  for(i = 0; i < camino.length; i++){
    camino[i].dibujaCamino();
  }
}

//borrar canvas
function borrarCanvas(){
  canvas.width = canvas.width;
  canvas.height = canvas .height;
}



function algoritmo(){
  if(terminado != true){
    //seguimos si hay algo en openSet
    if(openSet.length > 0){
      var ganador = 0;  //indice dentro del array openSet del ganador

      //evaluar que openSet tiene un menor esfuerzo
      for( i = 0; i < openSet.length; i++){
        if(openSet[i].f < openSet[ganador].f){
          ganador = i;
        }
      }

      //analizar la casilla ganador
      var actual = openSet[ganador];

      //si hemos llegado al final, buscamos el camino de vuelta
      if(actual === fin){
        var temporal = actual;
        camino.push(temporal);

        while(temporal.padre != null){
          temporal = temporal.padre;
          camino.push(temporal);
        }
        console.log('camino encontrado');
        terminad = true;
      }

      //si no hemos llegaod al final
      else{
        borrarArray(openSet, actual);
        closedSet.push(actual);

        var vecinos = actual.vecinos;

        //recorro los vecino del ganador
        for(i = 0; i < vecinos.length; i++){
          var vecino = vecinos[i];

          //si el vecino no esta en closedSet y no es una pared, hacemos los calculos
          if(!closedSet.includes(vecino) && vecino.tipo !=1){
            var tempG = actual.g + 1;

            //si el vecino esta en openSet y su peso es mayor
            if(openSet.includes(vecino)){
                if(tempG < vecino.g){
                  vecino.g = tempG;  //camino mas corto
                }
            }
            else{
              vecino.g = tempG;
              openSet.push(vecino);
            }

            //actualizar valores
            vecino.h = heuristica(vecino, fin);
            vecino.f = vecino.g + vecino.h;

            //guardamos el padre de donde venimos
            vecino.padre = actual;
          }
        }
      }
    }
    else{
      //no hay camino
      console.log('camino no encontrado');
      terminado = true;  //el algoritmo termina
    }
  }
}

function principal(){
  borrarCanvas();
  algoritmo();
  dibujaEscenario();
}
