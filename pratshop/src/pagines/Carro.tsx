
import { Link } from 'react-router-dom';
import { useCarro } from '../context/ContextCarro';
import estils from './Carro.module.css';

export default function Carro() {
  const {
    linies,
    canviarQuantitat,
    eliminarProducte,
    buidarCarro,
  } = useCarro();

  const total = linies.reduce(
    (suma, linia) =>
      suma + linia.producte.preu * linia.quantitat,
    0,
  );

  const formatPreu = (preu: number) =>
    preu.toLocaleString('ca-ES', {
      style: 'currency',
      currency: 'EUR',
    });

  if (linies.length === 0) {
    return (
      <main className={estils.pagina}>
        <h1>El teu carro</h1>
        <p>Encara no has afegit cap producte.</p>
        <Link className={estils.boto} to="/cataleg">
          Descobrir productes
        </Link>
      </main>
    );
  }

  return (
    <main className={estils.pagina}>
      <h1>El teu carro</h1>

      <div className={estils.llista}>
        {linies.map((linia) => (
          <article
            className={estils.linia}
            key={linia.producte.id}
          >
            <img
              className={estils.imatge}
              src={linia.producte.imatge}
              alt={linia.producte.nom}
            />

            <div className={estils.info}>
              <h2>{linia.producte.nom}</h2>
              <p>{formatPreu(linia.producte.preu)}</p>

              <label>
                Quantitat
                <select
                  value={linia.quantitat}
                  onChange={(event) =>
                    canviarQuantitat(
                      linia.producte.id,
                      Number(event.target.value),
                    )
                  }
                >
                  {Array.from(
                    { length: linia.producte.estoc },
                    (_, index) => index + 1,
                  ).map((quantitat) => (
                    <option key={quantitat} value={quantitat}>
                      {quantitat}
                    </option>
                  ))}
                </select>
              </label>

              <p>
                Subtotal:{' '}
                {formatPreu(
                  linia.producte.preu * linia.quantitat,
                )}
              </p>

              <button
                className={estils.enllacEliminar}
                type="button"
                onClick={() =>
                  eliminarProducte(linia.producte.id)
                }
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className={estils.resum}>
        <button
          className={estils.enllacEliminar}
          type="button"
          onClick={buidarCarro}
        >
          Buidar el carro
        </button>

        <p className={estils.total}>
          Total: {formatPreu(total)}
        </p>

        <Link className={estils.boto} to="/compra">
          Continuar amb la compra
        </Link>
      </section>
    </main>
  );
}
