document.addEventListener('DOMContentLoaded', () => {
  
  document.documentElement.setAttribute('data-theme', 'dark');
  try {
    localStorage.removeItem('theme-preference');
  } catch (e) {}

  initMobileMenu();
  initCarousel();
  initReadingProgress();
  initNavScrollSpy();
  initTcpSimulator();
  initTopologyViewer();
  initUrlInspector();
  initEmailInspector();
  initEssayControls();
  initSlideDeck();
  initAudioPlayer();
  initGeniallyPresentation();
  initSoftwareWorkbench();
  initTeamworkSimulator();
  initInfographicFilters();
  initScriptStages();
  initCapsulePlayer();
  initQuizModules();
});

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      menuBtn.setAttribute('aria-expanded', isOpen);
    });

    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function initCarousel() {
  const carousel = document.querySelector('.carousel-container');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const indicatorsContainer = carousel.querySelector('.carousel-indicators');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  if (indicatorsContainer) {
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir a diapositiva ${idx + 1}`);
      dot.addEventListener('click', () => {
        goToSlide(idx);
        restartAutoplay();
      });
      indicatorsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    const dots = indicatorsContainer ? indicatorsContainer.querySelectorAll('.carousel-dot') : [];
    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoplay();
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      restartAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      restartAutoplay();
    }
  });

  startAutoplay();
}

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

function initNavScrollSpy() {
  const links = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('main section[id], .module-divider-banner[id]');
  const isSubpage = window.location.pathname.includes('unidad');

  const idMapping = isSubpage ? {} : {
    'inicio': 'inicio',
    'introduccion': 'inicio',
    'objetivos': 'inicio',
    'modulo1': 'modulo1',
    'redes': 'modulo1',
    'clasificacion': 'modulo1',
    'funcionamiento': 'modulo1',
    'arquitectura': 'modulo1',
    'formatos': 'modulo1',
    'monografia': 'modulo1',
    'videoteca': 'modulo1',
    'modulo2': 'modulo2',
    'comunicacion': 'modulo2',
    'colaboracion': 'colaboracion',
    'video': 'video',
    'glosario': 'glosario'
  };

  function updateSpy() {
    let currentId = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 160 && rect.bottom >= 160) {
        currentId = sec.getAttribute('id');
      }
    });

    const targetNavId = idMapping[currentId] || currentId;

    if (targetNavId) {
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${targetNavId}` || href === `index.html#${targetNavId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateSpy, { passive: true });
  updateSpy();
}

function initTcpSimulator() {
  const startBtn = document.getElementById('startSimBtn');
  const msgInput = document.getElementById('simMessageInput');
  const packetDot = document.getElementById('simPacketDot');
  const clientNode = document.getElementById('simClientNode');
  const serverNode = document.getElementById('simServerNode');
  const statusText = document.getElementById('simStatusText');
  const packetsContainer = document.getElementById('packetsBreakdown');
  const serverOutput = document.getElementById('serverReceivedText');

  const telPing = document.getElementById('simTelemetryPing');
  const telIntegrity = document.getElementById('simTelemetryIntegrity');
  const telCount = document.getElementById('simTelemetryCount');

  if (!startBtn || !msgInput) return;

  startBtn.addEventListener('click', () => {
    const message = msgInput.value.trim() || 'Aula Virtual 2026: Educación Telemática';

    startBtn.disabled = true;
    startBtn.textContent = 'Transmitiendo en tiempo real...';
    serverOutput.textContent = 'Esperando reensamblado en búfer...';
    packetsContainer.innerHTML = '';

    if (telCount) telCount.textContent = '0 / 4';
    if (telIntegrity) telIntegrity.textContent = 'Verificando...';
    if (telPing) telPing.textContent = `${Math.floor(Math.random() * 8) + 12} ms`;

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

    setTimeout(() => {
      statusText.innerHTML = '<strong>Fase 2: Conmutación IP.</strong> Los paquetes transitan independientemente a través de routers troncales de fibra óptica conmutando etiquetas de capa 3.';
      packetDot.classList.add('traveling');
    }, 1100);

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

const topologiesData = {
  star: {
    title: 'Topología en Estrella (Punto a Punto Centralizado)',
    img: 'assets/topologia-estrella.png',
    desc: 'Todos los dispositivos de la red se conectan de forma radial independiente a un punto central (conmutador o Switch). Es la arquitectura predominante en centros educativos, laboratorios de informática y redes de campus universitarios modernos.',
    features: [
      '<strong>Ventaja Principal:</strong> Aislamiento de fallos; si un cable de estación se daña o desconecta, el resto de la red sigue operando con normalidad.',
      '<strong>Mantenimiento y Expansión:</strong> Sencillo agregar nuevos puestos de estudio o reubicar dispositivos sin interrumpir el servicio docente.',
      '<strong>Punto Crítico de Vulnerabilidad:</strong> Dependencia del conmutador central; si el Switch principal falla o pierde energía eléctrica, toda la sala queda incomunicada.'
    ]
  },
  bus: {
    title: 'Topología en Bus (Canal Común Compartido)',
    img: 'assets/topologia-bus.png',
    desc: 'Todos los nodos comparten un único cable troncal continuo con terminadores en los extremos para absorber las señales y evitar rebotes reflexivos.',
    features: [
      '<strong>Economía de cableado:</strong> Requiere la menor cantidad de metros de cable para instalaciones lineales simples.',
      '<strong>Colisiones de tráfico:</strong> Al compartir el mismo canal físico, el rendimiento se degrada rápidamente con alto volumen de datos.',
      '<strong>Vulnerabilidad troncal:</strong> Cualquier rotura física en el cable principal inutiliza de inmediato la red completa.'
    ]
  },
  ring: {
    title: 'Topología en Anillo (Bucle Cerrado Token Ring)',
    img: 'assets/topologia-anillo.png',
    desc: 'Cada nodo se interconecta sucesivamente con dos vecinos formando un circuito cerrado unidireccional. La información se transmite de forma ordenada mediante testigos o tramas ("token").',
    features: [
      '<strong>Tráfico predecible:</strong> Acceso equitativo al medio físico sin colisiones de paquetes bajo cargas elevadas.',
      '<strong>Regeneración de señal:</strong> Cada dispositivo actúa como repetidor antes de retransmitir el paquete al siguiente nodo.',
      '<strong>Punto débil:</strong> La caída o corte de un único enlace interrumpe todo el bucle, salvo en arquitecturas con doble anillo de respaldo (FDDI).'
    ]
  },
  mesh: {
    title: 'Topología en Malla (Conectividad Redundante)',
    img: 'assets/topologia-malla.png',
    desc: 'Los dispositivos están interconectados mediante enlaces directos redundantes. En la malla completa, cada nodo tiene un enlace dedicado con cada uno de los demás nodos del sistema.',
    features: [
      '<strong>Máxima tolerancia a fallos:</strong> Si un cable o nodo se interrumpe, el protocolo de enrutamiento redirige el tráfico al instante por otra ruta.',
      '<strong>Privacidad y rendimiento:</strong> Enlaces punto a punto dedicados que eliminan la contención de ancho de banda y escuchas no autorizadas.',
      '<strong>Costo de infraestructura:</strong> Exige una inversión muy alta en tendido de cableado físico y número de puertos de red.'
    ]
  },
  tree: {
    title: 'Topología en Árbol (Estructura Jerárquica)',
    img: 'assets/topologia-arbol.png',
    desc: 'Organización multinivel piramidal derivada de múltiples redes en estrella interconectadas a un conmutador raíz principal. Es el modelo preferido en redes de campus educativos.',
    features: [
      '<strong>Segmentación departamental:</strong> Permite aislar y priorizar subredes por facultad, laboratorio o unidad académica.',
      '<strong>Alta escalabilidad:</strong> Facilita añadir ramas completas con nuevos conmutadores secundarios sin alterar el núcleo institucional.',
      '<strong>Jerarquía crítica:</strong> Si el conmutador raíz principal se desconecta, las ramas pierden la comunicación interdepartamental y salida a Internet.'
    ]
  },
  hybrid: {
    title: 'Topología Mixta / Híbrida (Integración Modular)',
    img: 'assets/topologia-mixta.png',
    desc: 'Combinación sinérgica de dos o más topologías canónicas (estrella-bus, estrella-anillo o árbol-malla) adaptada a las características heterogéneas de una institución educativa.',
    features: [
      '<strong>Máxima adaptabilidad:</strong> Se ajusta a la topografía de los edificios, distancias y tipos de cableado existentes en el campus.',
      '<strong>Crecimiento modular:</strong> Permite expandir zonas sin necesidad de rediseñar las tecnologías ya instaladas.',
      '<strong>Complejidad técnica:</strong> Requiere planificación avanzada, direccionamiento IP estructurado y administración experta de conmutación.'
    ]
  }
};

function initTopologyViewer() {
  const buttons = document.querySelectorAll('.topology-btn');
  const imgElem = document.getElementById('topologyImg');
  const titleElem = document.getElementById('topologyTitle');
  const descElem = document.getElementById('topologyDesc');
  const featuresList = document.getElementById('topologyFeatures');

  if (!buttons.length || !imgElem || !titleElem || !descElem || !featuresList) return;

  function loadTopology(key) {
    const data = topologiesData[key];
    if (!data) return;

    buttons.forEach(btn => {
      const isActive = btn.getAttribute('data-topo') === key;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    imgElem.src = data.img;
    imgElem.alt = 'Esquema canónico de ' + data.title;
    titleElem.textContent = data.title;
    descElem.textContent = data.desc;
    featuresList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      loadTopology(btn.getAttribute('data-topo'));
    });
  });
}

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

function initEssayControls() {
  const essayBody = document.getElementById('essayBodyText');
  const essayContainer = document.querySelector('.essay-container');
  const btnFontIncrease = document.getElementById('btnFontIncrease');
  const btnFontDecrease = document.getElementById('btnFontDecrease');
  const btnPrintEssay = document.getElementById('btnPrintEssay');
  const btnCopyCitation = document.getElementById('btnCopyCitation');
  const copyCitationText = document.getElementById('copyCitationText');
  const btnPaperMode = document.getElementById('btnTogglePaperMode');

  let currentFontSize = 1.1; 

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
    const citationAPA = `UPEL. (2026). Internet como espacio de comunicación para el trabajo colaborativo: Arquitectura telemática, esquemas de conexión y mediación pedagógica en la educación a distancia. Aula Virtual de Telemática e Informática en la Educación a Distancia. Universidad Pedagógica Experimental Libertador (UPEL).`;

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

function initSlideDeck() {
  const containers = document.querySelectorAll('.slide-deck-container');
  if (!containers.length) return;

  containers.forEach(container => {
    const slides = container.querySelectorAll('.slide-deck-slide');
    const prevBtn = container.querySelector('.slide-nav-prev');
    const nextBtn = container.querySelector('.slide-nav-next');
    const counter = container.querySelector('.slide-deck-counter');
    const indicatorsContainer = container.querySelector('.slide-indicators-wrap');

    if (!slides.length) return;

    let currentIndex = 0;

    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Ir a diapositiva ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        indicatorsContainer.appendChild(dot);
      });
    }

    function updateControls() {
      if (counter) {
        counter.textContent = `Diapositiva ${currentIndex + 1} de ${slides.length}`;
      }
      if (prevBtn) {
        prevBtn.disabled = currentIndex === 0;
      }
      if (nextBtn) {
        nextBtn.disabled = currentIndex === slides.length - 1;
      }
      if (indicatorsContainer) {
        const dots = indicatorsContainer.querySelectorAll('.slide-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function goToSlide(index) {
      if (index < 0 || index >= slides.length) return;
      slides[currentIndex].classList.remove('active');
      currentIndex = index;
      slides[currentIndex].classList.add('active');
      updateControls();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

    updateControls();
  });
}

function initAudioPlayer() {
  const audio = document.getElementById('audioUnidad2');
  const playBtn = document.getElementById('podcastPlayBtn');
  const scrubber = document.getElementById('podcastScrubber');
  const timeDisplay = document.getElementById('podcastTime');
  const speedBtns = document.querySelectorAll('.podcast-speed-btn');

  if (!audio || !playBtn) return;

  function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        playBtn.textContent = 'Pausa';
        playBtn.setAttribute('aria-label', 'Pausar audio');
      }).catch(err => {
        console.warn('Audio playback error:', err);
      });
    } else {
      audio.pause();
      playBtn.textContent = 'Reproducir';
      playBtn.setAttribute('aria-label', 'Reproducir audio');
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (scrubber && audio.duration) {
      const pct = (audio.currentTime / audio.duration) * 100;
      scrubber.value = pct;
    }
    if (timeDisplay) {
      timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 104)}`;
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    if (timeDisplay) {
      timeDisplay.textContent = `00:00 / ${formatTime(audio.duration)}`;
    }
  });

  audio.addEventListener('ended', () => {
    playBtn.textContent = 'Reproducir';
    playBtn.setAttribute('aria-label', 'Reproducir audio');
    if (scrubber) scrubber.value = 0;
  });

  if (scrubber) {
    scrubber.addEventListener('input', () => {
      if (audio.duration) {
        audio.currentTime = (scrubber.value / 100) * audio.duration;
      }
    });
  }

  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const speed = parseFloat(btn.dataset.speed || '1');
      audio.playbackRate = speed;
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function initGeniallyPresentation() {
  const container = document.getElementById('geniallyPresentation');
  if (!container) return;

  const slides = container.querySelectorAll('.genially-slide-view');
  const thumbs = container.querySelectorAll('.filmstrip-thumb');
  const prevBtn = document.getElementById('geniallyPrevBtn');
  const nextBtn = document.getElementById('geniallyNextBtn');
  const counter = document.getElementById('geniallyCounter');
  const fullscreenBtn = document.getElementById('geniallyFullscreenBtn');
  const progressBar = document.getElementById('geniallyProgressBar');
  const slideTitleEl = document.getElementById('geniallySlideTitle');
  const indexBtn = document.getElementById('geniallyIndexBtn');
  const indexModal = document.getElementById('slideIndexModal');
  const closeIndexBtn = document.getElementById('closeSlideIndexBtn');
  const indexCards = document.querySelectorAll('.slide-index-card');

  if (!slides.length) return;

  let currentIndex = 0;

  function updateSlide(index) {
    if (index < 0 || index >= slides.length) return;
    slides[currentIndex].classList.remove('active');
    if (thumbs[currentIndex]) thumbs[currentIndex].classList.remove('active');
    if (indexCards[currentIndex]) indexCards[currentIndex].classList.remove('active');

    currentIndex = index;
    slides[currentIndex].classList.add('active');
    if (thumbs[currentIndex]) {
      thumbs[currentIndex].classList.add('active');
      thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    if (indexCards[currentIndex]) {
      indexCards[currentIndex].classList.add('active');
    }

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }
    if (progressBar) {
      const pct = ((currentIndex + 1) / slides.length) * 100;
      progressBar.style.width = `${pct}%`;
    }
    if (slideTitleEl && slides[currentIndex]) {
      const titleAttr = slides[currentIndex].getAttribute('data-slide-title');
      if (titleAttr) {
        slideTitleEl.textContent = titleAttr;
      }
    }
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex === slides.length - 1;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
  }

  thumbs.forEach((thumb, idx) => {
    thumb.addEventListener('click', () => updateSlide(idx));
  });

  const jumpBtns = container.querySelectorAll('[data-jump-slide]');
  jumpBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetIndex = parseInt(btn.getAttribute('data-jump-slide'), 10);
      if (!isNaN(targetIndex)) {
        updateSlide(targetIndex);
      }
    });
  });

  if (indexBtn && indexModal) {
    indexBtn.addEventListener('click', () => {
      indexModal.classList.add('open');
    });
  }
  if (closeIndexBtn && indexModal) {
    closeIndexBtn.addEventListener('click', () => {
      indexModal.classList.remove('open');
    });
  }
  if (indexModal) {
    indexModal.addEventListener('click', (e) => {
      if (e.target === indexModal) {
        indexModal.classList.remove('open');
      }
    });
  }
  indexCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      updateSlide(idx);
      if (indexModal) indexModal.classList.remove('open');
    });
  });

  const tabBtns = container.querySelectorAll('.deck-tab-btn');
  const tabPanes = container.querySelectorAll('.deck-tab-pane');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    });
  }

  const zoomBtns = container.querySelectorAll('.image-zoom-btn');
  const lightboxModal = document.getElementById('imageLightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = btn.closest('.hotspot-interactive-container');
      if (!parent) return;
      const img = parent.querySelector('img');
      if (!img) return;

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxTitle) {
          lightboxTitle.textContent = btn.getAttribute('data-title') || img.alt || 'Inspección Detallada';
        }
        if (lightboxCaption) {
          lightboxCaption.innerHTML = btn.getAttribute('data-caption') || img.alt || '';
        }
        lightboxModal.classList.add('open');
      }
    });
  });

  if (closeLightboxBtn && lightboxModal) {
    closeLightboxBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
    });
  }
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    });
  }

  const switcherBtns = container.querySelectorAll('.image-switcher-btn');
  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.slide-content-layout') || container;
      const btns = parent.querySelectorAll('.image-switcher-btn');
      const panes = parent.querySelectorAll('.image-pane');
      btns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target-pane');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  const compNavItems = container.querySelectorAll('.comp-nav-item');
  const compDetailPanels = container.querySelectorAll('.comp-detail-panel');
  const svgCompNodes = container.querySelectorAll('.svg-comp-node');

  function setActiveComponent(targetId) {
    compNavItems.forEach(i => {
      if (i.getAttribute('data-target-detail') === targetId) {
        i.classList.add('active');
      } else {
        i.classList.remove('active');
      }
    });
    compDetailPanels.forEach(p => {
      if (p.id === targetId) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });
    svgCompNodes.forEach(node => {
      if (node.getAttribute('data-target-detail') === targetId) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });
  }

  compNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target-detail');
      setActiveComponent(targetId);
    });
  });

  svgCompNodes.forEach(node => {
    node.addEventListener('click', () => {
      const targetId = node.getAttribute('data-target-detail');
      setActiveComponent(targetId);
    });
  });

  const svgTriadNodes = container.querySelectorAll('.svg-triad-node');
  const triadCards = container.querySelectorAll('.triad-card');
  svgTriadNodes.forEach(node => {
    node.addEventListener('click', () => {
      const idx = parseInt(node.getAttribute('data-triad-index'), 10);
      svgTriadNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      triadCards.forEach((card, cIdx) => {
        if (cIdx === idx) {
          card.style.borderColor = 'var(--primary)';
          card.style.transform = 'translateY(-6px)';
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.style.borderColor = 'var(--border-color)';
          card.style.transform = 'none';
        }
      });
    });
  });

  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      if (e.key === ' ') e.preventDefault();
      updateSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      updateSlide(currentIndex - 1);
    } else if (e.key === 'f' || e.key === 'F') {
      if (fullscreenBtn) fullscreenBtn.click();
    } else if (e.key === 'i' || e.key === 'I') {
      if (indexModal) indexModal.classList.toggle('open');
    } else if (e.key === 'Escape') {
      if (indexModal && indexModal.classList.contains('open')) {
        indexModal.classList.remove('open');
      }
      if (lightboxModal && lightboxModal.classList.contains('open')) {
        lightboxModal.classList.remove('open');
      }
    }
  });

  updateSlide(0);
}

function initSoftwareWorkbench() {
  const filterBtns = document.querySelectorAll('.workbench-filter-bar .filter-btn');
  const cards = document.querySelectorAll('.software-app-card');

  if (filterBtns.length && cards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || filter === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  cards.forEach(card => {
    const tabs = card.querySelectorAll('.card-dim-tab');
    const boxes = card.querySelectorAll('.dimension-box');
    if (!tabs.length || !boxes.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const dim = tab.getAttribute('data-dim');
        boxes.forEach(box => {
          if (box.classList.contains(`dim-${dim}`)) {
            box.classList.add('active');
          } else {
            box.classList.remove('active');
          }
        });
      });
    });
  });
}

function initTeamworkSimulator() {
  const runBtn = document.getElementById('simRunBtn');
  if (!runBtn) return;

  const orgSelect = document.getElementById('simOrgTool');
  const collabSelect = document.getElementById('simCollabTool');
  const commSelect = document.getElementById('simCommTool');

  const metricInterdep = document.getElementById('simMetricInterdep');
  const metricFreeRider = document.getElementById('simMetricFreeRider');
  const metricOrg = document.getElementById('simMetricOrg');
  const metricSynergy = document.getElementById('simMetricSynergy');

  const barInterdep = document.getElementById('simBarInterdep');
  const barFreeRider = document.getElementById('simBarFreeRider');
  const barOrg = document.getElementById('simBarOrg');
  const barSynergy = document.getElementById('simBarSynergy');

  const diagnosticText = document.getElementById('simDiagnosticText');
  const pipelineOrg = document.getElementById('simPipelineOrg');
  const pipelineCollab = document.getElementById('simPipelineCollab');
  const pipelineComm = document.getElementById('simPipelineComm');

  function updatePipeline() {
    if (pipelineOrg && orgSelect) {
      pipelineOrg.textContent = orgSelect.options[orgSelect.selectedIndex].text.split('(')[0].trim();
    }
    if (pipelineCollab && collabSelect) {
      pipelineCollab.textContent = collabSelect.options[collabSelect.selectedIndex].text.split('(')[0].trim();
    }
    if (pipelineComm && commSelect) {
      pipelineComm.textContent = commSelect.options[commSelect.selectedIndex].text.split('(')[0].trim();
    }
  }

  if (orgSelect) orgSelect.addEventListener('change', updatePipeline);
  if (collabSelect) collabSelect.addEventListener('change', updatePipeline);
  if (commSelect) commSelect.addEventListener('change', updatePipeline);
  updatePipeline();

  runBtn.addEventListener('click', () => {
    const org = orgSelect ? orgSelect.value : 'trello';
    const collab = collabSelect ? collabSelect.value : 'docs';
    const comm = commSelect ? commSelect.value : 'slack';

    let interdepScore = 50;
    let freeRiderRisk = 30;
    let orgScore = 50;
    let synergyScore = 50;

    let orgName = 'Trello';
    let collabName = 'Google Docs';
    let commName = 'Slack';

    if (org === 'trello') {
      orgScore += 45;
      freeRiderRisk -= 15;
      orgName = 'Trello (Tablero Kanban)';
    } else if (org === 'sheets') {
      orgScore += 20;
      freeRiderRisk += 10;
      orgName = 'Hoja de Cálculo Tradicional';
    } else {
      orgScore -= 30;
      freeRiderRisk += 45;
      orgName = 'Sin Herramienta Formal de Organización';
    }

    if (collab === 'docs') {
      interdepScore += 40;
      synergyScore += 40;
      freeRiderRisk -= 15;
      collabName = 'Google Docs / Etherpad (Cocreación Síncrona)';
    } else if (collab === 'word') {
      interdepScore -= 20;
      synergyScore -= 25;
      freeRiderRisk += 25;
      collabName = 'Archivos de Texto por Correo Electrónico';
    }

    if (comm === 'slack') {
      synergyScore += 15;
      orgScore += 10;
      commName = 'Slack / Teams (Canales e Hilos Estructurados)';
    } else if (comm === 'whatsapp') {
      synergyScore += 5;
      orgScore -= 10;
      commName = 'Chat Informal sin Estructura';
    }

    interdepScore = Math.max(15, Math.min(98, interdepScore));
    freeRiderRisk = Math.max(4, Math.min(95, freeRiderRisk));
    orgScore = Math.max(10, Math.min(96, orgScore));
    synergyScore = Math.max(12, Math.min(97, synergyScore));

    if (metricInterdep) metricInterdep.textContent = `${interdepScore}%`;
    if (metricFreeRider) metricFreeRider.textContent = `${freeRiderRisk}%`;
    if (metricOrg) metricOrg.textContent = `${orgScore}%`;
    if (metricSynergy) metricSynergy.textContent = `${synergyScore}%`;

    if (barInterdep) barInterdep.style.width = `${interdepScore}%`;
    if (barFreeRider) {
      barFreeRider.style.width = `${freeRiderRisk}%`;
      barFreeRider.style.backgroundColor = freeRiderRisk > 50 ? '#ef4444' : '#10b981';
    }
    if (barOrg) barOrg.style.width = `${orgScore}%`;
    if (barSynergy) barSynergy.style.width = `${synergyScore}%`;

    if (diagnosticText) {
      let diag = `<strong>Diagnóstico del Ecosistema Telemático:</strong> La configuración basada en <em>${orgName}</em>, <em>${collabName}</em> y <em>${commName}</em> genera una sinergia global del ${synergyScore}%. `;
      if (freeRiderRisk > 40) {
        diag += 'Existe un riesgo notable de <em>efecto polizón</em> (free-riding), debido a la falta de trazabilidad en los aportes individuales de cada estudiante. Se aconseja migrar hacia herramientas con historial de versiones por usuario y tableros kanban con asignación nominal.';
      } else {
        diag += 'La combinación asegura una alta <em>interdependencia positiva</em> y transparencia de desempeño según el modelo de Johnson & Johnson, garantizando que el éxito del equipo esté intrínsecamente ligado al compromiso individual de cada participante.';
      }
      diagnosticText.innerHTML = diag;
    }
  });
}

function initInfographicFilters() {
  const filterBtns = document.querySelectorAll('.infographic-filter-btn');
  const cards = document.querySelectorAll('.bento-card[data-model]');

  if (!filterBtns.length || !cards.length) return;

  function applyFilter(filter) {
    cards.forEach(card => {
      const model = card.getAttribute('data-model');
      if (filter === 'all' || filter === model) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  const activeBtn = document.querySelector('.infographic-filter-btn.active');
  if (activeBtn) {
    applyFilter(activeBtn.getAttribute('data-filter'));
  }
}

function initScriptStages() {
  const steps = document.querySelectorAll('.script-pipeline-step');
  const panels = document.querySelectorAll('.script-stage-content');
  if (!steps.length || !panels.length) return;

  steps.forEach(step => {
    step.addEventListener('click', () => {
      const targetId = step.getAttribute('data-stage-target');
      steps.forEach(s => s.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      step.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

function initCapsulePlayer() {
  const items = document.querySelectorAll('.capsule-chapter-item[data-seek-time]');
  const video = document.getElementById('capsuleVideoPlayer');
  const titleEl = document.getElementById('activeChapterTitle');
  const descEl = document.getElementById('activeChapterDesc');
  const timeEl = document.getElementById('activeChapterTime');
  if (!items.length || !video) return;

  const updateUI = item => {
    items.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const title = item.getAttribute('data-title') || '';
    const desc = item.getAttribute('data-desc') || '';
    const ts = item.getAttribute('data-timestamp') || '00:00';
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (timeEl) timeEl.textContent = ts;
  };

  const seekTo = item => {
    const sec = parseFloat(item.getAttribute('data-seek-time') || '0');
    if (!isNaN(sec)) {
      video.currentTime = sec;
      video.play().catch(() => {});
    }
    updateUI(item);
  };

  items.forEach(item => {
    item.addEventListener('click', () => seekTo(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        seekTo(item);
      }
    });
  });

  video.addEventListener('timeupdate', () => {
    const cur = video.currentTime;
    let currentItem = items[0];
    items.forEach(item => {
      const st = parseFloat(item.getAttribute('data-seek-time') || '0');
      if (cur >= st) {
        currentItem = item;
      }
    });
    if (currentItem && !currentItem.classList.contains('active')) {
      updateUI(currentItem);
    }
  });
}

function initQuizModules() {
  const quizContainers = document.querySelectorAll('.quiz-container');
  if (!quizContainers.length) return;

  quizContainers.forEach(container => {
    const optionBtns = container.querySelectorAll('.quiz-option-btn');
    const feedbackBox = container.querySelector('.quiz-feedback');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        const explain = btn.getAttribute('data-feedback') || '';

        optionBtns.forEach(b => {
          b.classList.remove('correct', 'incorrect');
          b.disabled = true;
          if (b.getAttribute('data-correct') === 'true') {
            b.classList.add('correct');
          }
        });

        if (!isCorrect) {
          btn.classList.add('incorrect');
        }

        if (feedbackBox) {
          feedbackBox.style.display = 'block';
          if (isCorrect) {
            feedbackBox.style.background = 'rgba(16, 185, 129, 0.12)';
            feedbackBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            feedbackBox.style.color = '#10b981';
            feedbackBox.innerHTML = `<strong>Respuesta Correcta:</strong> ${explain}`;
          } else {
            feedbackBox.style.background = 'rgba(239, 68, 68, 0.12)';
            feedbackBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            feedbackBox.style.color = '#f87171';
            feedbackBox.innerHTML = `<strong>Respuesta Incorrecta:</strong> ${explain}`;
          }
        }
      });
    });
  });
}

