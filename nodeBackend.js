const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/static'));

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.listen(3000);