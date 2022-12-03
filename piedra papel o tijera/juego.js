function opcion(op){
  var mensaje = ["empate","ganas","pierdes"];
  var nombre = ["piedra","papel","tijera","lagarto","spock"];

  var jugada = [
              [0,1,2,2,1],
              [2,0,1,1,2],
              [1,2,0,2,1],
              [1,2,1,0,2],
              [2,1,2,1,0]
                ];

  var cpu = Math.floor((Math.random()*5));
  var resultado = jugada[cpu][op];

  alert("humano: " + nombre[op] +"\r"+ "cpu: " + nombre[cpu] +"\r"+ "resultado: " + mensaje[resultado]);
}
