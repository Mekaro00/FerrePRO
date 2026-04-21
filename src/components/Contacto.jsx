import { HeroContacto } from "./contacto/HeroContacto";
import { FormularioContacto } from "./contacto/FormularioContacto";
import { MapaContacto } from "./contacto/MapaContacto";

export default function Contacto() {
  return (
    <>
      <HeroContacto />

      <div className="container mt-5" id="informacion">
        <FormularioContacto />
        <MapaContacto />
      </div>
    </>
  );
}