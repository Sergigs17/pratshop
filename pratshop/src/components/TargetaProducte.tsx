import { Link } from 'react-router-dom';
import type { Producte } from '../tipus';
import styles from './TargetaProducte.module.css';

type TargetaProducteProps = {
  producte: Producte;
};

const formatPreu = (preu: number) =>
  new Intl.NumberFormat('ca-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(preu);

export default function TargetaProducte({
  producte,
}: TargetaProducteProps) {
  const esgotat = producte.estoc === 0;

  return (
    <article className={styles.targeta}>
      <Link
        to={`/producte/${producte.id}`}
        className={styles.enllacImatge}
        aria-label={`Veure ${producte.nom}`}
      >
        <img
          className={styles.imatge}
          src={producte.imatge}
          alt={producte.nom}
          loading="lazy"
        />
        {esgotat && (
          <span className={styles.etiquetaEsgotat}>Esgotat</span>
        )}
      </Link>

      <div className={styles.cos}>
        <p className={styles.categoria}>
          {producte.categoriaId}
        </p>
        <h2 className={styles.nom}>{producte.nom}</h2>
        <p className={styles.descripcio}>{producte.descripcio}</p>

        <div className={styles.peu}>
          <strong className={styles.preu}>
            {formatPreu(producte.preu)}
          </strong>

          <Link
            to={`/producte/${producte.id}`}
            className={styles.boto}
            aria-label={`Veure detall de ${producte.nom}`}
          >
            {esgotat ? 'Veure detall' : 'Descobrir'}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </article>
  );
}