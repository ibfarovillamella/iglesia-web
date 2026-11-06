// ---------- Menú móvil ----------
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('abierto'));
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('abierto'))
);

// ---------- Utilidades ----------
function escapar(texto) {
  const div = document.createElement('div');
  div.textContent = texto || '';
  return div.innerHTML;
}

function obtenerIdYoutube(url) {
  const patron = /(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/;
  const coincidencia = (url || '').match(patron);
  return coincidencia ? coincidencia[1] : null;
}

// ---------- Actividades ----------
async function cargarActividades() {
  const contenedor = document.getElementById('listaActividades');
  try {
    const respuesta = await fetch('data/actividades.json');
    const datos = await respuesta.json();
    const actividades = datos.items || [];

    if (actividades.length === 0) {
      contenedor.innerHTML = '<p class="vacio">Pronto publicaremos nuevas actividades.</p>';
      return;
    }

    contenedor.innerHTML = actividades.map(a => `
      <article class="card">
        <h3>${escapar(a.titulo)}</h3>
        <p><strong>Día:</strong> ${escapar(a.dia)}</p>
        <p><strong>Hora:</strong> ${escapar(a.hora)}</p>
        <p><strong>Lugar:</strong> ${escapar(a.lugar)}</p>
      </article>
    `).join('');
  } catch (error) {
    contenedor.innerHTML = '<p class="vacio">No se pudieron cargar las actividades.</p>';
  }
}

// ---------- Videos ----------
async function cargarVideos() {
  const contenedor = document.getElementById('listaVideos');
  try {
    const respuesta = await fetch('data/videos.json');
    const datos = await respuesta.json();
    const videos = datos.items || [];

    const tarjetas = videos.map(v => {
      const id = obtenerIdYoutube(v.enlace);
      if (!id) return '';
      return `
        <a class="video-card" href="${escapar(v.enlace)}" target="_blank" rel="noopener">
          <div class="video-thumb">
            <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg" alt="${escapar(v.titulo)}" loading="lazy">
            <span class="play">▶</span>
          </div>
          <h3>${escapar(v.titulo)}</h3>
        </a>
      `;
    }).join('');

    contenedor.innerHTML = tarjetas || '<p class="vacio">Pronto publicaremos nuevos videos.</p>';
  } catch (error) {
    contenedor.innerHTML = '<p class="vacio">No se pudieron cargar los videos.</p>';
  }
}

cargarActividades();
cargarVideos();
