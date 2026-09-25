# Telemática e Informática en la Educación a Distancia

Portal web interactivo y compendio formativo sobre infraestructura de redes de comunicación, arquitectura telemática, protocolos de transmisión y herramientas para el trabajo colaborativo en la educación virtual.

Desarrollado bajo principios de simplicidad enciclopédica, alta legibilidad, accesibilidad (WCAG AA) y pedagogía interactiva.

---

## 📚 Estructura de Contenidos

El portal se articula en cuatro grandes ejes curriculares más recursos de apoyo académico:

1. **Unidad I: Tecnologías de Redes e Internet**
   - **Competencias Cognitivas:** Definiciones formales de telemática, medios interactivos, red telemática, usuario, grupos de interés, redes, Internet, protocolos y WWW.
   - **Clasificación por Alcance Geográfico:** Redes PAN, LAN, MAN y WAN.
   - **Protocolos Principales:** Suite TCP/IP, HTTP/HTTPS, FTP, SMTP, IMAP y POP3 (con figura de la pila de protocolos y modelo OSI).
   - **Funcionamiento e Infraestructura:** Esquema real de conexión (Cliente-ISP-WAN), división en paquetes de datos y herramientas de navegación (navegadores, buscadores, traductores, foros, Telnet e Internet 2).
   - **Estructura y Arquitectura de Red:** Modelos Cliente-Servidor y Peer-to-Peer (P2P), exploración interactiva de las 6 topologías canónicas (*Estrella, Bus, Anillo, Malla, Árbol e Híbrida*) y matriz de componentes de hardware (*Hub, Bridge, Gateway, Router y Firewall*).
   - **Formatos Estándar:** Desglosador anatómico e interactivo de direcciones URL y correos electrónicos.

2. **Unidad II: Tecnologías para la Comunicación**
   - Comparativa de canales síncronos (*videoconferencia, salas de chat*) y asíncronos (*foros temáticos, correo institucional*).
   - Criterios pedagógicos y técnicos de selección para el aula virtual.

3. **Unidad III: El Trabajo Colaborativo mediante Redes**
   - Comunidades de Práctica (CoP) y Grupos de Interés (*Interest Groups*).
   - Herramientas clave: wikis colaborativas, pizarras virtuales y edición concurrente de documentos.

4. **Unidad IV: Uso de Software de Creación y Edición de Videos**
   - Fases de producción audiovisual educativa (*preproducción, grabación y postproducción*).
   - Software libre y profesional (Kdenlive, DaVinci Resolve) y formatos canónicos de distribución web (MP4 / H.264 / AAC).

5. **Artículo Monográfico y Recursos Complementarios**
   - Monografía académica estructurada según directrices del Manual UPEL (5.ª ed.) y normas APA (7.ª ed.), con aparato crítico y enlaces hipertextuales.
   - Videoteca temática con material en español y hemeroteca digital (UNESCO, RIED).
   - Glosario terminológico con buscador reactivo instantáneo.

---

## 🛠️ Componentes Interactivos

- **Simulador de Paquetes TCP/IP:** Demostración paso a paso de la segmentación de mensajes en datagramas, enrutamiento emisor-servidor y telemetría de latencia/integridad en tiempo real.
- **Explorador Visual de Topologías:** Visor reactivo con intercambio dinámico de diagramas canónicos reales y tablas comparativas de tolerancia a averías.
- **Inspectores Anatómicos:** Inspección visual de la estructura jerárquica de URLs y formatos de cuentas de correo.
- **Herramientas de Accesibilidad en Monografía:** Control reactivo de tamaño tipográfico (A+/A-) y modo papel para facilitar la lectura prolongada.
- **Buscador en el Glosario:** Filtrado dinámico en tiempo real sobre definiciones conceptuales clave.

---

## 🚀 Despliegue y Ejecución Local

No requiere de compiladores pesados ni gestores de paquetes. Está construido con estándares web puros (HTML5 semántico, CSS3 Vanilla y JavaScript ES6 moderno):

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Nucita-coder/telematica-educativa.git
   cd telematica-educativa
   ```

2. **Ejecutar localmente:**
   - Simplemente abre `index.html` en tu navegador web preferido (Chrome, Firefox, Edge, Safari).
   - O inicia un servidor estático local:
     ```bash
     python3 -m http.server 8000
     # o bien
     npx serve .
     ```
   - Abre `http://localhost:8000` en tu navegador.

3. **Despliegue en la nube:**
   - Totalmente preparado para despliegue directo e instantáneo en **Vercel** (incluye `vercel.json` con cabeceras de seguridad y URLs limpias) o **GitHub Pages**.

---

## 📄 Licencia

Proyecto con fines estrictamente académicos y educativos.
