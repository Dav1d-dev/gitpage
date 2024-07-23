const trabajos = document.getElementById('trabajos')
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
        ventanaTrabajos.querySelector('.ventana__imagen').src = clickTrue.querySelector('img').src
        ventanaTrabajos.classList.add('ventana--active');
    }
})

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

})