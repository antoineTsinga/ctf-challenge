const axios = require("axios");
const request = require("request");

const url = "http://localhost:8080/api/customer/";

const customerId = {
  $where: "function() { return this.creditCardNumber !== undefined; }",
};

const options = {
  method: "GET",
  json: true,
  qs: { username: customerId },
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2VmNGU3YWIzZDJlMmIzM2FiMmI0MSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjc0NTA3NzEyLCJleHAiOjE2NzQ1OTQxMTJ9.Tai9BGC5gI5oAE9Vo3vO1cfKdoDKjaCfYFwCnQpKxfY",
  },
};

request(url, options, (error, response, body) => {
  console.log(response);
});

/*
axios.get(url, options, (error, response, body) => {
  console.log(response);
});
*/
