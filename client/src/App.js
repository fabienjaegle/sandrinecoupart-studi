import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/admin/Dashboard";
import CreatePatient from "./components/pages/admin/CreatePatient";
import CreateRecipe from "./components/pages/admin/CreateRecipe";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Recipes from "./components/pages/Recipes";
import Recipe from "./components/pages/Recipe";
import Contact from "./components/pages/Contact";
import Terms from "./components/pages/Terms";
import Policy from "./components/pages/Policy";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './IcoFont.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
        <Route path="/recipe/:id" element={<Recipe /> }></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin" element={<Dashboard />}></Route>
        <Route path="/admin/createPatient" element={<CreatePatient />}></Route>
        <Route path="/admin/createRecipe" element={<CreateRecipe />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/private-policy" element={<Policy />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
