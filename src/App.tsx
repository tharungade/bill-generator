import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav  from './components/Nav';
import Products from './components/Products';
import GenerateBill from './components/GenerateBill';


function App() {
  return (
    <>
      <Nav></Nav>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Products />} />
          <Route path="generatebill" element={<GenerateBill />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
