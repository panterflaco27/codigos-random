//funcion principal
function inicializar(){
  color();
  cuadricular();
  pintarnum();
  escaleras();
  serpientes();
  player();
  validar();
}
//crear cuadricula
function cuadricular(){
  var canvas = document.getElementById('pantalla');
  var ctx = canvas.getContext("2d");
  for (var x = 0; x <= 750; x = x+75){
    ctx.moveTo(x,0);
    ctx.lineTo(x,750);
  }
  for (var y = 0; y <= 750; y = y+75){
    ctx.moveTo(0,y);
    ctx.lineTo(750,y);
  }
  ctx.strokeStyle = "black";
  ctx.stroke();
}
//escribir los numeros en el tablero
function pintarnum(){
  var cont = 100;
  var canvas = document.getElementById('pantalla');
  var ctx = canvas.getContext("2d");
  ctx.fillStyle="black";
  ctx.font="bold normal 14px georgia";
  //100 a 91 <--
  if(cont == 100){
    for (var x = 5; x <=680; x = x+75){

      ctx.fillText(cont.toString(),x, 10);
      cont--;
    }
  }
    //90 a 81 -->
  if(cont == 90){
    for (var x = 680; x >=5; x = x-75){
      ctx.fillText(cont.toString(), x, 85);
      cont--;
    }
  }
  //80 a 71 <--
  if(cont == 80){
    for(var x = 5; x <=680; x = x+75){
      ctx.fillText(cont.toString(), x, 160);
      cont--;
    }
  }
  //70 a 61 -->
  if(cont == 70){
    for(var x = 680; x >=5; x = x-75){
      ctx.fillText(cont.toString(), x, 235);
      cont--;
    }
  }
  //60 a 51 <--
  if(cont == 60){
    for(var x = 5; x <=680; x = x+75){
      ctx.fillText(cont.toString(), x, 310);
      cont--;
    }
  }
  //50 a 41 -->
  if(cont == 50){
    for(var x = 680; x >=5; x = x-75){
      ctx.fillText(cont.toString(), x, 385);
      cont--;
    }
  }
  //40 a 31 <--
  if(cont == 40){
    for(var x = 5; x <=680; x = x+75){
      ctx.fillText(cont.toString(), x, 460);
      cont--;
    }
  }
  //30 a 21 -->
  if(cont == 30){
    for(var x = 680; x >=5; x = x-75){
      ctx.fillText(cont.toString(), x, 535);
      cont--;
    }
  }
  //20 a 11 <--
  if(cont == 20){
    for(var x = 5; x <=680; x = x+75){
      ctx.fillText(cont.toString(), x, 610);
      cont--;
    }
  }
  //10 a 1 -->
  if(cont == 10){
    for(var x = 680; x >=5; x = x-75){
      ctx.fillText(cont.toString(), x, 685);
      cont--;
    }
  }
}
//tirar dado al presionar el boton tirar, con recursividad para el 6
function tirardado(){
  var dado = Math.floor(Math.random()*6)+1;
  alert("el dado cayo en: " + dado);
  if(dado == 6){
    tirardado();
  }
}
//color de cada celda del tablero
function color(){
  var canvas = document.getElementById('pantalla');
  var ctx = canvas.getContext("2d");
  var colores = ["#2E70C5","#24B54F","#C52525","#AEC616","#A34CB6","#EE5281"];
  for(var x = 0; x <= 750; x = x+75){
    for(var y = 0; y <= 750; y = y+75){

      ctx.fillStyle=colores[Math.floor(Math.random()*6)];
      ctx.fillRect(x,y,75,75);
    }
  }
}
//escaleras
function escaleras(){
  var canvas = document.getElementById('pantalla');
  var ctx = canvas.getContext("2d");
  var img1 = new Image();
  var img2 = new Image();
  var img3 = new Image();
  var img4 = new Image();
  var img5 = new Image();
  var img6 = new Image();
  img1.src="images/escalera1.png";
  img2.src="images/escalera2.png";
  img3.src="images/escalera3.png";
  img4.src="images/escalera4.png";
  img5.src="images/escalera5.png";
  img6.src="images/escalera6.png";
  img1.onload = function(){
    ctx.drawImage(img1,140,17);
  }
  img2.onload = function(){
    ctx.drawImage(img2,465,180);
  }
  img3.onload = function(){
    ctx.drawImage(img3,695,180);
  }
  img4.onload = function(){
    ctx.drawImage(img4,85,255);
  }
  img5.onload = function(){
    ctx.drawImage(img5,160,615);
  }
  img6.onload = function(){
    ctx.drawImage(img6,530, 545);
  }
}
//serpientes
function serpientes(){
  var canvas = document.getElementById('pantalla');
  var ctx = canvas.getContext("2d");
  var img1 = new Image();
  var img2 = new Image();
  var img3 = new Image();
  var img4 = new Image();
  var img5 = new Image();
  var img6 = new Image();
  img1.src="images/serpiente1.png";
  img2.src="images/serpiente2.png";
  img3.src="images/serpiente3.png";
  img4.src="images/serpiente4.png";
  img5.src="images/serpiente5.png";
  img6.src="images/serpiente6.png";
  img1.onload = function(){
    ctx.drawImage(img1,465,90);
  }
  img2.onload = function(){
    ctx.drawImage(img2,530,460);
  }
  img3.onload = function(){
    ctx.drawImage(img3,250,315);
  }
  img4.onload = function(){
    ctx.drawImage(img4,0,155);
  }
  img5.onload = function(){
    ctx.drawImage(img5,80,30);
  }
  img6.onload = function(){
    ctx.drawImage(img6,180,320);
  }
}
//jugador
function player(){
  var canvas = document.getElementById('pantalla');
  var ctx = canvas.getContext("2d");
  var imgp = new Image();
  imgp.src="images/jugador1.png";
  imgp.onload = function(){
    ctx.drawImage(imgp,245,10,40,50);
  }
}
//mover
function mover(){
  var canvas= document.getElementById('pantalla');
   var ctx = canvas.getContext("2d");
   var img = new Image();
   img.src = "imagen/jugador1.png";
   img.onload = function(){
    /*hacer la funcion para moverlo con los calculos
    para x 20 + 75 
    para y 10 + 75
    creando una funcion que multiplique el valor
    obtenido en el dado por 75 para sumarlo al valor
    base para el centro de la celda donde esta
    */
   }
   validar();
}
//validar
function validar(){
  //obtener la posicion del jugador..., aun no se como
  var pos = x,y;
  /*en base la posicion, mover el jugador
  a donde sea enviado por el case
  ===================================================
  buscar como hacer que las cc del jugador
  se sustituyan por los valores de abajo, ya sea por 
  serpiente o por escalera
  */
  switch (pos){
    //serpientes
    case 95,10:
      pos = 320,385;
      break;
    case 470,85:
      pos = 620,235;
      break;
    case 95,160:
      pos = 20,685;
      break;
    case 395,310:
      pos = 179,460;
      break;
    case 620,310:
      pos = 245,685;
      break;
    case 620,460:
      pos = 545,685;
      break;

    //escaleras
    case 170,160:
      pos = 245,10;
      break;
    case 470,310:
      pos = 470,160;
      break;
    case 695,460:
      pos = 695,160;
      break;
    case 395,610:
      pos = 95,235;
      break;
    case 620,685:
      pos = 545,535;
      break;
    case 170,685:
      pos = 170,610;
      break;
    
    default: break;
  }
}


