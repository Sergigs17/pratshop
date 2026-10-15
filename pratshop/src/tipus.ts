export type Categoria = {
  id: string;
  nom: string;
  descripcio: string;
};

export type Producte = {
  id: string;
  nom: string;
  descripcio: string;
  preu: number;
  imatge: string;
  categoriaId: string;
  estoc: number;
};

export type LiniaCarro = {
  producte: Producte;
  quantitat: number;
};