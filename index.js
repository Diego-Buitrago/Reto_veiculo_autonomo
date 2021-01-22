'use strict';
// selecionar botones
const buttonOn = document.querySelector('.on');
const buttonP = document.querySelector('.P');
const buttonN = document.querySelector('.N');
const buttonD = document.querySelector('.D');
const buttonR = document.querySelector('.R');
const buttonDestination = document.querySelector('.destination');
const buttonStarts = document.querySelector('.starts');
const buttonStationary = document.querySelector('.stationary');
const buttonIz = document.querySelector('.iz');
const buttonDr = document.querySelector('.dr');
// seleccionar elementos HTML
const h2El = document.querySelector('h2');
const h3Uno = document.querySelector('.h3Uno');
const h3Dos = document.querySelector('.h3Dos');
const h3Tres = document.querySelector('.h3Tres');
const divEl = document.querySelector('.output');
const h1Time = document.querySelector('.time');
const h1Klm = document.querySelector('.klm');
const h1Stop = document.querySelector('.stop');
const imgIz = document.querySelector('.izquierda');
const imgDr = document.querySelector('.derecha');
const imgStop = document.querySelector('.imgStop');

// clase auto autonomo
class AutoAutonomo {
    constructor() {
        this.encendido = false;
        this.destinoElegido = false;
        this.estacionarias = false;
        this.iniciarTiempo = false;
        this.pararTiempo = false;
        this.dirIz = false;
        this.dirDr = false;
        this.cajaCambios = 0;
        this.numeroParadas = 0;
        this.acomuladorParadas = 0;
        this.paradas = [];
    }

    parqueo() {
        this.cajaCambios = 0;
        h3Uno.classList.remove('alert');
        h3Uno.innerHTML = "Veiculo en parqueo";
    }

    neutra() {
        this.cajaCambios = 1;
        h3Uno.classList.remove('alert');
        h3Uno.innerHTML = "Veiculo en neutra";
    }

    conducir() {
        this.cajaCambios = 3;
        h3Uno.classList.remove('alert');
        h3Uno.innerHTML = "Veiculo en modo conducir";
    }

    reversa() {
        this.cajaCambios = 4;
        h3Uno.classList.remove('alert');
        h3Uno.innerHTML = "Veiculo en reversa";
    }

    // prender y apagar motor
    botonOn() {
        if (this.encendido === false) {
            // comprbar si la caja de cambios esta en neutro o parqueo para poder encender 
            if (this.cajaCambios === 0 || this.cajaCambios === 1) {
                this.encendido = true;
                h2El.innerHTML = "Motor encendido";
                h3Uno.innerHTML = "";
            } else {
                h3Uno.classList.add('alert');
                h3Uno.innerHTML = "Porfavor coloque la caja de cambios en parqueo o neutro";
            }
        } else {
            // comprobar si la caja de cambios se encuentra en neutra o parqueo para apagar 
            if (this.cajaCambios === 0 || this.cajaCambios === 1) {
                this.encendido = false;
                h2El.innerHTML = "Motor apagado";
                h3Uno.innerHTML = "";
                h1Uno.innerHTML = "";
                h1Dos.innerHTML = "";
            } else if (this.cajaCambios !== 0 || this.cajaCambios !== 1 && this.encendido !== false ) {
                h3UnoclassList.add('alert');
                h3Uno.innerHTML = "Porfavor coloque la caja de cambios en parqueo o neutro";
            }
        } 
    }

    // prender y apagar estacionarias
    botonStacionarias() {
        if (this.estacionarias === false){
            imgIz.setAttribute('src', 'imagenes/flecha-iz.jpg');
            imgDr.setAttribute('src', 'imagenes/flecha-dr.jpg');
            this.estacionarias = true;
        } else {
            imgIz.setAttribute('src', '');
            imgDr.setAttribute('src', '');
            this.estacionarias = false;
        }
    }

    // Direccional izquierda
    botonDirIz() {
        if (this.dirIz === false) {
            imgIz.setAttribute('src', 'imagenes/flecha-iz.jpg');
            this.dirIz = true;
            newAuto.eventosTeclado();
        } else {
            imgIz.setAttribute('src', '');
            this.dirIz = false;
            newAuto.eventosTeclado();
        }
    }

    // Direccional derecha
    botonDirDr() {
        if (this.dirDr === false) {
            imgDr.setAttribute('src', 'imagenes/flecha-dr.jpg');
            this.dirDr = true;
            newAuto.eventosTeclado();
        } else {
            imgDr.setAttribute('src', '');
            this.dirDr = false;
            newAuto.eventosTeclado();
        }
    }

    eventosTeclado() {
        let dr = this.dirDr;
        let iz = this.dirIz;

        function tecladoAlert(event) {
            
            if (event.key == "r" && dr === true) {
                h3Tres.classList.remove('alert');
                h3Tres.innerHTML = "Girando a la derecha";
                newAuto.tiempoCurva();
                window.removeEventListener("keydown", tecladoAlert);
            } else if (event.key === "l" && iz === true) {
                h3Tres.classList.remove('alert');
                h3Tres.innerHTML = "Girando a la izquierda";
                newAuto.tiempoCurva();
                window.removeEventListener("keydown", tecladoAlert);
            } else if (event.key == "r" || event.key == "l") {
                h3Tres.classList.add('alert');
                h3Tres.innerHTML = "Activa la direcional para poder girar";
            }
        }
        window.addEventListener("keydown", tecladoAlert);
    }

    destino() {
        this.destinoElegido = true;

        // calcular numero de paradas
        this.numeroParadas = Math.floor(Math.random() * (4 - 1)) + 1;

        // calcular en que kilometros se hacen las paradas
        for (let i = 0; i < this.numeroParadas; i++) {
            this.paradas.push(Math.floor(Math.random() * (13 - 2)) + 2);
        }
        console.log(this.paradas);

        h3Dos.innerHTML = "DESTINO:<br> Aeropuerto internacional Jose Maria Cordoba de rionegro 15 klm";
        h1Time.innerHTML = `<span id="time">0</span> segundos`;
        h1Klm.innerHTML = `<span id="klm">0</span> klm`;
    }

    arrancar() {
        // comprobar si el auto esta encendito el destino escogido la caja de cambios en modo avanzar
        if (this.encendido === true && this.destinoElegido === true && this.cajaCambios === 3) {
            newAuto.eventosTeclado();
            
            // iniciar tiempo
            if (this.iniciarTiempo === false) {
                newAuto.tiempo();
                this.iniciarTiempo = true;
            }
            // iniciar conteo de kilometros
            newAuto.kilometros();

            imgStop.setAttribute('src', '');
            imgIz.setAttribute('src', '');
            imgDr.setAttribute('src', '');
            this.estacionarias = false;
        
        } else if (this.encendido === true && this.cajaCambios === 4) {
            newAuto.reversar();
        } else {
            h3Uno.classList.add('alert');
            h3Uno.innerHTML = "Verifique que el auto este encendido que el destino ha sido escogido y que se encuentre en modo conducir para poder arrancar"
        }
    }

    reversar() {
        let counter = Math.floor(Math.random() * (9 - 2)) + 2;
            
        const reversar = function() {
            if (counter > 0) {
                h1Stop.innerHTML = "Reversando";
                imgStop.setAttribute('src', '');
                counter--;
            } else {
                h1Stop.innerHTML = "";
                clearInterval(timer);
                const tiempo = parseInt(time.textContent) / 60;
                h1Time.innerHTML = `Tiempo: ${parseInt(tiempo)} minutos`;
                this.pararTiempo = true;
            }
        }
        let timer = setInterval(reversar, 1000)
    }

    tiempo() {
        // funcion para medir el tiempo hasta el destino
        const tiempo = function() {
            time.textContent = parseFloat(time.textContent) + 1;
            if (this.pararTiempo === true) {
                clearInterval(timeAccumulator);
            }
        }
        let timeAccumulator = setInterval(tiempo, 90);

    }

    kilometros() {
         // funcion para contar los klm hasta el destino
         const kilometros = function(paradas) {
            this.paradas = paradas;
            let klmCurrent = parseFloat(klm.textContent);
            
            // simular parada
            for (let i = 0; i < this.paradas.length; i++) {
                if (klmCurrent == this.paradas[i] - 1) {
                    clearInterval(klms);
                    newAuto.parada();
                }
            }
            // simular llegada
            if (klmCurrent == 15 - 1) {
                clearInterval(klms);
                newAuto.llegada();
            } else {
                klm.textContent = klmCurrent + 1;
            }    
        }
        let klms = setInterval(kilometros, 7000, this.paradas);
    }

    tiempoCurva() {
        let counter = Math.floor(Math.random() * (9 - 3)) + 2;
            this.dirDr = false;
            this.dirIz = false;
        const curva = function() {
            if (counter > 0) {
                counter--;  
            } else {
                h3Tres.innerHTML = "";
                imgIz.setAttribute('src', '');
                imgDr.setAttribute('src', '');
                clearInterval(timer);
            }
        }
        let timer = setInterval(curva, 1000)
    }

    parada() {
        const time = Math.floor(Math.random() * (6 - 1)) + 1;
        this.acomuladorParadas += time;

        imgIz.setAttribute('src', 'imagenes/flecha-iz.jpg');
        imgDr.setAttribute('src', 'imagenes/flecha-dr.jpg');
        h1Stop.innerHTML = `<span id="stop-seconds">${time}</span> segundos`;
        imgStop.setAttribute('src', 'imagenes/stop.jpg');
        this.estacionarias = true;

        const stop = document.getElementById('stop-seconds');

        const contador_parada = function() {
            let stopCurrent = parseFloat(stop.textContent);

            if (stopCurrent > 0) {
                stop.textContent = stopCurrent - 1;
            } else {
                clearInterval(stopSeconds);
                h1Stop.innerHTML = "";
                newAuto.arrancar();
            }   
        }
        let stopSeconds = setInterval(contador_parada, 1000);
    }

    llegada() {
        const tiempoSegundos = parseInt(time.textContent) - this.acomuladorParadas;
        const tiempoHoras = (tiempoSegundos / 60) / 60;
        const klm = 5 / tiempoHoras;
        h1Klm.innerHTML = `velocidad: ${parseInt(klm)} klm/h`;
        imgStop.setAttribute('src', 'imagenes/stop.jpg');
        imgIz.setAttribute('src', 'imagenes/flecha-iz.jpg');
        imgDr.setAttribute('src', 'imagenes/flecha-dr.jpg');
        h1Stop.innerHTML = "Has llegado a tu destino";
        this.estacionarias = true;
    }
}
 
// instancia de auto autonomo
const newAuto = new AutoAutonomo();

// funciones eventos de botones
const onAlert = () => newAuto.botonOn();
const PAlert = () => newAuto.parqueo();
const NAlert = () => newAuto.neutra();
const DAlert = () => newAuto.conducir();
const RAlert = () => newAuto.reversa();
const destinoAlert = () => newAuto.destino();
const startsAlert = () => newAuto.arrancar();
const stationaryAlert = () => newAuto.botonStacionarias();
const dirIzAlert = () => newAuto.botonDirIz();
const dirDrAlert = () => newAuto.botonDirDr();

// eventos de botones
buttonOn.addEventListener('click', onAlert);
buttonP.addEventListener('click', PAlert);
buttonN.addEventListener('click', NAlert);
buttonD.addEventListener('click', DAlert);
buttonR.addEventListener('click', RAlert);
buttonDestination.addEventListener('click', destinoAlert);
buttonStarts.addEventListener('click', startsAlert);
buttonStationary.addEventListener('click', stationaryAlert);
buttonIz.addEventListener('click', dirIzAlert);
buttonDr.addEventListener('click', dirDrAlert);