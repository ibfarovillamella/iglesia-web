// =========================================
// Ajustes de la animación del versículo
// =========================================
const VELOCIDAD_ESCRITURA = 80;   // milisegundos por letra (más alto = más lento)
const TIEMPO_LECTURA = 8000;      // milisegundos que se queda el versículo completo
const TIEMPO_DESVANECER = 900;    // milisegundos que tarda en desaparecer

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

function formatearFecha(fecha) {
  if (!fecha) return '';
  const f = new Date(String(fecha).slice(0, 10) + 'T00:00:00');
  if (isNaN(f)) return '';
  return f.toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' });
}

function esperar(ms) {
  return new Promise(resolver => setTimeout(resolver, ms));
}

function ponerFondo(elemento, ruta) {
  if (!elemento || !ruta) return;
  try {
    const url = new URL(ruta, window.location.href).href.replace(/"/g, '%22');
    elemento.style.setProperty('--portada-img', 'url("' + url + '")');
  } catch (error) {
    // Si la ruta no es válida, se queda el fondo de degradado
  }
}

// ---------- Fondo del encabezado de Actividades y Videos ----------
async function cargarFondoEncabezado() {
  const encabezado = document.querySelector('.page-hero[data-fondo]');
  if (!encabezado) return;
  try {
    const respuesta = await fetch('data/encabezados.json');
    const datos = await respuesta.json();
    ponerFondo(encabezado, datos[encabezado.dataset.fondo]);
  } catch (error) {
    // Si no se puede leer, se queda el fondo de degradado
  }
}

// ---------- Portada: imagen de fondo y versículos ----------
async function iniciarPortada() {
  const hero = document.getElementById('inicio');
  const caja = document.getElementById('versiculo');
  const textoEl = document.getElementById('versiculoTexto');
  const citaEl = document.getElementById('versiculoCita');
  if (!hero || !caja || !textoEl || !citaEl) return;

  let datos = {};
  try {
    const respuesta = await fetch('data/portada.json');
    datos = await respuesta.json();
  } catch (error) {
    caja.style.display = 'none';
    return;
  }

  // Imagen de fondo (opcional)
  ponerFondo(hero, datos.imagen);

  // Versículos
  const versiculos = (datos.versiculos || []).filter(v => v && v.texto);
  if (versiculos.length === 0) {
    caja.style.display = 'none';
    return;
  }

  const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let indice = 0;

  while (true) {
    const v = versiculos[indice % versiculos.length];
    caja.setAttribute('aria-label', v.texto + (v.cita ? ' — ' + v.cita : ''));

    // Preparar
    textoEl.textContent = '';
    citaEl.textContent = '';
    citaEl.classList.remove('visible');
    caja.classList.remove('oculto');

    // Escribir letra por letra
    if (reducirMovimiento) {
      textoEl.textContent = v.texto;
    } else {
      textoEl.classList.add('escribiendo');
      for (const letra of Array.from(v.texto)) {
        textoEl.textContent += letra;
        await esperar(VELOCIDAD_ESCRITURA);
      }
      textoEl.classList.remove('escribiendo');
    }

    // Mostrar la cita
    citaEl.textContent = v.cita ? '— ' + v.cita : '';
    citaEl.classList.add('visible');

    // Si solo hay un versículo, se queda fijo
    if (versiculos.length === 1) return;

    // Esperar, desvanecer y pasar al siguiente
    await esperar(TIEMPO_LECTURA);
    caja.classList.add('oculto');
    await esperar(TIEMPO_DESVANECER);
    indice++;
  }
}

// ---------- Actividades ----------
async function cargarActividades() {
  const contenedor = document.getElementById('listaActividades');
  if (!contenedor) return;
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

// ---------- Noticias ----------
async function cargarNoticias() {
  const contenedor = document.getElementById('listaNoticias');
  if (!contenedor) return;
  try {
    const respuesta = await fetch('data/noticias.json');
    const datos = await respuesta.json();
    const noticias = (datos.items || []).slice().sort((a, b) =>
      String(b.fecha || '').localeCompare(String(a.fecha || ''))
    );

    if (noticias.length === 0) {
      contenedor.innerHTML = '<p class="vacio">Pronto publicaremos nuevas noticias.</p>';
      return;
    }

    contenedor.innerHTML = noticias.map(n => {
      const imagen = n.imagen
        ? `<img src="${escapar(n.imagen)}" alt="${escapar(n.titulo)}" loading="lazy">`
        : '';
      const fecha = formatearFecha(n.fecha);
      const texto = escapar(n.texto).replace(/\n/g, '<br>');
      return `
        <article class="card noticia">
          ${imagen}
          <div class="noticia-cuerpo">
            ${fecha ? `<p class="noticia-fecha">${fecha}</p>` : ''}
            <h3>${escapar(n.titulo)}</h3>
            <p>${texto}</p>
          </div>
        </article>
      `;
    }).join('');
  } catch (error) {
    contenedor.innerHTML = '<p class="vacio">No se pudieron cargar las noticias.</p>';
  }
}

// ---------- Videos ----------
async function cargarVideos() {
  const contenedor = document.getElementById('listaVideos');
  if (!contenedor) return;
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

// ---------- Iniciar todo ----------
cargarFondoEncabezado();
iniciarPortada();
cargarActividades();
cargarNoticias();
cargarVideos();
