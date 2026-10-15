import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories, productes } from '../dades/productes';
import TargetaProducte from '../components/TargetaProducte';
import styles from './Cataleg.module.css';

export default function Cataleg() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cerca = searchParams.get('cerca') ?? '';
  const categoriaSeleccionada = searchParams.get('categoria') ?? 'totes';

  const productesFiltrats = useMemo(() => {
    const text = cerca.trim().toLocaleLowerCase('ca');

    return productes.filter((producte) => {
      const coincideixText =
        producte.nom.toLocaleLowerCase('ca').includes(text) ||
        producte.descripcio.toLocaleLowerCase('ca').includes(text);

      const coincideixCategoria =
        categoriaSeleccionada === 'totes' ||
        producte.categoriaId === categoriaSeleccionada;

      return coincideixText && coincideixCategoria;
    });
  }, [cerca, categoriaSeleccionada]);

  function actualitzarCerca(novaCerca: string) {
    const nousParams = new URLSearchParams(searchParams);

    if (novaCerca) {
      nousParams.set('cerca', novaCerca);
    } else {
      nousParams.delete('cerca');
    }

    setSearchParams(nousParams);
  }

  function actualitzarCategoria(novaCategoria: string) {
    const nousParams = new URLSearchParams(searchParams);

    if (novaCategoria === 'totes') {
      nousParams.delete('categoria');
    } else {
      nousParams.set('categoria', novaCategoria);
    }

    setSearchParams(nousParams);
  }

  return (
    <main className={styles.pagina}>
      <section className={styles.introduccio}>
        <p className={styles.etiqueta}>NATURA A CASA TEVA</p>
        <h1>Troba el teu racó verd</h1>
        <p>
          Plantes, testos i petits detalls per convertir casa teva
          en un espai més natural.
        </p>
      </section>

      <section className={styles.seccioCataleg} aria-label="Catàleg de productes">
        <div className={styles.capcaleraCataleg}>
          <div>
            <h2>El nostre catàleg</h2>
            <p>Tria les peces que més t&apos;agradin.</p>
          </div>

          <label className={styles.campCerca}>
            <span className={styles.visualmentOcult}>Cerca productes</span>
            <input
              type="search"
              value={cerca}
              onChange={(event) => actualitzarCerca(event.target.value)}
              placeholder="Cerca una planta..."
            />
          </label>
        </div>

        <div className={styles.filtres} aria-label="Filtrar per categoria">
          <button
            type="button"
            className={categoriaSeleccionada === 'totes' ? styles.filtreActiu : styles.filtre}
            onClick={() => actualitzarCategoria('totes')}
          >
            Tots
          </button>

          {categories.map((categoria) => (
            <button
              key={categoria.id}
              type="button"
              className={categoriaSeleccionada === categoria.id ? styles.filtreActiu : styles.filtre}
              onClick={() => actualitzarCategoria(categoria.id)}
            >
              {categoria.nom}
            </button>
          ))}
        </div>

        <p className={styles.resultats} aria-live="polite">
          Es mostren {productesFiltrats.length} de {productes.length} productes
        </p>

        {productesFiltrats.length > 0 ? (
          <div className={styles.quadricula}>
            {productesFiltrats.map((producte) => (
              <TargetaProducte key={producte.id} producte={producte} />
            ))}
          </div>
        ) : (
          <div className={styles.buit}>
            <span aria-hidden="true">🔎</span>
            <h3>No hem trobat cap producte</h3>
            <p>Prova una altra cerca o selecciona una categoria diferent.</p>
            <button
              type="button"
              className={styles.botoNetejar}
              onClick={() => setSearchParams({})}
            >
              Netejar filtres
            </button>
          </div>
        )}
      </section>
    </main>
  );
}