console.log('Executing server!');

// Header files
const express = require('express');
const bodyParser = require('body-parser');
const xml2json = require('xml-js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.post('/', (req, res) => {
  let xmlString = Object.keys(req.body)[0];
  console.log('inside post command');

  // converting xml strig to json format in the server side.
  var parsedJSON = xml2json.xml2json(xmlString, { compact: true, spaces: 4 });
  parsedJSON = JSON.parse(parsedJSON);
  type = parsedJSON.studentData.type._text;
  parsedJSON = parsedJSON.studentData.student;

  console.log(parsedJSON);
  console.log(parsedJSON.length);
  var data = '<studentData>';
  for (var i = 0; i < 10; i++) {
    if (type == 'uppercaseButton') {
      console.log(i);
      console.log(parsedJSON[i].name._text + ' : ' + parsedJSON[i].address._text);

      data += '<student><name>' + parsedJSON[i].name._text.toUpperCase() + '</name><address>' + parsedJSON[i].address._text.toUpperCase() + '</address></student>';
    } else {
      data += '<student><name>' + parsedJSON[i].name._text.toLowerCase() + '</name><address>' + parsedJSON[i].address._text.toLowerCase() + '</address></student>';
    }
  }
  data += '</studentData>';
  res.send(data);
})

const PORT = 3000
app.listen(PORT);