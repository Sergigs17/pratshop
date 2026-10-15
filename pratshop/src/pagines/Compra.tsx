
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarro } from '../context/ContextCarro';
import estils from './Compra.module.css';

type Errors = {
  nom?: string;
  email?: string;
  adreca?: string;
  codiPostal?: string;
  pagament?: string;
  condicions?: string;
};

export default function Compra() {
  const { linies, buidarCarro } = useCarro();
  const navegar = useNavigate();

  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [adreca, setAdreca] = useState('');
  const [codiPostal, setCodiPostal] = useState('');
  const [pagament, setPagament] = useState('');
  const [condicions, setCondicions] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const total = linies.reduce(
    (suma, linia) =>
      suma + linia.producte.preu * linia.quantitat,
    0,
  );

  const enviarCompra = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nousErrors: Errors = {};

    if (nom.trim().length < 2) {
      nousErrors.nom = 'Introdueix el teu nom complet.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nousErrors.email = 'Introdueix un correu electrònic vàlid.';
    }

    if (adreca.trim().length < 5) {
      nousErrors.adreca = 'Introdueix una adreça vàlida.';
    }

    if (!/^\d{5}$/.test(codiPostal)) {
      nousErrors.codiPostal = 'El codi postal ha de tenir 5 xifres.';
    }

    if (!pagament) {
      nousErrors.pagament = 'Selecciona un mètode de pagament.';
    }

    if (!condicions) {
      nousErrors.condicions = 'Has d’acceptar les condicions.';
    }

    setErrors(nousErrors);

    if (Object.keys(nousErrors).length > 0) return;

    const numeroComanda = `VV-${Date.now().toString().slice(-6)}`;

    buidarCarro();

    navegar('/confirmacio', {
      state: {
        numeroComanda,
        nom,
        email,
        total,
      },
    });
  };

  if (linies.length === 0) {
    return (
      <main className={estils.pagina}>
        <h1>Finalitzar la compra</h1>
        <p>El teu carro està buit.</p>
        <Link to="/cataleg">Tornar al catàleg</Link>
      </main>
    );
  }

  return (
    <main className={estils.pagina}>
      <h1>Finalitzar la compra</h1>
      <p className={estils.intro}>
        Completa les teves dades per preparar la comanda.
      </p>

      <form className={estils.formulari} onSubmit={enviarCompra} noValidate>
        <label>
          Nom complet
          <input
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.nom)}
          />
          {errors.nom && <span>{errors.nom}</span>}
        </label>

        <label>
          Correu electrònic
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span>{errors.email}</span>}
        </label>

        <label>
          Adreça
          <input
            value={adreca}
            onChange={(event) => setAdreca(event.target.value)}
            autoComplete="street-address"
            aria-invalid={Boolean(errors.adreca)}
          />
          {errors.adreca && <span>{errors.adreca}</span>}
        </label>

        <label>
          Codi postal
          <input
            inputMode="numeric"
            value={codiPostal}
            onChange={(event) =>
              setCodiPostal(event.target.value.replace(/\D/g, '').slice(0, 5))
            }
            autoComplete="postal-code"
            maxLength={5}
            aria-invalid={Boolean(errors.codiPostal)}
          />
          {errors.codiPostal && <span>{errors.codiPostal}</span>}
        </label>

        <label>
          Mètode de pagament
          <select
            value={pagament}
            onChange={(event) => setPagament(event.target.value)}
            aria-invalid={Boolean(errors.pagament)}
          >
            <option value="">Selecciona una opció</option>
            <option value="targeta">Targeta</option>
            <option value="contrareemborsament">
              Pagament a l’entrega
            </option>
          </select>
          {errors.pagament && <span>{errors.pagament}</span>}
        </label>

        <label className={estils.condicions}>
          <input
            type="checkbox"
            checked={condicions}
            onChange={(event) => setCondicions(event.target.checked)}
          />
          Accepto les condicions de compra.
        </label>
        {errors.condicions && <span>{errors.condicions}</span>}

        <p className={estils.total}>
          Total de la comanda:{' '}
          {total.toLocaleString('ca-ES', {
            style: 'currency',
            currency: 'EUR',
          })}
        </p>

        <button className={estils.boto} type="submit">
          Confirmar la compra
        </button>
      </form>
    </main>
  );
}
