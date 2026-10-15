
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import type { Producte, LiniaCarro } from '../tipus';

type ContextCarroTipus = {
  linies: LiniaCarro[];
  unitatsCarro: number;
  afegirProducte: (producte: Producte) => void;
  canviarQuantitat: (id: string, quantitat: number) => void;
  eliminarProducte: (id: string) => void;
  buidarCarro: () => void;
};

const ContextCarro = createContext<ContextCarroTipus | undefined>(
  undefined,
);

export function ProveidorCarro({ children }: { children: ReactNode }) {
  const [linies, setLinies] = useState<LiniaCarro[]>(() => {
    try {
      const guardat = localStorage.getItem('verdevivo-carro');
      return guardat ? (JSON.parse(guardat) as LiniaCarro[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('verdevivo-carro', JSON.stringify(linies));
    } catch {
      // El carro continua funcionant encara que no es pugui desar.
    }
  }, [linies]);

  const afegirProducte = (producte: Producte) => {
    if (producte.estoc <= 0) return;

    setLinies((actuals) => {
      const existent = actuals.find(
        (linia) => linia.producte.id === producte.id,
      );

      if (existent) {
        return actuals.map((linia) =>
          linia.producte.id === producte.id
            ? {
                ...linia,
                quantitat: Math.min(
                  linia.quantitat + 1,
                  producte.estoc,
                ),
              }
            : linia,
        );
      }

      return [...actuals, { producte, quantitat: 1 }];
    });
  };

  const canviarQuantitat = (id: string, quantitat: number) => {
    setLinies((actuals) =>
      actuals
        .map((linia) =>
          linia.producte.id === id
            ? {
                ...linia,
                quantitat: Math.max(
                  1,
                  Math.min(quantitat, linia.producte.estoc),
                ),
              }
            : linia,
        )
        .filter((linia) => linia.producte.estoc > 0),
    );
  };

  const eliminarProducte = (id: string) => {
    setLinies((actuals) =>
      actuals.filter((linia) => linia.producte.id !== id),
    );
  };

  const buidarCarro = () => setLinies([]);

  const unitatsCarro = linies.reduce(
    (total, linia) => total + linia.quantitat,
    0,
  );

  return (
    <ContextCarro.Provider
      value={{
        linies,
        unitatsCarro,
        afegirProducte,
        canviarQuantitat,
        eliminarProducte,
        buidarCarro,
      }}
    >
      {children}
    </ContextCarro.Provider>
  );
}

export function useCarro() {
  const context = useContext(ContextCarro);

  if (!context) {
    throw new Error('useCarro s’ha d’utilitzar dins de ProveidorCarro');
  }

  return context;
}
