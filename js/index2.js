let listaEquipos = []

//Rutas del DOM
selectedTeam = document.querySelector('#team');
inputJugador = document.querySelector('#jugador');
inputEquipo = document.querySelector('#input-equipo');
formPobla = document.querySelector('#form-pobla');
formCapitan = document.querySelector('#form-capitan');
formNombre = document.querySelector('#form-nombre');
formRUT = document.querySelector('#form-rut');
formNacimiento = document.querySelector('#form-nacimiento');
contJugadores = document.querySelector('#contenedor-lista-jugadores');



function Equipo(team, pobla, capitan) {
    this.equipo = team;
    this.poblacion = pobla;
    this.capitan = capitan;
    this.jugador = [];
}

function Jugador(nombre, rut, nacimiento) {
    this.nombre = nombre;
    this.rut = rut;
    this.nacimiento = nacimiento;
}


//Esta función espera la carga del documento y posteriormente busca un key en el localStorage y si lo encuentra, lo asigna al arreglo global.
window.addEventListener("load", function (event) {
    if (JSON.parse(localStorage.getItem("equipos")) != null) {
        listaEquipos = JSON.parse(localStorage.getItem("equipos"));
        renderDOM();
    }
});

function respaldoLocal() {
    localStorage.setItem('equipos', JSON.stringify(listaEquipos));

}

function renderDOM() {
    selectedTeam.innerHTML = '';

    listaEquipos.forEach(element => {
        selectedTeam.innerHTML += `<option value="">${element.equipo}</option>`
    })
    renderJugadores();

}

function renderJugadores() {
    contJugadores.innerHTML = '';

    pos = selectedTeam.selectedIndex;


    listaEquipos[pos].jugador.forEach(function (element, index) {
        contJugadores.innerHTML += ` 
             <div class="card-jugador" id="card-jugador-${index}">
                 <img src="img/balon.png" />
                 <div class="card-info">
                     <div id="card-nombre">Nombre: ${element.nombre}</div>
                     <div id="card-rut">RUT: ${element.rut}</div>
                     <div id="card-edad">Fecha de Nacimiento: ${element.nacimiento}</div>
                 </div>

             </div>`;


    })
}


function agregarEquipo() {
    nombreEquipo = document.querySelector('#input-equipo').value;
    validator = true;

    listaEquipos.forEach(element => {
        if (element.Equipo == nombreEquipo) {
            validator = false;
        }
    })

    if (validator) {
        nombreEquipo = new Equipo(nombreEquipo, formPobla.value, formCapitan.value);
        listaEquipos.push(nombreEquipo);
        selectedTeam.selectedIndex = -1;
        renderDOM();
        respaldoLocal();


    } else {
        alert('Este equipo ya existe');
    }
    document.querySelector('#input-equipo').value = '';
}

function agregarJugador() {
    pos = selectedTeam.selectedIndex;
    validator = true;

    listaEquipos[pos].jugador.forEach(element => {
        if (element.rut == formRUT.value) {
            validator = false;
        }
    })

    listaEquipos[pos].jugador.forEach(element => {
        if (parseInt(formNacimiento.value) > 2005) {
            validator = false;
        }
    })

    if (validator) {
        formJugador = new Jugador(formNombre.value, formRUT.value, formNacimiento.value);
        listaEquipos[pos].jugador.push(formJugador);
        respaldoLocal();
        renderJugadores();
    } else {
        alert('Este jugador ya existe o es menor de edad, por lo que no puede ser inscrito');
    }


}


function mostrarForm() {
    if (document.querySelector('.btnForm').innerText == 'Añadir Jugador') {
        document.querySelector('#div-añadir-jugador').style.display = 'flex';
        document.querySelector('.btnForm').innerHTML = 'Ocultar';
    } else {
        document.querySelector('#div-añadir-jugador').style.display = 'none';
        document.querySelector('.btnForm').innerHTML = 'Añadir Jugador';
    }
}

//Esta función muestra/oculta el formulario para añadir diagnósticos a los pacientes
function mostrarFormDiag(index) {
    if (document.querySelector(`#btnModif-${index}`).innerText == 'Modificar') {
        document.querySelector(`#contenedor-modifdiag-${index}`).style.display = 'flex';
        document.querySelector(`#btnModif-${index}`).innerText = 'Ocultar';
    } else {
        document.querySelector(`#contenedor-modifdiag-${index}`).style.display = 'none';
        document.querySelector(`#btnModif-${index}`).innerText = 'Modificar';
    }
}

