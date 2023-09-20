const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/bfhl', (req, res) => {
  res.json({"operation_code": 1});
});

function getHighestAlphabet(alphabets) {
  if (alphabets.length === 0) {
    return [];
  }

  const highestAlphabets = [];
  let highest = alphabets[0].toLowerCase();

  for (const alphabet of alphabets) {
    const current = alphabet.toLowerCase();
    if (current === highest) {
      highestAlphabets.push(alphabet);
    } else if (current > highest) {
      highestAlphabets.length = 0;
      highest = current;
      highestAlphabets.push(alphabet);
    }
  }

  return highestAlphabets;
}

function extractNumbers(inputString) {
  const numbers = [];

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (/[0-9]/.test(char)) {
      numbers.push(char);
    }
  }

  return numbers;
}

function extractAlphabets(inputString) {
  const alphabets = [];

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    if (/[a-zA-Z]/.test(char)) {
      alphabets.push(char);
    }
  }

  return alphabets;
}

exports.handler = async (event, context) => {
  if (event.httpMethod === "GET") {
    // Handle the GET request here
    return {
      statusCode: 200,
      body: JSON.stringify({"operation_code": 1})
    };
  } else if (event.httpMethod === "POST") {
    // Handle the POST request here
    const data = JSON.parse(event.body);

    if (!data || !Array.isArray(data["data"])) {
      return {
        statusCode: 400,
        body: JSON.stringify({ is_success: false, error: 'Invalid Input.' })
      };
    }

    try {
      const numbers = extractNumbers(data["data"]);
      const alpha = extractAlphabets(data["data"]);
      const highestAlphabet = getHighestAlphabet(alpha);

      const response = {
        is_success: true,
        user_id: "shreyansh_23032002",
        email: "sk1229@srmist.edu.in",
        roll_number: "RA2011033010008",
        numbers: numbers,
        alphabets: alpha,
        highest_alphabet: highestAlphabet
      };

      return {
        statusCode: 200,
        body: JSON.stringify(response)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ is_success: false, error: 'Internal Error.' })
      };
    }
  } else {
    return {
      statusCode: 405, // Method Not Allowed
      body: JSON.stringify({ error: 'Method not allowed.' })
    };
  }
};
