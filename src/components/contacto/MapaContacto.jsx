export function MapaContacto() {
  return (
    <div className="shadow p-5 rounded-4 mt-5">
      <h3 className="text-center">Visítanos</h3>

      <iframe
  width="100%"
  height="300"
  style={{ border: 0, borderRadius: "20px" }}
  loading="lazy"
  allowFullScreen
  src="https://www.google.com/maps?q=Armenia,Quindio,Colombia&output=embed"
></iframe>

      <p className="text-center mt-3">
        Armenia - Quindío
      </p>

      <a style={{textDecoration: "none", display: "block", textAlign: "center", color: "#ec4c02"}}
  href="https://www.google.com/maps?q=Armenia,Quindio,Colombia"
  target="_blank"
  rel="noopener noreferrer"
>
  Ver en Google Maps
</a>
    </div>
  );
}