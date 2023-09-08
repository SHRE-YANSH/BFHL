const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000

app.use(bodyParser.json());

app.get('/bfhl', (req, res)=>{
    res.json({"operation_code": 1});
})

function getHighestAlphabet(alphabets) {
    if (alphabets.length === 0) {
      return null;
    }
    return alphabets.reduce((highest, current) => {
      return current > highest ? current : highest;
    });
  }

  function extractNumbers(inputString) {
    const numbers = [];
  
    for (let i = 0; i < inputString.length; i++) {
      const char = inputString[i];
      if (/[0-9]/.test(char)) {
        // If it's a number, add it to the numbers list
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
app.post('/bfhl', (req, res) => {
    const data = req.body
    const numbers = extractNumbers(data["data"])
    const alpha = extractAlphabets(data["data"])
    // console.log(data["data"])
    const highestAlphabet = getHighestAlphabet(alpha)
    const response = 
    {
        "is_success": true,
        "user_id": "shreyansh_23032002",
        "email": "sk1229@srmist.edu.in",
        "roll_number": "RA2011033010008",
        "numbers": numbers,
        "alphabets": alpha,
        "highest_alphabet": highestAlphabet
        }
    res.json(response)
})
app.listen(PORT,() => {
  console.log(`connected at port ${PORT}`);
});
