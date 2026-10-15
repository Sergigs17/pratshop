import { Link, NavLink } from 'react-router-dom';
import styles from './Capcalera.module.css';

type CapcaleraProps = {
  unitatsCarro: number;
};

export default function Capcalera({ unitatsCarro }: CapcaleraProps) {
  return (
    <header className={styles.capcalera}>
      <div className={styles.contingut}>
        <Link to="/" className={styles.marca}>
          <span className={styles.icona} aria-hidden="true">🌿</span>
          <span>
            <strong>VerdeVivo</strong>
            <small>Una llar més natural</small>
          </span>
        </Link>

        <nav className={styles.navegacio} aria-label="Navegació principal">
          <NavLink
            to="/cataleg"
            className={({ isActive }) =>
              isActive ? styles.actiu : styles.enllac
            }
          >
            Catàleg
          </NavLink>

          <NavLink
            to="/carro"
            className={({ isActive }) =>
              isActive ? styles.actiu : styles.enllac
            }
          >
            Carro
            {unitatsCarro > 0 && (
              <span className={styles.insignia}>{unitatsCarro}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}