export function HeroContacto() {
  return (
    <div className="position-relative">
      <img 
        src="/imagenes/contacto.jpg"
        className="img-fluid w-100"
        style={{ height: "100vh", objectFit: "cover", filter: "blur(2px)" }}
      />

      <div className="position-absolute top-50 start-0 translate-middle-y text-white p-5">
        <h1 className="display-1">
          <span style={{ color: "#2d2d2d", fontWeight: "600", fontSize: "8rem" }}>Ferre</span>
          <span style={{ color: "#ff6600", fontWeight: "600", fontSize: "8rem" }}>Pro</span>
        </h1>

        <p style={{fontSize: "1.7rem", color: "#929090"}}>La construcción del mañana comienza con los mejores aliados.</p>

        <a href="#informacion" className="btn btn-outline-light">
          Contacto
        </a>
      </div>
    </div>
  );
}