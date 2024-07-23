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


export default animarTexto;