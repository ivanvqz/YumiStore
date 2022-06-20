//ecmasctipt
const grid = new Muuri('.grid', {
    layout: {
        rounding: false /**Para trabajas con porcentrajes */
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout(); /*para que se autoajuste la galería*/
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // Agregamos los listener de los enlaces para filtrar por categoria.
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach( (elemento)  => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault(); /*Quita el #*/
            enlaces.forEach((enlace) => enlace.classList.remove('activo')); /*Como sólo es una línea de  código, se omiten las llaves, cierto es un ciclo*/
            evento.target.classList.add('activo'); /*Se encuentra el elemento clickeado y se le añade la clase activo */

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
            /*si la categiría es igual a todos, entonces filtra todo : (de lo contrario) */
        });
    } );

     // Agregamos el listener para la barra de busqueda
    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
        //se muestran los elementos que se cumplan con las caract que están entre los paréntesis
    });


    //listener para las imágenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        elemento.addEventListener('click', () => {
            const ruta = elemento.getAttribute('src'); //se obtienen las rutas de las imágenes
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

            overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
        });
    }); //para que se seleccionen los atributos descritos

    //eventlostner boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    })

    //eventlistener del overlay
    overlay.addEventListener('click', () => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : ''; //si element tecleado tiene el id de overlay,
        //se remueve la clase activo
    });
    
});

