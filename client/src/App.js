import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Recipes from "./components/pages/Recipes";
import Recipe from "./components/pages/Recipe";
import Contact from "./components/pages/Contact";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './IcoFont.css';
import './Main.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
        <Route path="/recipe/:id" element={<Recipe /> }></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/terms" element={<Home />}></Route>
        <Route path="/private-policy" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
