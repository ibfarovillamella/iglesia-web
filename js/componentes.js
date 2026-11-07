// =========================================
// Menú, íconos y pie de página compartidos
// (se editan aquí una sola vez para todas las páginas)
// =========================================
(function () {
  // Datos de contacto y redes (cambia aquí cuando tengas los enlaces reales)
  const PASTOR = 'Benjamín Jordan Estévez';
  const TELEFONO_MOSTRAR = '+1 809-946-7461';
  const TELEFONO_WHATSAPP = '18099467461';
  const DIRECCION = 'Calle Calixto García 17, Urb. Máximo Gómez, Santo Domingo Norte, R.D.';
  const MAPA_ENLACE = 'https://www.google.com/maps/search/?api=1&query=Calle+Calixto+Garcia+17+Urbanizacion+Maximo+Gomez+Santo+Domingo+Norte';
  const INSTAGRAM = 'https://www.instagram.com';
  const FACEBOOK = 'https://www.facebook.com';
  const YOUTUBE = 'https://www.youtube.com';

  // Compartir los datos con otras páginas (por ejemplo, Contacto)
  window.IGLESIA = {
    pastor: PASTOR,
    telefonoMostrar: TELEFONO_MOSTRAR,
    telefonoWhatsapp: TELEFONO_WHATSAPP,
    direccion: DIRECCION,
    mapaEnlace: MAPA_ENLACE
  };

  // Detectar en qué página estamos
  let pagina = (window.location.pathname.split('/').pop() || 'index').toLowerCase();
  pagina = pagina.replace('.html', '') || 'index';
  const esInicio = pagina === 'index';

  function claseActiva(nombre) {
    return pagina === nombre ? ' class="activo" aria-current="page"' : '';
  }

  // Enlaces a secciones del inicio (funcionan desde cualquier página)
  function enlaceInicio(hash) {
    return esInicio ? hash : 'index.html' + hash;
  }

  // ---------- Íconos reutilizables ----------
  const iconos = `
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs>
      <clipPath id="marco-faro">
        <rect width="64" height="64" rx="12"/>
      </clipPath>
    </defs>

    <symbol id="faro" viewBox="0 0 64 64">
      <g clip-path="url(#marco-faro)">
        <rect width="64" height="64" fill="#0a2a6b"/>
        <g stroke="#9db4e8" stroke-width="3" stroke-linecap="round">
          <line x1="25" y1="12" x2="10" y2="6"/>
          <line x1="24" y1="15" x2="6" y2="15"/>
          <line x1="25" y1="18" x2="10" y2="24"/>
          <line x1="39" y1="12" x2="54" y2="6"/>
          <line x1="40" y1="15" x2="58" y2="15"/>
          <line x1="39" y1="18" x2="54" y2="24"/>
        </g>
        <polygon points="26,11 32,5 38,11" fill="#ffffff"/>
        <rect x="28" y="11" width="8" height="7" fill="#ffffff"/>
        <polygon points="27,18 37,18 40,54 24,54" fill="#ffffff"/>
        <rect x="30.5" y="26" width="3" height="5" fill="#0a2a6b"/>
        <rect x="30.5" y="37" width="3" height="5" fill="#0a2a6b"/>
        <path d="M0 52 C12 44 22 58 32 52 S52 44 64 52 L64 64 L0 64 Z" fill="#1e4fb8"/>
      </g>
    </symbol>

    <symbol id="i-calendario" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
    </symbol>

    <symbol id="i-campana" viewBox="0 0 24 24">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </symbol>

    <symbol id="i-video" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="3"/>
      <path d="M10 9l5 3-5 3z"/>
    </symbol>

    <symbol id="i-ubicacion" viewBox="0 0 24 24">
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </symbol>

    <symbol id="i-telefono" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </symbol>

    <symbol id="i-usuario" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 21a8 8 0 0 1 16 0"/>
    </symbol>

    <symbol id="i-mensaje" viewBox="0 0 24 24">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </symbol>
  </svg>`;

  // ---------- Encabezado y menú ----------
  const encabezado = `
  ${iconos}
  <header class="header">
    <a href="${esInicio ? '#inicio' : 'index.html'}" class="logo">
      <svg class="logo-icono" aria-hidden="true"><use href="#faro"/></svg>
      <span>Iglesia Bautista El Faro</span>
    </a>
    <button class="menu-btn" id="menuBtn" aria-label="Abrir menú">☰</button>
    <nav class="nav" id="nav">
      <a href="${esInicio ? '#inicio' : 'index.html'}"${claseActiva('index')}>Inicio</a>
      <a href="actividades.html"${claseActiva('actividades')}>Actividades</a>
      <a href="${enlaceInicio('#noticias')}">Noticias</a>
      <a href="videos.html"${claseActiva('videos')}>Videos</a>
      <a href="${enlaceInicio('#ubicacion')}">Ubicación</a>
      <a href="contacto.html"${claseActiva('contacto')}>Contacto</a>
    </nav>
  </header>`;

  // ---------- Pie de página ----------
  const pie = `
  <footer id="pie-pagina" class="footer">
    <div class="footer-info">
      <h3>Pastor: ${PASTOR}</h3>
      <p>Teléfono / WhatsApp: <a href="https://wa.me/${TELEFONO_WHATSAPP}" target="_blank" rel="noopener">${TELEFONO_MOSTRAR}</a></p>
      <p><a href="${MAPA_ENLACE}" target="_blank" rel="noopener">${DIRECCION}</a></p>
    </div>

    <div class="social">
      <a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
          <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/>
        </svg>
      </a>
      <a href="${FACEBOOK}" target="_blank" rel="noopener" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>
        </svg>
      </a>
      <a href="${YOUTUBE}" target="_blank" rel="noopener" aria-label="YouTube">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/>
        </svg>
      </a>
    </div>

    <p class="copy">© ${new Date().getFullYear()} Iglesia Bautista El Faro</p>
  </footer>`;

  // ---------- Insertar en la página ----------
  const lugarEncabezado = document.getElementById('encabezado');
  const lugarPie = document.getElementById('pie');
  if (lugarEncabezado) lugarEncabezado.outerHTML = encabezado;
  if (lugarPie) lugarPie.outerHTML = pie;

  // ---------- Menú móvil ----------
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('abierto'));
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('abierto'))
    );
  }
})();
