import api from "./api";
const getUsers = () => {
  return api.get("/users");
}
const getPatients = () => {
  return api.get("/patients");
}
const getPatient = (id) => {
  return api.get(`/patients/${id}`)
}
const updatePatient = (values) => {
  return api.put("/patients/update", {
    lastname: values.lastname,
    firstname: values.firstname,
    email: values.email,
    username: values.username,
    //password: values.password,
    //confPassword: values.confPassword,
    allergens: values.allergens,
    diets: values.diets
  })
}
const deletePatient = (id) => {
  return api.delete(`/patients/delete/${id}`);
}
const getAllergens = () => {
  return api.get("/allergens");
}
const getDiets = () => {
  return api.get("/diets");
}
const getRecipes = () => {
  return api.get("/recipes");
}
const getRecipe = (id) => {
  return api.get(`/recipes/${id}`);
}
const updateRecipe = (values) => {
  return api.put("/recipes/update", {
    id: values.id,
    title: values.title,
    description: values.description,
    ingredients: values.ingredients,
    directions: values.directions,
    prepTimeInMinutes: values.prepTimeInMinutes,
    cookTimeInMinutes: values.cookTimeInMinutes,
    restTimeInMinutes: values.restTimeInMinutes,
    forPatient: values.forPatient,
    allergens: values.allergens,
    diets: values.diets
  })
}
const postNewUser = (values) => {
  return api.post("/user", {
    lastname: values.lastname,
    firstname: values.firstname,
    email: values.email,
    username: values.username,
    password: values.password,
    confPassword: values.confPassword,
    isPatient: values.isPatient,
    allergens: values.allergens,
    diets: values.diets
  });
}
const postNewReview = (values) => {
  return api.post("/review", {
    name: values.name,
    comment: values.comment,
    rate: values.rate,
    recipeid: values.recipeid
  })
}
const postNewContact = (values) => {
  return api.post("/contact", {
    values: values
  })
}
const UserService = {
  getUsers,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
  getAllergens,
  getDiets,
  getRecipes,
  getRecipe,
  updateRecipe,
  postNewUser,
  postNewReview,
  postNewContact
};
export default UserService;