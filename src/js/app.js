document.addEventListener('DOMContentLoaded', () => {
    const albumesContainer = document.getElementById('albumes-container');
    const modal = document.getElementById('modal-album');
    const cerrarModal = document.getElementById('cerrar-modal');
    const modalImagen = document.getElementById('modal-imagen');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalAnio = document.getElementById('modal-anio');
    const modalCanciones = document.getElementById('modal-canciones');
    const modalLink = document.getElementById('modal-link');

        // Cargar JSON y renderizar álbumes
    fetch('/build/data/albumes.json')
            .then(res => {
            if (!res.ok) throw new Error(`Error al cargar JSON: ${res.status}`);
            return res.json();
        })
            .then(albumes => renderizarAlbumes(albumes))
        .catch(err => console.error("Error al obtener datos:", err));

    // Función para abrir el modal con la info del álbum
    function abrirModal(album) {
        modalImagen.src = album.imagen;
        modalTitulo.textContent = album.nombre;
        modalAnio.textContent = `Año: ${album.anio}`;
        modalCanciones.innerHTML = '';
        
        album.canciones.forEach(cancion => {
            const li = document.createElement('li');
            li.textContent = cancion;
            modalCanciones.appendChild(li);
        });

        modalLink.href = album.spotify;
        modal.classList.add('visible');
    }

    // Función para renderizar las tarjetas de álbumes
    function renderizarAlbumes(albumes) {
        albumesContainer.innerHTML = '';
        albumes.forEach(album => {
            const card = document.createElement('div');
            card.classList.add('album-card');
            card.innerHTML = `
                <img src="${album.imagen}" alt="${album.nombre}">
                <h3>${album.nombre}</h3>
                <p>${album.anio}</p>
            `;
            card.addEventListener('click', () => abrirModal(album));
            albumesContainer.appendChild(card);
        });
    }

    // Cerrar modal
    cerrarModal.addEventListener('click', () => modal.classList.remove('visible'));

    modal.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('visible');
    });
});


