import { useState } from "react";

export function FormularioContacto() {
  const [mensaje, setMensaje] = useState("");

  const handleEnviar = () => {
    setMensaje("Mensaje enviado correctamente ✅");
  };

  return (
    <div className="shadow p-5 rounded-4" style={{ background: "#f4f4f4" }}>
      
      <h3 className="text-center">Contáctanos</h3>

      <input className="form-control mb-3" placeholder="Nombre" />
      <input className="form-control mb-3" placeholder="Correo" />
      <textarea className="form-control mb-3" placeholder="Mensaje"></textarea>

      <button className="btn btn-warning" onClick={handleEnviar}>
        Enviar
      </button>

      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
    </div>
  );
}