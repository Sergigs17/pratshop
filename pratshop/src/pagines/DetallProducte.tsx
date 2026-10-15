
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { productes } from '../dades/productes';
import estils from './DetallProducte.module.css';
import { useCarro } from '../context/ContextCarro';

export default function DetallProducte() {
  const { id } = useParams();
  const navegar = useNavigate();
  const { afegirProducte } = useCarro();
  const producte = productes.find((item) => item.id === id);
  if (!producte) {
    return <Navigate to="/no-trobat" replace />;
  }

  return (
    <main className={estils.pagina}>
      <button
        className={estils.tornar}
        type="button"
        onClick={() => navegar(-1)}
      >
        ← Tornar enrere
      </button>

      <section className={estils.producte}>
        <div className={estils.imatge}>
          <img src={producte.imatge} alt={producte.nom} />
        </div>

        <div className={estils.info}>
          <p className={estils.etiqueta}>
            VERDEVIVO · NATURA A CASA
          </p>

          <h1>{producte.nom}</h1>

          <p className={estils.descripcio}>
            {producte.descripcio}
          </p>

          <p className={estils.preu}>
            {producte.preu.toLocaleString('ca-ES', {
              style: 'currency',
              currency: 'EUR',
            })}
          </p>

          <p className={estils.estoc}>
            {producte.estoc > 0
              ? `✓ ${producte.estoc} unitats disponibles`
              : 'Producte esgotat'}
          </p>


        <button
        className={estils.afegir}
        type="button"
        disabled={producte.estoc === 0}
        onClick={() => afegirProducte(producte)}
        >
        {producte.estoc === 0 ? 'Producte esgotat' : 'Afegir al carro'}
        </button>


          <p className={estils.nota}>
            🌿 Un toc de natura per a casa teva
          </p>

          <Link className={estils.enllac} to="/cataleg">
            ← Tornar al catàleg
          </Link>
        </div>
      </section>
    </main>
  );
}
