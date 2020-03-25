uppercaseBtn = document.getElementById("uppercase-button");
lowercaseBtn = document.getElementById("lowercase-button");

uppercaseBtn.onclick = toUpper;
lowercaseBtn.onclick = toLower;

var data,
  parser,
  xmlDoc,
  xmlRoot,
  tableContents,
  counter,
  serializer,
  response;


function toUpper() {
  xmlRoot = '<studentData></studentData>';
  tableContents = document.getElementsByTagName('td');
  parser = new DOMParser();
  serializer = new XMLSerializer();
  xmlDoc = parser.parseFromString(xmlRoot, 'text/xml');

  // Loop to parse the table to xml file.
  var parsedXML = xmlDoc.createElement("studentData");
  counter = 0;
  for (var i = 0; i < 10; i++) {
    counter += 1;

    newStudent = xmlDoc.createElement("student");

    newStudentName = xmlDoc.createElement("name");
    newStudentName.innerHTML = tableContents[counter].textContent;
    counter += 1;

    newStudentAddress = xmlDoc.createElement("address")
    newStudentAddress.innerHTML = tableContents[counter].textContent;
    counter += 1;

    newStudent.appendChild(newStudentName);
    newStudent.appendChild(newStudentAddress)

    parsedXML.appendChild(newStudent);
  }
  console.log(parsedXML);

  // Sending data to server
  var http = new XMLHttpRequest();
  var url = 'localhost:3000';
  http.open('POST', url, true);
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // Converting xml to string before sending
  var data = serializer.serializeToString(parsedXML);

  // Waiting for reply from the server. If a response is received and it is not an error, then render the contents back to the table.
  http.onreadystatechange = function() { //Call a function when the state changes.
    if (http.readyState == 4 && http.status == 200) {
      response = parser.parseFromString(http.responseText, "text/xml");
      displayContents();
    }
  }

  // Sending the data
  http.send(data);
}

function toLower() {

}

function displayContents() {
  console.log('Rendering the contents back to the table.');
}