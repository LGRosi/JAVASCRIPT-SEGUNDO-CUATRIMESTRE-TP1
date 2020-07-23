'use strict';

//	Rosi, Lucas Gonzalo




// Todos los discos:
let aDiscos = [], aNumerosDeDiscos = [];

// Creo la función constructora Disco:
function Disco () {
	// Propiedades privadas:
	let nombre = 'Nombre del disco';
	let autor;
	let pistas = [];
	let duraciones = [];
	let numeroDeDisco = 0;



	// Métodos públicos:
	this.PedirNombre = function () {
		let banderita = false;
		do {
			if (banderita) {
				alert('Eu no ingresaste ningún disco!!!');
			}
			nombre = prompt('Ingresá el nombre de tu disco favorito.');
			autor = prompt('Ingresá el nombre del autor.');
			banderita = true;
		} while (!isNaN(nombre));
	}

	this.PedirNumeroDeDisco = function () {
		do {
			numeroDeDisco = parseInt(prompt('Ingresá el número de tu disco'));
		} while (!EsNumeroDeDiscoValido(numeroDeDisco))
		aNumerosDeDiscos.push(numeroDeDisco);
	}
	this.EsNumeroDeDiscoValido = function (numDis) {
		let verificacion = true;
		if (isNaN(numDis)) {
			verificacion = false;
		} else if (!(numDis >= 1 && numDis <= 999)) {
			alert('El número de disco que pusiste está fuera del rango');
			verificacion = false;
		} else if (aNumerosDeDiscos.indexOf(numDis) != -1) {
			alert('El número del disco ya existe');
			verificacion = false;
		}
		return verificacion;
	}

	this.GuardarPista = function (pista) {
		pistas.push(pista);
		duraciones.push(pista.DarDuracion());
	}

	this.CalcularElTotalDeLasDuraciones = function () {
		let acum = 0;
		for (let pista of pistas) {
			acum += pista.DarDuracion();
		}
		return acum;
	}
	this.CantidadDePistas = function () {
		return pistas.length;
	}

	this.Armar = function () {
		// Armo la info de cada disco:
		let m = `
			<p><strong>Tu disco favorito:</strong> ${nombre}</p>
			<p><strong>N° de pistas:</strong> ${this.CantidadDePistas()}</p>
			<p><strong>Autor/Banda:</strong> ${autor}</p>
			<ul>
		`;
		// Recorro cada una de las pistas:
		for (let pista of pistas) {
			// Debo acceder al método Armar de cada pista:
			m += pista.Armar();
		}
		m += 
		`</ul>
			<p><strong>Duración total del disco:</strong> ${this.CalcularElTotalDeLasDuraciones()} segundos</p>

			<p><strong>Promedio de duración del disco:</strong> ${this.CalcularElTotalDeLasDuraciones() / pistas.length} segundos</p>`;
			
			return m;
		}
}

// Creo la función constructora Pista:
function Pista () {
	// Propiedades privadas:
	let nombre = 'Nombre de la pista';
	let duracion = 0;

	// Métodos públicos:
	this.PedirNombre = function () {
		let banderita = false;
		do {
			if (banderita) {
				alert('Eu no ingresaste ninguna pista!!!');
			}
			nombre = prompt('Ingresá el nombre de la pista');
			banderita = true;
		} while (!isNaN(nombre));
	}
	this.PedirDuracion = function () {
		let banderita = false;
		do {
			if (banderita) {
				alert('¡¡¡No ingresaste una duración entre 0 y 7200!!!');
			}
			duracion = parseInt(prompt('Ingresá la duración de la pista.'));
			banderita = true;
		} while (!(duracion >= 0 && duracion <= 7200));
	}
	this.DarDuracion = function () {
		return duracion;
	}
	this.Armar = function () {
		// Armo el li con los datos de la pista:
		let m = `<li><strong>Nombre de la pista:</strong> ${nombre} (Duración:<span${duracion > 180 ? ' style="color:red"':''}>  ${duracion}</span>)</li>`;
		return m;
	}
}

// Funciones:
function Cargar() {
	// Variables:
	let disco, pista;
	
	// Creo el disco:
	disco = new Disco ();
	
	// Pido su nombre:
	disco.PedirNombre();

	// Pido su número de disco:
	disco.EsNumeroDeDiscoValido();
	
	// Pistas:
	do {
		// Creo la pista:
		pista = new Pista ();
		// Pido nombre y duración:
		pista.PedirNombre();
		pista.PedirDuracion();
		// La guardo en el disco:
		disco.GuardarPista(pista);
	} while (confirm('¡Hey hola fanático de la música. Queres agregar alguna pista adicional? Es el momento de hacerlo!'))
	
	// Guardo al disco en el array:
	aDiscos.push(disco);
}

function Mostrar() {
	// Variable que guarda el html generado:
	let mensajitoHtml = '';
	
	if (!aDiscos.length) {
		mensajitoHtml += '<p>Esperá! No te emociones, todavía no cargaste ningún disco.</p>';
	} else {
		// Recorro a los discos:
		for (let disco of aDiscos) {
			// Muestro cada disco:
			mensajitoHtml += disco.Armar();
			mensajitoHtml += '<hr />'
		}
	}

	// Si modificaste el nombre de la variable para ir armando la cadena, también hacelo acá:
	document.getElementById('info').innerHTML = mensajitoHtml; // <--- ahí es acá
}








