// =========================================
// Formulario de contacto
// =========================================

// Pega aquí la clave de acceso que te llegó por correo desde web3forms.com
const CLAVE_WEB3FORMS = 'PEGA_AQUI_TU_CLAVE';

(function () {
  // ---------- Datos de contacto (vienen de componentes.js) ----------
  const datosIglesia = window.IGLESIA || {};

  const cPastor = document.getElementById('cPastor');
  const cTelefono = document.getElementById('cTelefono');
  const cDireccion = document.getElementById('cDireccion');

  if (cPastor) cPastor.textContent = datosIglesia.pastor || '';
  if (cTelefono) {
    cTelefono.textContent = datosIglesia.telefonoMostrar || '';
    cTelefono.href = 'https://wa.me/' + (datosIglesia.telefonoWhatsapp || '');
  }
  if (cDireccion) {
    cDireccion.textContent = datosIglesia.direccion || '';
    cDireccion.href = datosIglesia.mapaEnlace || '#';
  }

  // ---------- Formulario ----------
  const form = document.getElementById('formContacto');
  const boton = document.getElementById('formBoton');
  const estado = document.getElementById('formEstado');
  if (!form || !boton || !estado) return;

  function mostrar(mensaje, tipo) {
    estado.textContent = mensaje;
    estado.className = 'form-estado ' + (tipo || '');
  }

  function correoValido(texto) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
  }

  form.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    mostrar('', '');

    // Si la clave no se ha configurado todavía
    if (CLAVE_WEB3FORMS.indexOf('PEGA') === 0) {
      mostrar('El formulario aún no está configurado. Por favor escríbenos por WhatsApp.', 'error');
      return;
    }

    const datos = new FormData(form);

    // Robots: el campo trampa viene marcado, se ignora el envío
    if (datos.get('botcheck')) return;

    const nombre = String(datos.get('nombre') || '').trim();
    const correo = String(datos.get('correo') || '').trim();
    const asunto = String(datos.get('asunto') || '').trim();
    const mensaje = String(datos.get('mensaje') || '').trim();

    if (!nombre || !correo || !mensaje) {
      mostrar('Por favor completa tu nombre, tu correo y tu mensaje.', 'error');
      return;
    }
    if (!correoValido(correo)) {
      mostrar('El correo electrónico no parece válido. Revísalo, por favor.', 'error');
      return;
    }

    const textoBoton = boton.textContent;
    boton.disabled = true;
    boton.textContent = 'Enviando...';

    try {
      const respuesta = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: CLAVE_WEB3FORMS,
          subject: 'Mensaje desde la página web' + (asunto ? ': ' + asunto : ''),
          from_name: 'Página web Iglesia Bautista El Faro',
          name: nombre,
          email: correo,
          asunto: asunto,
          message: mensaje
        })
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.success) {
        form.reset();
        mostrar('¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.', 'ok');
      } else {
        mostrar('No se pudo enviar el mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.', 'error');
      }
    } catch (error) {
      mostrar('No hay conexión o hubo un problema. Inténtalo de nuevo en unos minutos.', 'error');
    } finally {
      boton.disabled = false;
      boton.textContent = textoBoton;
    }
  });
})();
