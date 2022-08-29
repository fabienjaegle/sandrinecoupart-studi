import api from "./api";
const getUsers = () => {
  return api.get("/users");
}
const getAllergens = () => {
  return api.get("/allergens");
}
const getDiets = () => {
  return api.get("/diets");
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
const UserService = {
  getUsers,
  getAllergens,
  getDiets,
  postNewUser
};
export default UserService;