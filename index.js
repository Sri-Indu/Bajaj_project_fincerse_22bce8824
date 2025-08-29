const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const fullName = "john_doe"; // <-- change to your full name (lowercase, with underscore)
const dob = "17091999"; // <-- change to ddmmyyyy
const email = "john@xyz.com"; // <-- change to your email
const rollNumber = "ABCD123"; // <-- change to your roll number

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. 'data' must be an array",
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (!isNaN(item)) {
        // numeric string
        let num = parseInt(item);
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // Generate alternating caps string in reverse order
    let concatStr = alphabets.join("");
    concatStr = concatStr.split("").reverse();
    concatStr = concatStr
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    const response = {
      is_success: true,
      user_id: `${fullName}_${dob}`,
      email: email,
      roll_number: rollNumber,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: concatStr,
    };

    return res.status(200).json(response);
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

// root route
app.get("/", (req, res) => {
  res.send("BFHL API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
