# 🧾 Presupuestos Lubribox

Aplicación web desarrollada en **React.js** para generar presupuestos de servicios automotrices. Permite al usuario ingresar datos como modelo, patente, tipo de filtros y lubricantes, calcular el total automáticamente y exportar un resumen visual a PDF.

Ideal para talleres mecánicos o centros de servicio rápido que desean entregar presupuestos limpios, rápidos y digitales.

---

## 🌐 Demo en Producción

🔗 [https://demo-prueba.online/](https://demo-prueba.online/)

---

## 🚀 Funcionalidades

- Formulario para ingresar datos de servicio (modelo, fecha, patente, cantidades, montos).
- Cálculo automático del total.
- Vista previa estilo ticket profesional.
- Exportación del resumen en formato PDF con fondo personalizado.
- Interfaz responsive y clara, diseñada para impresión o envío digital.
- Navegación de formulario a resumen utilizando React Router.

---

## ⚙️ Tecnologías Usadas

- **React 18**: Librería principal para UI.
- **React Router DOM**: Navegación entre pantallas.
- **jsPDF**: Generación del documento PDF.
- **html2canvas**: Captura visual del DOM para PDF.
- **CSS personalizado**: Para estilo profesional con fondo oscuro.
- **react-dom/server**: Renderizado HTML para exportar.

---

## 📦 Dependencias

```json
{
  "html2canvas": "^1.4.1",
  "jspdf": "^2.5.2",
  "jspdf-autotable": "^3.8.3",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.27.0",
  "react-scripts": "5.0.1",
  "react-to-print": "^3.0.2"
}
```

---

## 🧰 Requisitos

- Node.js >= 16
- npm o yarn

---

## 🛠️ Instalación local

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm start
```

La app se abrirá en `http://localhost:3000`.

3. Compilar para producción:

```bash
npm run build
```

Esto generará la build optimizada en la carpeta `/build`.

---

## 🧠 Cómo funciona

### Estructura general

- `Presupuesto.jsx`: Componente principal donde se ingresan los datos.
- `Resumen.jsx`: Muestra un resumen visual para revisar y exportar.
- `Presupuesto.css`: Estilos personalizados con fondo negro y detalles visuales.
- Se usan **refs** (`useRef`) para capturar DOM y exportarlo a imagen para el PDF.
- La navegación se realiza con `useNavigate` y `useLocation` para pasar datos entre componentes.

### Flujo del usuario

1. Completa el formulario de servicio (fecha, modelo, filtros, montos).
2. Hace clic en **"Ver Resumen"**.
3. Se renderiza `Resumen` con los datos ingresados.
4. Puede hacer clic en **"Generar PDF"** para exportarlo.

---

## 📤 Exportación a PDF

La exportación usa `html2canvas` para capturar visualmente el contenido del DOM y convertirlo a imagen. Luego, `jsPDF` genera un PDF con fondo negro y aplica márgenes personalizados para mantener el estilo profesional.

El archivo se descarga como:

```
resumen_presupuesto.pdf
```

---

## 🧾 Scripts disponibles

```bash
npm start       # Ejecuta en modo desarrollo
npm run build   # Compila para producción
npm test        # Lanza los tests (si se agregan)
npm run eject   # Expone la configuración de webpack
```

---

## 🎯 Posibles mejoras

- Añadir backend para guardar presupuestos.
- Integración con WhatsApp o email para enviar el PDF automáticamente.
- Soporte para agregar más ítems de servicio.
- Diseño en modo claro/oscuro según preferencia del usuario.

---

## 🧑‍💻 Autor

Desarrollado como solución práctica para presupuestar servicios mecánicos de forma rápida, visual y exportable.

---

