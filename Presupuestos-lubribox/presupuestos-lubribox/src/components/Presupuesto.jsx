import React, { useState } from "react";
import jsPDF from "jspdf";
import { renderToString } from "react-dom/server";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la navegación
import Resumen from "./Resumen";
import './Presupuesto.css';

const Presupuesto = () => {
  const navigate = useNavigate(); // Inicializar useNavigate para navegar a otra vista
  const [formData, setFormData] = useState({
    fecha: "",
    modelo: "",
    patente: "",
    lubricanteCantidad: 1,
    lubricanteMonto: 0,
    lineaCuidadoCantidad: 1,
    lineaCuidadoMonto: 0,
    filtroAceiteCantidad: 1,
    filtroAceiteMonto: 0,
    filtroAireCantidad: 1,
    filtroAireMonto: 0,
    filtroCombustibleCantidad: 1,
    filtroCombustibleMonto: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const calcularTotal = () => {
    const total = [
      formData.lubricanteCantidad * formData.lubricanteMonto,
      formData.lineaCuidadoCantidad * formData.lineaCuidadoMonto,
      formData.filtroAceiteCantidad * formData.filtroAceiteMonto,
      formData.filtroAireCantidad * formData.filtroAireMonto,
      formData.filtroCombustibleCantidad * formData.filtroCombustibleMonto
    ].reduce((acc, val) => acc + parseFloat(val || 0), 0);
    return total.toFixed(2);
  };
  
  const generarPDF = () => {
    const dataWithTotal = { ...formData, total: calcularTotal() };
    const resumenHTML = renderToString(<Resumen formData={dataWithTotal} />);

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.html(resumenHTML, {
      callback: function (pdf) {
        pdf.save("presupuesto_lubribox.pdf");
      },
      x: 10,
      y: 10,
      html2canvas: { scale: 0.5 },
    });
  };

  const verResumen = () => {
    const dataWithTotal = {
      ...formData,
      total: calcularTotal(),
      lineaCuidadoSubtotal: formData.lineaCuidadoCantidad * formData.lineaCuidadoMonto,
      filtroAceiteSubtotal: formData.filtroAceiteCantidad * formData.filtroAceiteMonto,
      filtroAireSubtotal: formData.filtroAireCantidad * formData.filtroAireMonto,
      filtroCombustibleSubtotal: formData.filtroCombustibleCantidad * formData.filtroCombustibleMonto,
    };
    navigate("/resumen", { state: { formData: dataWithTotal } });
  };
  

  return (
    <div className="container">
      <div className="pdf-content">
        <div className="header">
          <h1 className="servicio">SERVICIO</h1>
          <h1 className="especializado">ESPECIALIZADO</h1>
          <img src={`${process.env.PUBLIC_URL}/lubribox.jpg`} alt="Logo" className="logo" />
        </div>

        <form className="service-form">
          <h2>Presupuesto para tu servicio</h2>
          <div className="form-row-group">
            <div className="form-row">
              <label>Fecha:</label>
              <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <label>Modelo:</label>
              <input type="text" name="modelo" placeholder="Modelo" value={formData.modelo} onChange={handleInputChange} />
            </div>
            <div className="form-row">
              <label>Patente:</label>
              <input type="text" name="patente" placeholder="Patente" value={formData.patente} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Lubricante:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <input type="number" name="lineaCuidadoCantidad" placeholder="Cant" value={formData.lineaCuidadoCantidad} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 3)} style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <input type="number" name="lineaCuidadoMonto" placeholder="Monto $" value={formData.lineaCuidadoMonto} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 8)} style={{ width: '100%' }} />
            </div>
          </div>

          <div className="form-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Filtro de<br />Aceite:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <input type="number" name="filtroAceiteCantidad" placeholder="Cant" value={formData.filtroAceiteCantidad} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 3)} style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <input type="number" name="filtroAceiteMonto" placeholder="Monto $" value={formData.filtroAceiteMonto} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 8)} style={{ width: '100%' }} />
            </div>
          </div>

          <div className="form-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Filtro de<br />Aire:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <input type="number" name="filtroAireCantidad" placeholder="Cant" value={formData.filtroAireCantidad} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 3)} style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <input type="number" name="filtroAireMonto" placeholder="Monto $" value={formData.filtroAireMonto} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 8)} style={{ width: '100%' }} />
            </div>
          </div>

          <div className="form-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <label>Filtro de<br />Combustible:</label>
            </div>
            <div style={{ flex: 0.5, paddingRight: '10px' }}>
              <input type="number" name="filtroCombustibleCantidad" placeholder="Cant" value={formData.filtroCombustibleCantidad} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 3)} style={{ width: '100%' }} />
            </div>
            <div style={{ flex: 1 }}>
              <input type="number" name="filtroCombustibleMonto" placeholder="Monto $" value={formData.filtroCombustibleMonto} onChange={handleInputChange} onInput={(e) => e.target.value = e.target.value.slice(0, 8)} style={{ width: '100%' }} />
            </div>
          </div>

          <div className="form-total">
            <h3>Total: ${calcularTotal()}</h3>
          </div>
        </form>
      </div>
  {/* <button onClick={generarPDF} className="pdf-button">Generar PDF</button>*/ }  
      <button onClick={verResumen} className="pdf-button">Ver Resumen</button> {/* Botón para ver la vista Resumen */}
    </div>
  );
};

export default Presupuesto;
