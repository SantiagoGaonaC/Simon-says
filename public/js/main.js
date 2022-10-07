var ronda = document.getElementById("ronda");
var botonsn = document.getElementsByClassName("sbtn");
var iniciarbtn = document.getElementById("iniciarbtn");
var easyMode = document.getElementById("easy");
var mediumMode = document.getElementById("medium");
var hardMode = document.getElementById("hard");
var dictPrubea = {};

class Simon {
  constructor(botonsn, iniciarbtn, ronda, easyMode, mediumMode, hardMode) {
    this.secuencia = [];
    this.botonesBloqueados = true;
    this.velocidad = 1000;
    this.RondasWin = 5;
    this.posicionUsuario = 0;
    this.ronda = 0;
    this.rondaINT = 0;
    this.botones = Array.from(botonsn);
    this.show = {
      iniciarbtn: iniciarbtn,
      ronda: ronda,
      easyMode: easyMode,
      mediumMode: mediumMode,
      hardMode: hardMode
    };
  }

  //HAGO METODO PARA QUE LUEGO DE GUARDAR UN NOMBRE SE HAGA ESE METODO QUE IMPRIMA UNA TABLA
  // Inicia el Simon
  init() {
    var _this = this;

    this.show.easyMode.onclick = function () {
      _this.velocidad = 1000;
      _this.RondasWin = 5;
    };

    this.show.mediumMode.onclick = function () {
      _this.velocidad = 700;
      _this.RondasWin = 10;
    };

    this.show.hardMode.onclick = function () {
      _this.velocidad = 400;
      _this.RondasWin = 50;
    };

    this.show.iniciarbtn.onclick = function () {
      return _this.comenzarJuego();
    };
    //inputOculto.style.opacity = "0";
  }

  // comienza la partida del juego
  comenzarJuego() {
    var _this = this;
    this.show.iniciarbtn.disabled = true;
    this.mostrarRonda(0);
    this.posicionUsuario = 0;
    this.secuencia = this.crearSecuencia();
    this.botones.forEach(function (element, i) {
      element.classList.remove("winner");
      element.onclick = function () {
        return _this.clickBoton(i);
      };
    });
    this.mostrarTabla();
    this.mostrarSecuencia();
  }

  mostrarTabla() {
    document.getElementById("ranking").innerHTML = "";
    console.log("dict original " + dictPrubea);
    for (const i in dictPrubea) {
      document.getElementById("ranking").innerHTML +=
        [i] + " | " + dictPrubea[i] + "<br>";
      //document.getElementById("ranking").remove();
      //console.log(`${i}: ${dictPrubea[i]}`);
    }
  }

  // actualiza la ronda la cual se muestra
  mostrarRonda(value) {
    this.ronda = value;
    this.show.ronda.textContent = "Ronda: ".concat(this.ronda);
    //console.log(this.ronda); //ACA SALE LA RONDA QUE TIENE EL USUARIO
  }

  mostrarRondaPerdida(value) {
    this.ronda = value;
    this.show.ronda.textContent = "".concat(this.ronda);
  }

  // crea la lista aleatorea de botones
  crearSecuencia() {
    var _this = this;
    return Array.from({ length: this.RondasWin }, function () {
      return _this.generarColorRandom();
    });
  }

  // return numero 0 y 3
  generarColorRandom() {
    return Math.floor(Math.random() * 4);
  }

  // Ejecuta una función cuando se hace click en un botón
  clickBoton(value) {
    !this.botonesBloqueados && this.validarValorSecuencia(value);
  }

  // Valida si el boton que toca el usuario corresponde a al valor de la secuencia
  validarValorSecuencia(value) {
    if (this.secuencia[this.posicionUsuario] === value) {
      if (this.ronda === this.posicionUsuario) {
        this.mostrarRonda(this.ronda + 1);
        this.velocidad /= 1.02;
        this.perdioRonda();
      } else {
        this.posicionUsuario++;
        console.log(this.posicionUsuario);
        console.log("Para la perdida: " + this.posicionUsuario);
      }
    } else {
      var nombre = prompt("Perdiste :( | Nombre usuario:");
      this.exportDict(nombre, this.posicionUsuario);
      this.rondaINT = 0;
      this.rondaPerdida();
    }
  }

  // Verifica que no haya acabado el juego
  perdioRonda() {
    this.rondaINT++;
    console.log("Voy en la ronda:" + this.rondaINT);
    if (this.ronda === this.RondasWin) {
      this.ganadorRondaJuego();
    } else {
      this.posicionUsuario = 0;
      this.mostrarSecuencia();
    }
  }

  // Muestra la secuencia de botones que va a tener que tocar el usuario
  mostrarSecuencia() {
    var _this = this;
    this.botonesBloqueados = true; //No pueda hacer click en nada
    var momentoSecuencia = 0; //guardar en qué momento de la secuencia estamos
    var tiempo = setInterval(function () {
      var button = _this.botones[_this.secuencia[momentoSecuencia]];
      _this.activarStiloBoton(button);
      setTimeout(function () {
        return _this.activarStiloBoton(button);
      }, _this.velocidad / 2);
      momentoSecuencia++;
      if (momentoSecuencia > _this.ronda) {
        _this.botonesBloqueados = false;
        clearInterval(tiempo); //metodo para limpiar | cancela tiempo
      }
    }, this.velocidad);
  }

  // Pinta los botones para cuando se está mostrando la secuencia
  activarStiloBoton(button) {
    button.classList.toggle("activar");
  }

  // Actualiza el simon cuando el jugador pierde
  rondaPerdida() {
    this.show.iniciarbtn.disabled = false;
    this.botonesBloqueados = true;
    this.botones.forEach(function (element) {
      element.classList.add("perdedor");
    });
    this.mostrarRondaPerdida("PERDISTE");
  }

  // Muestra la animacón de triunfo y actualiza el simon cuando el jugador gana
  ganadorRondaJuego() {
    this.show.iniciarbtn.disabled = false;
    this.botonesBloqueados = true;
    this.botones.forEach(function (element) {
      element.classList.add("ganador");
    });

    //inputOculto.style.opacity = "1";
    var nombre = prompt("¡Ganaste! Nombre usuario:");
    this.exportDict(nombre, this.rondaINT);
    this.rondaINT = 0;
    this.mostrarRonda("GG");
  }

  exportDict(nombre, rondaINT) {
    var nombre = nombre;
    var rondaINT = rondaINT;
    dictPrubea[nombre] = rondaINT;
    return console.log(JSON.stringify(dictPrubea));
  }
}

var simon = new Simon(
  botonsn,
  iniciarbtn,
  ronda,
  easyMode,
  mediumMode,
  hardMode
);
simon.init();
