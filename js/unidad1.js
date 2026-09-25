/**
 * ==========================================================================
 * UNIDAD I: TECNOLOGÍAS DE REDES E INTERNET
 * Lógica Interactiva, Telemetría y Simulaciones de Vanguardia (unidad1.js)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initSubnavScrollSpy();
  initGlossarySearch();
  initTcpSimulator();
  initTopologyViewer();
  initUrlInspector();
  initEmailInspector();
  initEssayControls();
  initQuiz();
});

/**
 * 1. Barra de Progreso de Lectura
 */
function initReadingProgress() {
  const progressBar = document.getElementById('readProgressBar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

/**
 * 2. Navegación Secundaria (Scroll Spy de la Unidad)
 */
function initSubnavScrollSpy() {
  const links = document.querySelectorAll('.unit-subnav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateSpy() {
    let currentId = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 180 && rect.bottom >= 180) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
      });
    }
  }

  window.addEventListener('scroll', updateSpy, { passive: true });
  updateSpy();
}

/**
 * 3. Búsqueda y Filtro en Tiempo Real del Glosario (Definiciones)
 */
function initGlossarySearch() {
  const searchInput = document.getElementById('glossarySearch');
  const cards = document.querySelectorAll('.definition-card');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(term)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/**
 * 4. SIMULADOR INTERACTIVO DE RED (CYBER CONSOLE NOC)
 * Telemetría en tiempo real, segmentación TCP y enrutamiento IP
 */
function initTcpSimulator() {
  const startBtn = document.getElementById('startSimBtn');
  const msgInput = document.getElementById('simMessageInput');
  const packetDot = document.getElementById('simPacketDot');
  const clientNode = document.getElementById('simClientNode');
  const serverNode = document.getElementById('simServerNode');
  const statusText = document.getElementById('simStatusText');
  const packetsContainer = document.getElementById('packetsBreakdown');
  const serverOutput = document.getElementById('serverReceivedText');
  
  // Elementos de telemetría
  const telPing = document.getElementById('simTelemetryPing');
  const telIntegrity = document.getElementById('simTelemetryIntegrity');
  const telCount = document.getElementById('simTelemetryCount');

  if (!startBtn || !msgInput) return;

  startBtn.addEventListener('click', () => {
    const message = msgInput.value.trim() || 'Aula Virtual 2026: Educación Telemática';
    
    // Deshabilitar botón durante la transmisión
    startBtn.disabled = true;
    startBtn.textContent = 'Transmitiendo en tiempo real...';
    serverOutput.textContent = 'Esperando reensamblado en búfer...';
    packetsContainer.innerHTML = '';

    if (telCount) telCount.textContent = '0 / 4';
    if (telIntegrity) telIntegrity.textContent = 'Verificando...';
    if (telPing) telPing.textContent = `${Math.floor(Math.random() * 8) + 12} ms`;

    // Paso 1: Segmentación TCP y adición de cabeceras
    statusText.innerHTML = '<strong>Fase 1: Segmentación TCP.</strong> El protocolo <strong>TCP</strong> fragmenta la cadena en datagramas discretos, añadiendo números de secuencia y puertos origen/destino (49152 &rarr; 443).';
    if (clientNode) clientNode.classList.add('active-tx');
    const numChunks = 4;
    const chunkSize = Math.max(1, Math.ceil(message.length / numChunks));
    const chunks = [];
    for (let i = 0; i < message.length; i += chunkSize) {
      chunks.push(message.substring(i, i + chunkSize));
    }
    const totalPkts = chunks.length;

    if (telCount) telCount.textContent = `0 / ${totalPkts}`;

    // Renderizar tarjetas de paquetes de red
    chunks.forEach((chunk, index) => {
      const pBox = document.createElement('div');
      pBox.className = 'packet-card';
      const seqNum = (index + 1) * 1024 + Math.floor(Math.random() * 256);
      pBox.innerHTML = `
        <div class="packet-header">
          <span>PAQUETE TCP #${index + 1}</span>
          <span>SEQ: ${seqNum}</span>
        </div>
        <div style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 0.35rem;">
          SRC: 192.168.1.45:49152 &bull; DST: 200.74.192.10:443
        </div>
        <div><strong>Datos:</strong> <span style="color: #ffffff; font-weight: 600;">"${chunk}"</span></div>
        <div style="font-size: 0.76rem; color: #94a3b8; margin-top: 0.4rem;">
          FLAGS: [PSH, ACK] &bull; Checksum: 0x${Math.floor(Math.random()*65535).toString(16).toUpperCase()} OK
        </div>
      `;
      packetsContainer.appendChild(pBox);
    });

    if (telCount) telCount.textContent = `${totalPkts} / ${totalPkts} Generados`;

    // Paso 2: Enrutamiento IP a través de la nube/red
    setTimeout(() => {
      statusText.innerHTML = '<strong>Fase 2: Conmutación IP.</strong> Los paquetes transitan independientemente a través de routers troncales de fibra óptica conmutando etiquetas de capa 3.';
      packetDot.classList.add('traveling');
    }, 1100);

    // Paso 3: Llegada al servidor y Reensamblado
    setTimeout(() => {
      packetDot.classList.remove('traveling');
      if (clientNode) clientNode.classList.remove('active-tx');
      if (serverNode) serverNode.classList.add('active-rx');
      
      if (telIntegrity) telIntegrity.textContent = '100% Sin Pérdida (0 Err)';
      if (telCount) telCount.textContent = `${totalPkts} / ${totalPkts} Reensamblados`;
      if (telPing) telPing.textContent = '14 ms';

      statusText.innerHTML = '<strong>Fase 3: Verificación e Integridad.</strong> El host destino valida las sumas de verificación (*checksums*), confirma recepción con un ACK y <strong>TCP entrega el mensaje completo a la aplicación</strong>.';
      serverOutput.textContent = `Mensaje íntegro reensamblado: "${message}"`;

      startBtn.disabled = false;
      startBtn.textContent = 'Simular Envío TCP/IP';
    }, 2800);

    setTimeout(() => {
      serverNode.classList.remove('active-rx');
    }, 4500);
  });
}

/**
 * 5. EXPLORADOR VISUAL DE TOPOLOGÍAS DE RED (SVG NEÓN DE ALTA DEFINICIÓN)
 */
const topologiesData = {
  bus: {
    title: 'Topología en Bus (Línea Troncal)',
    desc: 'Todos los nodos están directamente conectados a un cable central de comunicación (bus o troncal) terminado con resistencias en sus extremos.',
    features: [
      '<strong>Ventajas:</strong> Fácil de instalar, económica y requiere poco cableado.',
      '<strong>Desventaja principal:</strong> Si el cable principal se corta o daña, toda la red queda inmediatamente incomunicada.',
      '<strong>Uso común:</strong> Redes Ethernet primarias (10BASE2) y laboratorios pequeños históricos.'
    ],
    svg: `
      <svg viewBox="0 0 420 220" width="100%" height="100%">
        <!-- Troncal central -->
        <line x1="40" y1="110" x2="380" y2="110" stroke="#64748b" stroke-width="6" stroke-linecap="round" />
        <circle cx="40" cy="110" r="7" fill="#475569" />
        <circle cx="380" cy="110" r="7" fill="#475569" />
        <!-- Conexiones a nodos -->
        <line x1="90" y1="110" x2="90" y2="45" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4" />
        <line x1="170" y1="110" x2="170" y2="175" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4" />
        <line x1="250" y1="110" x2="250" y2="45" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4" />
        <line x1="330" y1="110" x2="330" y2="175" stroke="#94a3b8" stroke-width="2.5" stroke-dasharray="4,4" />
        <!-- Nodos -->
        <rect x="70" y="20" width="42" height="28" rx="4" fill="#18181b" stroke="#3e3e44" stroke-width="1.5" />
        <text x="91" y="38" fill="#f4f4f5" font-size="10" font-weight="bold" text-anchor="middle">PC 1</text>
        <rect x="150" y="175" width="42" height="28" rx="4" fill="#18181b" stroke="#3e3e44" stroke-width="1.5" />
        <text x="171" y="193" fill="#f4f4f5" font-size="10" font-weight="bold" text-anchor="middle">PC 2</text>
        <rect x="230" y="20" width="42" height="28" rx="4" fill="#18181b" stroke="#3e3e44" stroke-width="1.5" />
        <text x="251" y="38" fill="#f4f4f5" font-size="10" font-weight="bold" text-anchor="middle">PC 3</text>
        <rect x="310" y="175" width="42" height="28" rx="4" fill="#18181b" stroke="#3e3e44" stroke-width="1.5" />
        <text x="331" y="193" fill="#f4f4f5" font-size="10" font-weight="bold" text-anchor="middle">PC 4</text>
      </svg>
    `
  },
  star: {
    title: 'Topología en Estrella (Conmutada)',
    desc: 'Todos los equipos se conectan de manera radial directa a un punto central (Switch o conmutador). Es la arquitectura estándar de redes locales modernas.',
    features: [
      '<strong>Ventajas:</strong> Si un cable o nodo falla, el resto de la red sigue operando sin interrupción.',
      '<strong>Mantenimiento:</strong> Fácil de monitorear y agregar nuevos puestos de trabajo.',
      '<strong>Vulnerabilidad:</strong> Si el conmutador central se apaga o sufre una avería, todos los equipos pierden la comunicación.'
    ],
    svg: `
      <svg viewBox="0 0 420 220" width="100%" height="100%">
        <!-- Enlaces al centro -->
        <line x1="210" y1="110" x2="100" y2="45" stroke="#64748b" stroke-width="2" />
        <line x1="210" y1="110" x2="320" y2="45" stroke="#64748b" stroke-width="2" />
        <line x1="210" y1="110" x2="350" y2="140" stroke="#64748b" stroke-width="2" />
        <line x1="210" y1="110" x2="210" y2="195" stroke="#64748b" stroke-width="2" />
        <line x1="210" y1="110" x2="70" y2="140" stroke="#64748b" stroke-width="2" />
        <!-- Switch central -->
        <circle cx="210" cy="110" r="32" fill="#1e293b" stroke="#cbd5e1" stroke-width="2.5" />
        <text x="210" y="114" fill="#fff" font-size="11" font-weight="900" text-anchor="middle">SWITCH</text>
        <!-- Nodos periféricos -->
        <rect x="80" y="28" width="42" height="28" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <text x="101" y="46" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 1</text>
        <rect x="300" y="28" width="42" height="28" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <text x="321" y="46" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 2</text>
        <rect x="330" y="128" width="42" height="28" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <text x="351" y="146" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 3</text>
        <rect x="189" y="180" width="42" height="28" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <text x="210" y="198" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 4</text>
        <rect x="49" y="128" width="42" height="28" rx="6" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <text x="70" y="146" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 5</text>
      </svg>
    `
  },
  ring: {
    title: 'Topología en Anillo (Token Ring)',
    desc: 'Los dispositivos están interconectados en un bucle cerrado continuo, donde cada nodo tiene exactamente dos vecinos directos.',
    features: [
      '<strong>Flujo:</strong> La información viaja en un único sentido a través de una trama o "token".',
      '<strong>Rendimiento:</strong> Desempeño uniforme sin colisiones de paquetes bajo cargas elevadas.',
      '<strong>Desventaja:</strong> Una avería en un nodo o enlace interrumpe el anillo completo salvo que exista un doble anillo de respaldo (FDDI).'
    ],
    svg: `
      <svg viewBox="0 0 420 220" width="100%" height="100%">
        <!-- Anillo circular -->
        <circle cx="210" cy="110" r="75" fill="none" stroke="#64748b" stroke-width="3" stroke-dasharray="6,4" />
        <!-- Nodos sobre el anillo -->
        <circle cx="210" cy="35" r="20" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <text x="210" y="39" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 1</text>
        <circle cx="285" cy="110" r="20" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <text x="285" y="114" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 2</text>
        <circle cx="210" cy="185" r="20" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <text x="210" y="189" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 3</text>
        <circle cx="135" cy="110" r="20" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <text x="135" y="114" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">PC 4</text>
      </svg>
    `
  },
  mesh: {
    title: 'Topología en Malla (Completamente Conexa)',
    desc: 'Cada dispositivo está interconectado con todos los demás nodos de la red, garantizando múltiples rutas redundantes.',
    features: [
      '<strong>Máxima tolerancia a fallos:</strong> Si un enlace se corta, el tráfico se redirige instantáneamente por otra ruta.',
      '<strong>Seguridad y privacidad:</strong> Los mensajes viajan por enlaces dedicados sin ser interceptados.',
      '<strong>Desventaja:</strong> Costo muy elevado en cableado y puertos de hardware físico.'
    ],
    svg: `
      <svg viewBox="0 0 420 220" width="100%" height="100%">
        <!-- Enlaces en malla completa -->
        <line x1="130" y1="45" x2="290" y2="45" stroke="#64748b" stroke-width="1.8" />
        <line x1="290" y1="45" x2="350" y2="140" stroke="#64748b" stroke-width="1.8" />
        <line x1="350" y1="140" x2="210" y2="185" stroke="#64748b" stroke-width="1.8" />
        <line x1="210" y1="185" x2="70" y2="140" stroke="#64748b" stroke-width="1.8" />
        <line x1="70" y1="140" x2="130" y2="45" stroke="#64748b" stroke-width="1.8" />
        <!-- Enlaces diagonales internos -->
        <line x1="130" y1="45" x2="350" y2="140" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,3" />
        <line x1="130" y1="45" x2="210" y2="185" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,3" />
        <line x1="290" y1="45" x2="210" y2="185" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,3" />
        <line x1="290" y1="45" x2="70" y2="140" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,3" />
        <line x1="70" y1="140" x2="350" y2="140" stroke="#475569" stroke-width="1.2" stroke-dasharray="3,3" />
        <!-- Nodos -->
        <circle cx="130" cy="45" r="18" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <circle cx="290" cy="45" r="18" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <circle cx="350" cy="140" r="18" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <circle cx="210" cy="185" r="18" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
        <circle cx="70" cy="140" r="18" fill="#0f172a" stroke="#cbd5e1" stroke-width="2.5" />
      </svg>
    `
  },
  tree: {
    title: 'Topología en Árbol (Jerárquica)',
    desc: 'Los nodos están organizados de forma piramidal o jerárquica, semejando ramas de un árbol conectadas a un conmutador raíz.',
    features: [
      '<strong>Escalabilidad:</strong> Permite dividir la red de un campus o institución en subredes por departamento.',
      '<strong>Gestión central:</strong> Facilita el aislamiento de prioridades y control de tráfico.',
      '<strong>Vulnerabilidad:</strong> Si el nodo raíz principal falla, toda la jerarquía queda desconectada.'
    ],
    svg: `
      <svg viewBox="0 0 420 220" width="100%" height="100%">
        <!-- Enlaces raíz a nivel 1 -->
        <line x1="210" y1="40" x2="115" y2="105" stroke="#94a3b8" stroke-width="2.5" />
        <line x1="210" y1="40" x2="305" y2="105" stroke="#94a3b8" stroke-width="2.5" />
        <!-- Enlaces nivel 1 a nivel 2 -->
        <line x1="115" y1="105" x2="70" y2="175" stroke="#94a3b8" stroke-width="2" />
        <line x1="115" y1="105" x2="155" y2="175" stroke="#94a3b8" stroke-width="2" />
        <line x1="305" y1="105" x2="260" y2="175" stroke="#94a3b8" stroke-width="2" />
        <line x1="305" y1="105" x2="350" y2="175" stroke="#94a3b8" stroke-width="2" />
        <!-- Nodo Raíz -->
        <rect x="180" y="24" width="60" height="28" rx="6" fill="#1e293b" stroke="#cbd5e1" stroke-width="2.5" />
        <text x="210" y="42" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">RAÍZ</text>
        <!-- Nivel 1 -->
        <rect x="90" y="92" width="52" height="26" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
        <text x="116" y="109" fill="#fff" font-size="10" text-anchor="middle">Hub A</text>
        <rect x="280" y="92" width="52" height="26" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
        <text x="306" y="109" fill="#fff" font-size="10" text-anchor="middle">Hub B</text>
        <!-- Nivel 2 -->
        <circle cx="70" cy="175" r="16" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <circle cx="155" cy="175" r="16" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <circle cx="260" cy="175" r="16" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
        <circle cx="350" cy="175" r="16" fill="#0f172a" stroke="#cbd5e1" stroke-width="2" />
      </svg>
    `
  },
  hybrid: {
    title: 'Topología Híbrida (Mixta)',
    desc: 'Combina dos o más topologías diferentes (por ejemplo, estrella-bus o estrella-anillo) para adaptarse a infraestructuras heterogéneas.',
    features: [
      '<strong>Flexibilidad:</strong> Diseñada a la medida de los requerimientos y crecimiento de la organización.',
      '<strong>Mantenimiento:</strong> Permite expandir zonas de la red sin alterar las tecnologías ya desplegadas.',
      '<strong>Complejidad:</strong> Exige configuración experta y hardware de interconexión avanzado.'
    ],
    svg: `
      <svg viewBox="0 0 420 220" width="100%" height="100%">
        <!-- Troncal Bus -->
        <line x1="50" y1="110" x2="370" y2="110" stroke="#64748b" stroke-width="6" stroke-linecap="round" />
        <!-- Conexión a Estrella Izquierda -->
        <line x1="120" y1="110" x2="120" y2="55" stroke="#94a3b8" stroke-width="2" />
        <circle cx="120" cy="55" r="18" fill="#1e293b" stroke="#cbd5e1" stroke-width="2" />
        <line x1="120" y1="55" x2="70" y2="30" stroke="#94a3b8" stroke-width="1.8" />
        <line x1="120" y1="55" x2="170" y2="30" stroke="#94a3b8" stroke-width="1.8" />
        <circle cx="70" cy="30" r="12" fill="#475569" />
        <circle cx="170" cy="30" r="12" fill="#475569" />
        <!-- Conexión a Estrella Derecha -->
        <line x1="300" y1="110" x2="300" y2="165" stroke="#94a3b8" stroke-width="2" />
        <circle cx="300" cy="165" r="18" fill="#1e293b" stroke="#cbd5e1" stroke-width="2" />
        <line x1="300" y1="165" x2="250" y2="190" stroke="#94a3b8" stroke-width="1.8" />
        <line x1="300" y1="165" x2="350" y2="190" stroke="#94a3b8" stroke-width="1.8" />
        <circle cx="250" cy="190" r="12" fill="#64748b" />
        <circle cx="350" cy="190" r="12" fill="#64748b" />
        <text x="210" y="128" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Troncal Bus + Estrellas</text>
      </svg>
    `
  }
};

function initTopologyViewer() {
  const buttons = document.querySelectorAll('.topology-btn');
  const canvasWrap = document.getElementById('topologyCanvas');
  const titleElem = document.getElementById('topologyTitle');
  const descElem = document.getElementById('topologyDesc');
  const featuresList = document.getElementById('topologyFeatures');

  if (!buttons.length || !canvasWrap) return;

  function loadTopology(key) {
    const data = topologiesData[key];
    if (!data) return;

    buttons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-topo') === key);
    });

    canvasWrap.innerHTML = data.svg;
    titleElem.textContent = data.title;
    descElem.textContent = data.desc;
    featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      loadTopology(btn.getAttribute('data-topo'));
    });
  });

  // Carga inicial
  loadTopology('star');
}

/**
 * 6. DESGLOSADOR ANATÓMICO DE DIRECCIÓN WEB (URL)
 */
function initUrlInspector() {
  const parts = document.querySelectorAll('#urlBar .url-part');
  const explainBox = document.getElementById('urlExplain');

  const explanations = {
    proto: '<strong>Protocolo (https://)</strong>: Define el conjunto de reglas de transferencia de hipertexto cifrado (SSL/TLS), garantizando privacidad e integridad entre el navegador y el servidor.',
    sub: '<strong>Subdominio (www.)</strong>: Subdivisión lógica del dominio principal destinada habitualmente a los servicios de World Wide Web.',
    dom: '<strong>Nombre de Dominio (ejemplo)</strong>: Nombre legible por humanos que identifica de forma única al servidor en Internet gracias al sistema DNS.',
    tld: '<strong>Extensión / TLD (.edu.ve)</strong>: Dominio de nivel superior de propósito educativo (.edu) y ámbito territorial venezolano (.ve).',
    path: '<strong>Ruta Interna (/cursos/unidad1)</strong>: Dirección exacta de la carpeta o recurso alojado en el sistema de archivos del servidor web.'
  };

  if (!parts.length || !explainBox) return;

  parts.forEach(part => {
    part.addEventListener('mouseenter', () => {
      const type = part.getAttribute('data-type');
      if (explanations[type]) {
        explainBox.innerHTML = explanations[type];
      }
    });

    part.addEventListener('click', () => {
      parts.forEach(p => p.classList.remove('active'));
      part.classList.add('active');
      const type = part.getAttribute('data-type');
      if (explanations[type]) {
        explainBox.innerHTML = explanations[type];
      }
    });
  });
}

/**
 * 7. DESGLOSADOR ANATÓMICO DE CORREO ELECTRÓNICO
 */
function initEmailInspector() {
  const parts = document.querySelectorAll('#emailBar .url-part');
  const explainBox = document.getElementById('emailExplain');

  const emailExplanations = {
    user: '<strong>nombreusuario</strong>: Identificador único del buzón personal del usuario registrado en el servidor de correo.',
    at: '<strong>@ (Arroba)</strong>: Conector universal ("at" en inglés, "en"), que indica en qué servidor o dominio reside el buzón del usuario.',
    mailserver: '<strong>dominio.com</strong>: Nombre del servidor o entidad responsable de recibir y gestionar los correos mediante protocolos como SMTP, IMAP o POP3.'
  };

  if (!parts.length || !explainBox) return;

  parts.forEach(part => {
    part.addEventListener('mouseenter', () => {
      const type = part.getAttribute('data-type');
      if (emailExplanations[type]) {
        explainBox.innerHTML = emailExplanations[type];
      }
    });

    part.addEventListener('click', () => {
      parts.forEach(p => p.classList.remove('active'));
      part.classList.add('active');
      const type = part.getAttribute('data-type');
      if (emailExplanations[type]) {
        explainBox.innerHTML = emailExplanations[type];
      }
    });
  });
}

/**
 * 8. AUTOEVALUACIÓN INTERACTIVA (GAMIFIED QUIZ)
 */
function initQuiz() {
  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  const scoreCounter = document.getElementById('quizCorrectCount');
  const resetBtn = document.getElementById('btnResetQuiz');
  const scoreBadge = document.getElementById('quizScoreBadge');

  let correctAnswers = 0;
  let answeredQuestions = 0;
  const totalQuestions = document.querySelectorAll('.quiz-question-box').length;

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentQuestion = btn.closest('.quiz-question-box');
      const feedback = parentQuestion.querySelector('.quiz-feedback');
      const allBtns = parentQuestion.querySelectorAll('.quiz-option-btn');

      // Desactivar botones de esta pregunta
      allBtns.forEach(b => {
        b.disabled = true;
        b.style.pointerEvents = 'none';
      });

      answeredQuestions++;
      const isCorrect = btn.getAttribute('data-correct') === 'true';

      if (isCorrect) {
        correctAnswers++;
        btn.classList.add('correct');
        feedback.innerHTML = `<strong>¡Excelente!</strong> ${feedback.getAttribute('data-explanation')}`;
        feedback.style.backgroundColor = 'var(--success-light)';
        feedback.style.color = 'var(--success)';
        feedback.style.border = '1px solid rgba(16, 185, 129, 0.35)';
      } else {
        btn.classList.add('incorrect');
        allBtns.forEach(b => {
          if (b.getAttribute('data-correct') === 'true') {
            b.classList.add('correct');
          }
        });
        feedback.innerHTML = `<strong>Respuesta Incorrecta.</strong> ${feedback.getAttribute('data-explanation')}`;
        feedback.style.backgroundColor = 'var(--danger-light)';
        feedback.style.color = 'var(--danger)';
        feedback.style.border = '1px solid rgba(239, 68, 68, 0.35)';
      }

      feedback.classList.add('show');

      // Actualizar marcador de aciertos
      const currentCounter = document.getElementById('quizCorrectCount');
      if (currentCounter) {
        currentCounter.textContent = `${correctAnswers} / ${totalQuestions}`;
      }

      // Si se completaron todas las preguntas
      if (answeredQuestions >= totalQuestions) {
        if (resetBtn) resetBtn.style.display = 'inline-flex';
        if (scoreBadge) {
          if (correctAnswers === totalQuestions) {
            scoreBadge.className = 'quiz-score-display quiz-score-perfect';
            scoreBadge.innerHTML = `¡Puntaje Perfecto! <strong id="quizCorrectCount" style="color: #ffffff;">${correctAnswers} / ${totalQuestions}</strong>`;
          } else {
            scoreBadge.className = 'quiz-score-display';
            scoreBadge.innerHTML = `Resultado: <strong id="quizCorrectCount" style="color: #ffffff;">${correctAnswers} / ${totalQuestions}</strong>`;
          }
        }
      }
    });
  });

  // Reiniciar cuestionario
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      correctAnswers = 0;
      answeredQuestions = 0;
      if (scoreBadge) {
        scoreBadge.className = 'quiz-score-display';
        scoreBadge.innerHTML = `Aciertos: <strong id="quizCorrectCount" style="margin-left: 4px; color: #ffffff;">0 / ${totalQuestions}</strong>`;
      }
      resetBtn.style.display = 'none';

      document.querySelectorAll('.quiz-question-box').forEach(box => {
        box.querySelectorAll('.quiz-option-btn').forEach(btn => {
          btn.disabled = false;
          btn.style.pointerEvents = 'auto';
          btn.classList.remove('correct', 'incorrect');
        });
        const fb = box.querySelector('.quiz-feedback');
        if (fb) fb.classList.remove('show');
      });
    });
  }
}

/**
 * 9. CONTROLES DEL ENSAYO ACADÉMICO (NORMAS UPEL / APA)
 */
function initEssayControls() {
  const essayBody = document.getElementById('essayBodyText');
  const essayContainer = document.querySelector('.essay-container');
  const btnFontIncrease = document.getElementById('btnFontIncrease');
  const btnFontDecrease = document.getElementById('btnFontDecrease');
  const btnPrintEssay = document.getElementById('btnPrintEssay');
  const btnCopyCitation = document.getElementById('btnCopyCitation');
  const copyCitationText = document.getElementById('copyCitationText');
  const btnPaperMode = document.getElementById('btnTogglePaperMode');

  let currentFontSize = 1.1; // rem base

  // Alternar Modo Papel Académico (Ivory Paper) vs Modo Digital Oscuro
  if (btnPaperMode && essayContainer) {
    btnPaperMode.addEventListener('click', () => {
      const isPaper = essayContainer.getAttribute('data-paper-mode') === 'true';
      if (isPaper) {
        essayContainer.removeAttribute('data-paper-mode');
        btnPaperMode.textContent = 'Modo Papel';
      } else {
        essayContainer.setAttribute('data-paper-mode', 'true');
        btnPaperMode.textContent = 'Modo Digital';
      }
    });
  }

  if (btnFontIncrease && essayBody) {
    btnFontIncrease.addEventListener('click', () => {
      if (currentFontSize < 1.4) {
        currentFontSize += 0.08;
        essayBody.style.fontSize = `${currentFontSize.toFixed(2)}rem`;
      }
    });
  }

  if (btnFontDecrease && essayBody) {
    btnFontDecrease.addEventListener('click', () => {
      if (currentFontSize > 0.9) {
        currentFontSize -= 0.08;
        essayBody.style.fontSize = `${currentFontSize.toFixed(2)}rem`;
      }
    });
  }

  if (btnPrintEssay) {
    btnPrintEssay.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnCopyCitation) {
    const citationAPA = `Anthony. (2026). Internet como espacio de comunicación para el trabajo colaborativo: Arquitectura telemática, esquemas de conexión y mediación pedagógica en la educación a distancia. Aula Virtual de Telemática e Informática en la Educación a Distancia. Universidad Pedagógica Experimental Libertador (UPEL).`;

    btnCopyCitation.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(citationAPA);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = citationAPA;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        if (copyCitationText) {
          const original = copyCitationText.textContent;
          copyCitationText.textContent = '¡Cita Copiada!';
          btnCopyCitation.style.borderColor = 'var(--success)';
          btnCopyCitation.style.color = 'var(--success)';
          setTimeout(() => {
            copyCitationText.textContent = original;
            btnCopyCitation.style.borderColor = '';
            btnCopyCitation.style.color = '';
          }, 2500);
        }
      } catch (err) {
        console.error('Error al copiar cita:', err);
      }
    });
  }
}
