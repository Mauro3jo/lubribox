import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './Presupuesto.css';

const Resumen = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};
  const pdfRef = useRef(); // Referencia al contenedor para el PDF

  const {
    fecha = '',
    modelo = '',
    patente = '',
    lineaCuidadoCantidad = 0,
    lineaCuidadoMonto = 0,
    lineaCuidadoSubtotal = 0,
    filtroAceiteCantidad = 0,
    filtroAceiteMonto = 0,
    filtroAceiteSubtotal = 0,
    filtroAireCantidad = 0,
    filtroAireMonto = 0,
    filtroAireSubtotal = 0,
    filtroCombustibleCantidad = 0,
    filtroCombustibleMonto = 0,
    filtroCombustibleSubtotal = 0,
    total = 0,
  } = formData;

  const generarPDF = async () => {
    const input = pdfRef.current; // Referencia al contenedor

    // Ocultar temporalmente el botón
    const pdfButton = document.querySelector(".pdf-button");
    pdfButton.style.display = "none";

    // Capturar la página con html2canvas
    const canvas = await html2canvas(input, {
      backgroundColor: "#000", // Fondo negro para la captura
      scale: 2, // Alta resolución
    });

    const imgData = canvas.toDataURL("image/png"); // Convertir canvas a imagen
    const pdf = new jsPDF("p", "mm", "a4");

    // Dibujar fondo negro en la hoja del PDF
    pdf.setFillColor(0, 0, 0); // Establecer el color de relleno a negro
    pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), "F"); // Rellenar la página

    // Ajustar dimensiones de la imagen al tamaño de página con márgenes
    const margin = 30; // Márgenes laterales e inferior (3 cm)
    const imgWidth = 210 - margin * 2; // Ancho del PDF menos márgenes laterales
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Insertar la imagen con márgenes y parte superior pegada
    pdf.addImage(imgData, "PNG", margin, 0, imgWidth, imgHeight);
    pdf.save("resumen_presupuesto.pdf");

    // Restaurar el botón
    pdfButton.style.display = "block";
  };

  return (
    <div className="container" style={{ backgroundColor: "black", color: "white" }}>
      {/* Contenedor que será capturado para el PDF */}
      <div className="pdf-content" ref={pdfRef}>
        <div className="header">
          <h1 className="servicio">SERVICIO</h1>
          <h1 className="especializado">ESPECIALIZADO</h1>
          <img src={`${process.env.PUBLIC_URL}/lubribox.jpg`} alt="Logo" className="logo" />
        </div>

        <div className="service-form">
        <h2>Presupuesto para tu servicio</h2>
        <div className="form-row-group">
            <div className="form-row">
              <label>Fecha:</label>
              <span style={{ color: "black" }}>{fecha}</span>
            </div>
            <div className="form-row">
              <label>Modelo:</label>
              <span style={{ color: "black" }}>{modelo}</span>
            </div>
            <div className="form-row">
              <label>Patente:</label>
              <span style={{ color: "black" }}>{patente}</span>
            </div>
          </div>

          <div className="form-row">
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Lubricante:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <span style={{ color: "black" }}>{lineaCuidadoCantidad}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>${lineaCuidadoMonto}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>Subtotal: ${lineaCuidadoSubtotal}</span>
            </div>
          </div>

          <div className="form-row">
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Filtro de<br />Aceite:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <span style={{ color: "black" }}>{filtroAceiteCantidad}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>${filtroAceiteMonto}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>Subtotal: ${filtroAceiteSubtotal}</span>
            </div>
          </div>

          <div className="form-row">
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Filtro de<br />Aire:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <span style={{ color: "black" }}>{filtroAireCantidad}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>${filtroAireMonto}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>Subtotal: ${filtroAireSubtotal}</span>
            </div>
          </div>

          <div className="form-row">
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Filtro de<br />Combustible:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <span style={{ color: "black" }}>{filtroCombustibleCantidad}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>${filtroCombustibleMonto}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ color: "black" }}>Subtotal: ${filtroCombustibleSubtotal}</span>
            </div>
          </div>

          <div className="form-total">
            <h3>Total: ${total}</h3>
          </div>
        </div>
      </div>

      {/* Botón para generar el PDF */}
      <button onClick={generarPDF} className="pdf-button">
        Generar PDF
      </button>
    </div>
  );
};

export default Resumen;
