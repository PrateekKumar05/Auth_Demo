const express = require('express')
const app = express();
const User = require('./models/user');

app.get('/secret', (req,res) => {
    res.send("This is Secret!");
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})