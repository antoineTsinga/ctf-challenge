const axios = require("axios");
const jwt = require("jsonwebtoken");

const api = "http://localhost:8080/api";

const secretKey = "mysecretkey";

const payload = {
  id: "63cea314be2a341d0abdb80e",
  role: "user",
};

const options = {
  expiresIn: "1d",
};
const token = jwt.sign(payload, secretKey, options);

//get user
axios
  .get(api + "/users/63cea314be2a341d0abdb80e", {
    headers: { Authorization: token },
  })
  .then((response) => {
    const user = response.data;
    console.log(user);
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
{
  $gt: "";
}

axios
  .get(api + "/users/63cea314be2a341d0abdb80e", {
    headers: { Authorization: token },
  })
  .then((response) => {
    const user = response.data;
    console.log(user);
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
