const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const inputData = req.body.inputFieldName;
  res.redirect(`/output?data=${inputData}`);
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
