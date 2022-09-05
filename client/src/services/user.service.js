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
const postNewReview = (values) => {
  return api.post("/review", {
    name: values.name,
    comment: values.comment,
    rate: values.rate,
    recipeid: values.recipeid
  })
}
const UserService = {
  getUsers,
  getAllergens,
  getDiets,
  postNewUser,
  postNewReview
};
export default UserService;