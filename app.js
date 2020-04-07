const express = require('express');
const app = express();
const port = 8000; // Li
const path = require('path');


app.use(express.static('public')); // Set the repo to use for static files

app.get('/', function(req, res) {
	    res.sendFile(path.join(__dirname + '/index.html')); // Display index.html
});

app.listen(port, () => console.log(` App listening at http://localhost:${port}`));