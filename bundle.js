'use strict';

const animarTexto = (elemento) => {
    const numeroLetras = elemento.dataset.texto.length;
    //Activar el cursor cuando comienza la animacion
    const cursor = elemento.querySelector('.hero__cursor');
    cursor.classList.add('hero__cursor--visible');
    //Por cada letra, la agregamos al DOM con 100ms de separacion 
    for (let i = 0; i < numeroLetras; i++) {
        setTimeout(() => {
            const letra = document.createElement('span');
            letra.append(elemento.dataset.texto[i]);
            elemento.append(letra);  
        }, 100 * i); 
    }

    //Cambiamos la clase del cursor cuando termine la animacion de letras
    setTimeout(() => {
        //Obtenemos los cursores
        const cursores = [...elemento.closest('.hero__header').querySelectorAll('.hero__cursor')];

        //Obtenemos el index del cursor actual
        const indexCursorActual = cursores.indexOf(cursor);

        //Comprobamos que el cursor no sea el ultimo.
        if (indexCursorActual < cursores.length -1) {
            cursor.classList.remove('hero__cursor--visible');
        } else {
            cursor.classList.add('.hero__cursor--active');
        }
    }, numeroLetras * 100);

    //Devolvemos una promera para saber cuando la animacion acabo
    return new Promise ((resolve)=>setTimeout(resolve, numeroLetras * 100));

    
    
};

const galeria = document.getElementById('trabajos');

const observer = new IntersectionObserver ((entries)=>{
    if (entries[0].isIntersecting) {
        const trabajos = galeria.querySelectorAll('.trabajos__imagenes a');
        trabajos.forEach((trabajo, index) =>{
            setTimeout(() => {
                trabajo.classList.add('trabajos__trabajo--visible');
            }, 200 * index);
            
        });
    }
}, {
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5,
});

observer.observe(galeria);

const trabajos = document.getElementById('trabajos');
const ventanaTrabajos = document.getElementById('ventana-trabajos');

const datos = [
    {
        id: '1',
        titulo: 'Tienda',
        Text: 'En este proyecto se maqueto el apartado de seleccion de un producto para realizar una compra web, el proyecto fue enteramente realizado con HTML,CSS Y JavaScript.',
        fecha: '20 de Junio del 2024',
    }, 

    {
        id: '2',
        titulo: 'Aplicacion de gastos',
        Text: 'Se queria simular el comportamiento de una app de gastos en la web, una aplicacion que utuliza el localstorage para almacenar los gastos en vez de una base de datos relacional o no relacional.',
        fecha: '8 de Julio del 2024',
    }, 

    {
        id: '3',
        titulo: 'Formulario de transacciones',
        Text: 'En busca de practicar la interactividad de los formularios en los sitios web este formulario emula el como se realizan las transacciones del lado del cliente.',
        fecha: '25 Junio del 2024',
    }, 

    {
        id: '4',
        titulo: 'Galeria de imagenes',
        Text: 'El comportamiento de las ventanas emergentes en los sitios web es importante, en el carrucel de galeria de imagenes se simulo como funcionan estas ventanas emergentes sin afectar la integridad de un sitio estatico.',
        fecha: '13 Junio del 2024',
    }, 

    {
        id: '5',
        titulo: 'Catalogo de peliculas',
        Text: 'El uso de APIS para consultar datos de un servidor en un sitio web permitio que este proyecto se realizara con mas facilidad e interactividad, no solo te muestra una lista de peliculas que se filtra por genero y año sino que es una lista actualizada en tiempo real de las peliculas mas populares.',
        fecha: '4 de Julio del 2024',
    }
];

//Añadir evento para detectar a la imagen que se le hace click
trabajos.addEventListener('click', (e)=> {
    e.preventDefault();
    const clickTrue = e.target.closest('.trabajos__trabajo');

    if (clickTrue) {
        const id = clickTrue.dataset.id;

        const trabajoFiltrado = datos.filter((trabajo)=>{
            if (trabajo.id === id) {
                return trabajo;
            }
        });

        const {titulo, fecha, Text} = trabajoFiltrado[0];

        ventanaTrabajos.querySelector('.ventana__titulo').innerText = titulo;
        ventanaTrabajos.querySelector('.ventana__fecha').innerText = fecha;
        ventanaTrabajos.querySelector('.ventana__parrafo').innerText = Text;
        ventanaTrabajos.querySelector('.ventana__imagen').src = clickTrue.querySelector('img').src;
        ventanaTrabajos.classList.add('ventana--active');
    }
});

//Evento para cerrar el popup
ventanaTrabajos.querySelector('button[data-action="cerrar-ventana"]')
    .addEventListener('click', (e) => {
    e.preventDefault();
    ventanaTrabajos.classList.remove('ventana--active');
});

ventanaTrabajos.querySelector('.ventana__overlay').addEventListener('click', (e)=>{
    e.preventDefault();
    if(e.target.matches('.ventana__overlay'));{
        ventanaTrabajos.classList.remove('ventana--active');
    }

});

const slider = document.getElementById('slider');

// Variable que guarda el estado de si tenemos el click presionado.
let clickPresionado = false;
let coordenadaInicial;
let scrollLeft; // Guardamos la posicion del scroll del slider

const presiona = (e) => {
	// console.log('presiona');
	clickPresionado = true;

	// e.pageX - Coordenada horizontal del evento. En que coordenada dimos click con respecto al documento.
	// slider.offsetLeft - El espacio entre el slider y la parte izquierda del documento.
	coordenadaInicial = e.pageX - slider.offsetLeft;
	scrollLeft = slider.scrollLeft;
};
const mueve = (e) => {
	if (!clickPresionado) {
		return;
	}

	// console.log('mueve');
	// Espaciado entre la coordenada de inicio del slider y donde dimos click.
	const espaciado = e.pageX - slider.offsetLeft;
	const distanciaRecorrida = espaciado - coordenadaInicial;

	// Desplazamos el scroll.
	// A la posicion inicial del scroll cuando dimos click le restamos la distancia.
	slider.scrollLeft = scrollLeft - distanciaRecorrida;
};
const suelta = (e) => {
	// console.log('suelta');
	clickPresionado = false;
};

slider.addEventListener('mousedown', presiona);
slider.addEventListener('mousemove', mueve);
slider.addEventListener('mouseup', suelta);

const botonesEmail = document.querySelectorAll('[data-action="abrir-ventana-correo"]');
const ventanaCorreo = document.getElementById('ventana-correo');
const botonesCerrar = document.querySelectorAll('[data-action="cerrar-ventana"]');

botonesEmail.forEach((boton)=>{
    boton.addEventListener('click', (e)=>{
        e.preventDefault();
        ventanaCorreo.classList.add('ventana--active');
    });
});

botonesCerrar.forEach((boton) =>{
boton.addEventListener('click', (e)=>{
    e.preventDefault();
    ventanaCorreo.classList.remove('ventana--active');
   });
});

document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('a[data-scroll]');

    secciones.forEach(function(seccion) {
        seccion.addEventListener('click', function(e) {
            e.preventDefault();
            const objetivo = this.getAttribute('data-scroll');
            const targetElement = document.getElementById(objetivo);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

window.addEventListener('load', async()=>{
    await animarTexto(document.querySelector('.hero__titulo--uno'));
    await animarTexto(document.querySelector('.hero__titulo--dos'));

    document.querySelectorAll('.hero__burbuja')[0].classList.add('hero__burbuja--active-1');
    document.querySelectorAll('.hero__burbuja')[1].classList.add('hero__burbuja--active-2');
});
//# sourceMappingURL=bundle.js.map
