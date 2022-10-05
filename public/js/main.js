var ronda = document.getElementById("ronda");
var inputOculto = document.getElementById("inputOculto");
var botonsn = document.getElementsByClassName("sbtn");
var iniciarbtn = document.getElementById("iniciarbtn");
/*
Añadir un perdiste mejor
SCORE en local
Poner niveles de dificultad
*/

var Simon = /** @class */ (function () {
  function Simon(botonsn, iniciarbtn, ronda, inputOculto) {
    //var resp = window.prompt("Your question");
    this.resp = window.prompt("Nombre de usuario:");
    this.secuencia = [];
    this.botonesBloqueados = true;
    this.velocidad = 800;
    this.posicionUsuario = 0;
    this.ronda = 0;
    this.RondasWin = 3;
    this.botones = Array.from(botonsn);
    this.show = {
      iniciarbtn: iniciarbtn,
      ronda: ronda,
      inputOculto: inputOculto
    };
  }

  // Inicia el Simon
  Simon.prototype.init = function () {
    var _this = this;
    this.show.iniciarbtn.onclick = function () {
      return _this.comenzarJuego();
    };
    //inputOculto.style.opacity = "0";
  };

  // comienza la partida del juego
  Simon.prototype.comenzarJuego = function () {
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
    this.mostrarSecuencia();
  };

  // actualiza la ronda la cual se muestra
  Simon.prototype.mostrarRonda = function (value) {
    this.ronda = value;
    this.show.ronda.textContent = "".concat(this.ronda);
    //console.log(this.ronda); //ACA SALE LA RONDA QUE TIENE EL USUARIO
  };

  Simon.prototype.mostrarRondaPerdida = function (value) {
    this.ronda = value;
    this.show.ronda.textContent = "".concat(this.ronda);
  };

  // crea la lista aleatorea de botones
  Simon.prototype.crearSecuencia = function () {
    var _this = this;
    return Array.from({ length: this.RondasWin }, function () {
      return _this.generarColorRandom();
    });
  };

  // return numero 0 y 3
  Simon.prototype.generarColorRandom = function () {
    return Math.floor(Math.random() * 4);
  };

  // Ejecuta una función cuando se hace click en un botón
  Simon.prototype.clickBoton = function (value) {
    !this.botonesBloqueados && this.validarValorSecuencia(value);
  };

  // Valida si el boton que toca el usuario corresponde a al valor de la secuencia
  Simon.prototype.validarValorSecuencia = function (value) {
    if (this.secuencia[this.posicionUsuario] === value) {
      if (this.ronda === this.posicionUsuario) {
        this.mostrarRonda(this.ronda + 1);
        this.velocidad /= 1.02;
        this.perdioRonda();
      } else {
        this.posicionUsuario++;
      }
    } else {
      this.rondaPerdida();
    }
  };

  // Verifica que no haya acabado el juego
  Simon.prototype.perdioRonda = function () {
    if (this.ronda === this.RondasWin) {
      this.ganadorRondaJuego();
    } else {
      this.posicionUsuario = 0;
      this.mostrarSecuencia();
    }
  };

  // Muestra la secuencia de botones que va a tener que tocar el usuario
  Simon.prototype.mostrarSecuencia = function () {
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
  };

  // Pinta los botones para cuando se está mostrando la secuencia
  Simon.prototype.activarStiloBoton = function (button) {
    button.classList.toggle("activar");
  };

  // Actualiza el simon cuando el jugador pierde
  Simon.prototype.rondaPerdida = function () {
    this.show.iniciarbtn.disabled = false;
    this.botonesBloqueados = true;
    this.botones.forEach(function (element) {
      element.classList.add("perdedor");
    });

    this.mostrarRondaPerdida("PERDISTE");
    setTimeout(function () {
      window.location.href = window.location;
    }, 1500);
  };

  // Muestra la animacón de triunfo y actualiza el simon cuando el jugador gana
  Simon.prototype.ganadorRondaJuego = function () {
    this.show.iniciarbtn.disabled = false;
    this.botonesBloqueados = true;
    this.botones.forEach(function (element) {
      element.classList.add("ganador");
    });

    //inputOculto.style.opacity = "1";
    console.log("Paso a ganar");
    this.mostrarRonda("GG");
  };

  return Simon;
})();

var simon = new Simon(botonsn, iniciarbtn, ronda, inputOculto);
simon.init();
