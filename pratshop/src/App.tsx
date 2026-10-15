
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Capcalera from './components/Capcalera';
import Cataleg from './pagines/Cataleg';
import Inici from './pagines/Inici';
import DetallProducte from './pagines/DetallProducte';
import { ProveidorCarro, useCarro } from './context/ContextCarro';
import Carro from './pagines/Carro';
import Compra from './pagines/Compra';
import Confirmacio from './pagines/Confirmacio';
import NoTrobada from './pagines/NoTrobada';


function Distribucio() {
  const { unitatsCarro } = useCarro();

  return (
    <>
      <Capcalera unitatsCarro={unitatsCarro} />
      <Outlet />
      <footer className="peu-pagina">
        <p>VerdeVivo · Una llar més natural 🌿</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <ProveidorCarro>
      <BrowserRouter>
        <Routes>
          <Route element={<Distribucio />}>
            <Route path="/" element={<Inici />} />
            <Route path="/cataleg" element={<Cataleg />} />
            <Route
              path="/producte/:id"
              element={<DetallProducte />}
            />
            <Route
              path="/carro"
              element={<Carro />} />
            <Route
              path="/compra"
              element={<Compra />} />
            <Route
              path="/confirmacio"
              element={<Confirmacio />} />
            <Route
              path="*"
              element={<NoTrobada />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProveidorCarro>
  );
}
