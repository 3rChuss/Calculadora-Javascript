/*
Author: Jesús Abril
Version: 1.2
*/
var Calculadora = {
  pantalla : document.getElementById("display"),
  valorPantalla: "0",
  operando: "",
  numero1: 0,
  numero2: 0,
  total: 0,
  contador: 0,
  init: (function(){
    this.iniciarTodo();
  }),
  //Obtenemos la tecla pulsada y comenzamos cojiendo los primeros valores
  obtenerTeclaPulsada: function(tecla){
    var teclado = document.querySelectorAll(".tecla") //capturamos el teclado completo
    for (var i = 0; i < teclado.length; i++) {
      if(teclado[i].id === tecla){ // que tecla hemos pulsado?
        switch (tecla) {
          case "sign":
            this.cambiarSigno();
            break;
          case "on":
            this.limpiarPantalla();
            break;
          case "menos":
            if(this.numero1.value =! this.valorPantalla){
              this.numero1 = this.valorPantalla
            }else if (this.contador=!0){
              this.numero1 = this.valorPantalla
            }else{
              this.numero2 = this.valorPantalla
            }
            this.valorPantalla=""
            this.operando="-"
            break;
          case "igual":
            if(this.valorPantalla!=""){
              this.numero2=this.valorPantalla
              this.operaciones(this.operando) //llamamos la funcion para operar
            }
            break;
          case "mas":
            if(this.numero1.value =! this.valorPantalla){
              this.numero1 = this.valorPantalla
            }else if (this.contador=!0){
              this.numero1 = this.valorPantalla
            }else{
              this.numero2 = this.valorPantalla
            }
            this.valorPantalla=""
            this.operando="+"
            break;
          case "por":
              if(this.numero1.value =! this.valorPantalla){
                this.numero1 = this.valorPantalla
              }else if (this.contador=!0){
                this.numero1 = this.valorPantalla
              }else{
                this.numero2 = this.valorPantalla
              }
              this.valorPantalla=""
              this.operando="x"
              break;
            case "dividido":
              if(this.numero1.value =! this.valorPantalla){
                this.numero1 = this.valorPantalla
              }else if (this.contador=!0){
                this.numero1 = this.valorPantalla
              }else{
                this.numero2 = this.valorPantalla
              }
              this.valorPantalla=""
              this.operando="/"
              break;
            case "raiz":
              if(this.numero1.value =! this.valorPantalla){
                this.numero1 = this.valorPantalla
              }else if (this.contador=!0){
                this.numero1 = this.valorPantalla
              }else{
                this.numero2 = this.valorPantalla
              }
              this.valorPantalla=""
              this.operando="raiz"
              break;
            case "punto":
              if (this.valorPantalla.indexOf(".")== -1) {
                if (this.valorPantalla == ""){
                  this.valorPantalla = this.valorPantalla + "0.";
                }else{
                  this.valorPantalla = this.valorPantalla + ".";
                }
              }
              break;
          default:
          this.obtenerNumero(tecla)
        }
      }
    }
    this.actualizarPantalla();
  },
    efectoBotonPulsadoIn: function(tecla){
        document.getElementById(tecla).style="box-shadow: 1 1px #666;transform: scale(0.900);"
  },
    efectoBotonPulsadoOut: function(tecla){
      document.getElementById(tecla).style ="box-shadow: 0 0px;transform: scale(1);"
  },
    operaciones: function(operador){ //operamos
      switch (operador) {
        case "+":
          this.total = eval(parseFloat(this.numero1)+parseFloat(this.numero2))
          break;
        case "-":
          this.total = eval(this.numero1 - this.numero2)
          break;
        case "x":
          this.total = eval(this.numero1 * this.numero2)
          break;
        case "/":
          this.total = eval(this.numero1 / this.numero2)
          break;
        case "raiz":
          this.total = eval(Math.sqrt(this.numero1,this.numero2))
          var aux = parseFloat(this.total)
          this.total=aux.toFixed(7)
          break;
      }
      var str = this.total.toString();
      //comprobamos si el total a mostrar tiene mas de 7 caracteres
      if (str.length > 7){
          this.valorPantalla = str.slice(0,7) + "e+" //remplazamos el resto de carcateres por el signo e+
      }else{
        this.valorPantalla = str
      }
    this.actualizarPantalla();
  },
    limpiarPantalla: function(){
      this.valorPantalla="0";
      this.operando=""
      this.numero1=0
      this.numero2=0
      this.total=0
      this.contador=0
  },
    cambiarSigno: function(){
      if (this.valorPantalla != "0") {
        if(this.valorPantalla.charAt(0)=="-"){ //si es negativo lo volvemos positivo
          var aux = this.valorPantalla
          aux = aux.substr(1) //eliminamos el simbolo
          this.valorPantalla=aux;
        }else{
          this.valorPantalla= "-" + this.valorPantalla
        }
      }
      this.actualizarPantalla();
  },
    iniciarTodo: function(){ //iniciamos capturando eventos
      document.querySelectorAll(".teclado")[0].addEventListener("click", function(){Calculadora.obtenerTeclaPulsada(event.target.id)})
      document.querySelectorAll(".teclado")[0].addEventListener("mousedown", function(event) {
        Calculadora.efectoBotonPulsadoIn(event.target.id)
        setTimeout(function() {
          Calculadora.efectoBotonPulsadoOut(event.target.id)
        }, 150);
      })
  },
    obtenerNumero: function(numero){
      if (this.valorPantalla.length <= 7) {
        if (this.valorPantalla === "0"){
          this.valorPantalla=""
          this.valorPantalla = this.valorPantalla + numero
        }else{
          this.valorPantalla = this.valorPantalla + numero
        }
      }
      this.actualizarPantalla();
  },
    actualizarPantalla: function(){
      this.pantalla.innerHTML = this.valorPantalla;
    }
}
Calculadora.init();
