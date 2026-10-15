
import { Link } from 'react-router-dom';
import estils from './NoTrobada.module.css';

export default function NoTrobada() {
  return (
    <main className={estils.pagina}>
      <section className={estils.targeta}>
        <span className={estils.codi}>404</span>
        <p className={estils.etiqueta}>VERDEVIVO · CAMÍ NO TROBAT</p>

        <h1>Ups! Ens hem perdut entre les fulles.</h1>

        <p className={estils.missatge}>
          Sembla que aquesta pàgina no existeix o que l’enllaç ja no està disponible.
          Però no pateixis, encara podem tornar a trobar el camí.
        </p>

        <div className={estils.accions}>
          <Link className={estils.boto} to="/cataleg">
            Explorar el catàleg
          </Link>

          <Link className={estils.enllac} to="/">
            Tornar a l’inici
          </Link>
        </div>

        <span className={estils.decoracio} aria-hidden="true">🌿</span>
      </section>
    </main>
  );
}
