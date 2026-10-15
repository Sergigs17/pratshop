
import { Link, useLocation, Navigate } from 'react-router-dom';
import estils from './Confirmacio.module.css';

type DadesComanda = {
  numeroComanda: string;
  nom: string;
  email: string;
  total: number;
};

export default function Confirmacio() {
  const location = useLocation();
  const comanda = location.state as DadesComanda | null;

  if (!comanda?.numeroComanda) {
    return <Navigate to="/cataleg" replace />;
  }

  return (
    <main className={estils.pagina}>
      <section className={estils.targeta}>
        <div className={estils.icona} aria-hidden="true">✓</div>

        <p className={estils.etiqueta}>VERDEVIVO · COMANDA REBUDA</p>
        <h1>Gràcies per la teva compra, {comanda.nom}!</h1>
        <p className={estils.missatge}>
          La teva comanda s’ha registrat correctament.
          Hem preparat aquest resum perquè el puguis consultar.
        </p>

        <div className={estils.resum}>
          <p>
            <span>Número de comanda</span>
            <strong>{comanda.numeroComanda}</strong>
          </p>
          <p>
            <span>Correu electrònic</span>
            <strong>{comanda.email}</strong>
          </p>
          <p>
            <span>Total de la compra</span>
            <strong>
              {comanda.total.toLocaleString('ca-ES', {
                style: 'currency',
                currency: 'EUR',
              })}
            </strong>
          </p>
        </div>

        <Link className={estils.boto} to="/cataleg">
          Tornar al catàleg
        </Link>
      </section>
    </main>
  );
}
