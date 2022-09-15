import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/admin/Dashboard";
import PatientsList from "./components/pages/admin/patients/PatientsList";
import CreatePatient from "./components/pages/admin/patients/CreatePatient";
import EditPatient from "./components/pages/admin/patients/EditPatient";
import RecipesList from "./components/pages/admin/recipes/RecipesList";
import CreateRecipe from "./components/pages/admin/recipes/CreateRecipe";
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
import EditRecipe from "./components/pages/admin/recipes/EditRecipe";


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
        <Route path="/admin/patients/list" element={<PatientsList />}></Route>
        <Route path="/admin/recipes/list" element={<RecipesList />}></Route>
        <Route path="/admin/patients/add" element={<CreatePatient />}></Route>
        <Route path="/admin/patients/edit/:id" element={<EditPatient />}></Route>
        <Route path="/admin/recipes/add" element={<CreateRecipe />}></Route>
        <Route path="/admin/recipes/edit/:id" element={<EditRecipe />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/private-policy" element={<Policy />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
