var vp = document.getElementById("villaplatzi");
var text = document.getElementById("instrucciones");
var papel = vp.getContext("2d");

var flechas = {
  LEFT :37,
  UP   :38,
  RIGHT:39,
  DOWN :40
}

var positionX = 300;
var positionY = 400;
var seleccion = "pollo";

var amountVacas = aleatorio(0, 8);
var amountCerdos = aleatorio(0, 3);
var amountPollos = aleatorio(0, 5);

var fondo = {
  url     : "images/tile.png",
  cargaOK : false
};
var vaca = {
  urlL    : "images/vacaL.png",
  urlR    : "images/vacaR.png",
  cargaOK : false,
  newStart: true
};
var cerdo = {
  urlL    : "images/cerdoL.png",
  urlR    : "images/cerdoR.png",
  cargaOK : false,
  newStart: true
};
var pollo = {
  urlL    : "images/polloL.png",
  urlR    : "images/polloR.png",
  cargaOK : false,
  newStart: true
};
var personaje = {
  urlLeft    : "images/"+seleccion+"L.png",
  urlRight   : "images/"+seleccion+"R.png",
  cargaOK    : false
};

startFondo();

function inicio(){
  document.addEventListener("keydown", moverPersonaje);
  startVacas();
  startCerdos();
  startPollos();
  startPersonaje();
}

function startFondo(){
  fondo.imagen = new Image();
  fondo.imagen.src = fondo.url;
  fondo.imagen.addEventListener("load", cargarFondo);
}

function startVacas(){

  vaca.imagen = new Image();
  vaca.imagen.src = vaca.urlL;
  vaca.imagen.addEventListener("load", cargarVacas);
  vaca.coordenadasX = new Array(amountVacas);
  vaca.coordenadasY = new Array(amountVacas);
}

function startCerdos(){
  cerdo.imagen = new Image();
  cerdo.imagen.src = cerdo.urlR;
  cerdo.imagen.addEventListener("load", cargarCerdos);
  cerdo.coordenadasX = new Array(amountCerdos);
  cerdo.coordenadasY = new Array(amountCerdos);
}

function startPollos(){
  pollo.imagen = new Image();
  pollo.imagen.src = pollo.urlR;
  pollo.imagen.addEventListener("load", cargarPollos);
  pollo.coordenadasX = new Array(amountPollos);
  pollo.coordenadasY = new Array(amountPollos);
}

function startPersonaje(){
  personaje.imagen = new Image();
  personaje.imagen.src = personaje.urlLeft;
  personaje.imagen.addEventListener("load", cargarPersonaje);
}


function cargarFondo(){
  fondo.cargaOK = true;
  dibujar(positionX, positionY);
  inicio();
}

function cargarVacas(){
  vaca.cargaOK = true;
  dibujar(positionX, positionY);
}

function cargarCerdos(){
  cerdo.cargaOK = true;
  dibujar(positionX, positionY);
}

function cargarPollos(){
  pollo.cargaOK = true;
  dibujar(positionX, positionY);
}

function cargarPersonaje(){
  personaje.cargaOK = true;
  dibujar(positionX, positionY);
}


function dibujar(posX, posY){

  if(fondo.cargaOK){
    papel.drawImage(fondo.imagen, 0, 0);
  }

  if(vaca.cargaOK){

    for(var v=0;v<amountVacas;v++){
      if(vaca.newStart){
        var x = aleatorio(0, 7)*60;
        var y = aleatorio(0, 7)*60;
        vaca.coordenadasX[v] = x;
        vaca.coordenadasY[v] = y;
      }

      papel.drawImage(vaca.imagen, vaca.coordenadasX[v], vaca.coordenadasY[v]);
    }
    vaca.newStart = false;
  }

  if(cerdo.cargaOK){
    for(var c=0;c<amountCerdos;c++){
      if(cerdo.newStart){
        var x = aleatorio(0, 7)*60;
        var y = aleatorio(0, 7)*60;
        cerdo.coordenadasX[c] = x;
        cerdo.coordenadasY[c] = y;
      }
      papel.drawImage(cerdo.imagen, cerdo.coordenadasX[c], cerdo.coordenadasY[c]);
    }
    cerdo.newStart = false;
  }

  if(pollo.cargaOK){
    for(var p=0;p<amountPollos;p++){
      if(pollo.newStart){
        var x = aleatorio(0, 7)*60;
        var y = aleatorio(0, 7)*60;
        pollo.coordenadasX[p] = x;
        pollo.coordenadasY[p] = y;
      }
      papel.drawImage(pollo.imagen, pollo.coordenadasX[p], pollo.coordenadasY[p]);
    }
    pollo.newStart = false;
  }

  if(personaje.cargaOK){
    papel.drawImage(personaje.imagen, posX, posY)
  }
}

function moverPersonaje(evento){
  var movimiento = 10;
  switch (evento.keyCode) {
    case flechas.LEFT:
      personaje.imagen.src = personaje.urlLeft;
      if(positionX>=-10){
        dibujar(positionX-movimiento, positionY);
        positionX -= movimiento;
      }
    break;
    case flechas.UP:
      if(positionY>=-20){
        dibujar(positionX, positionY-movimiento);
        positionY -= movimiento;
      }
    break;
    case flechas.RIGHT:
      personaje.imagen.src = personaje.urlRight;
      if(positionX <=430){
        dibujar(positionX+movimiento, positionY);
        positionX += movimiento;
      }
    break;
    case flechas.DOWN:
      if(positionY<=435){
        dibujar(positionX, positionY+movimiento);
        positionY += movimiento;
      }
    break;
    default:

  }
}

function aleatorio(min, max){
  var resultado;
  resultado = Math.floor(Math.random()*(max - min + 1)) + min;
  return resultado;
}
