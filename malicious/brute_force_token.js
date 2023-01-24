const request = require("request");
const fs = require("fs");

const jwt = require("jsonwebtoken");

const commonTokensFile = "common_token_secret_key.txt";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2ZiYzcyMDNjMTRkOTQ3MTJkMGY4MCIsInJvbGUiOiJ1c2VyIiwibWVzc2FnZS1jdGYiOiJzdWNjZXNzZnVsbCIsImlhdCI6MTY3NDU1ODYxNiwiZXhwIjoxNjc0NjQ1MDE2fQ.xezkMskhIJ_YGiYmurToCULxFnSxM_bYXO75zO8o6V0";

fs.readFile(commonTokensFile, "utf8", (err, data) => {
  if (err) throw err;

  let commonTokens = data.split("\n");
  commonTokens = commonTokens.map((possiblePasswords) =>
    possiblePasswords.replace("\r", "")
  );

  rec_bf(token, commonTokens, 0);
});

function rec_bf(token, secretKeys, i) {
  if (!secretKeys) {
    console.log("The secret key used to sign the token could not be found");
    return;
  }

  const secret = secretKeys[i];

  try {
    const decoded = jwt.verify(token, secret);
    console.log(`The secret key used to sign the token is: ${secret}`);
    console.log(`Decoded payload: ${JSON.stringify(decoded)}`);
    return;
  } catch (err) {
    if (i == secretKeys.length) {
      rec_bf(token, null, i);
    } else {
      rec_bf(token, secretKeys, i + 1);
    }
  }
}
