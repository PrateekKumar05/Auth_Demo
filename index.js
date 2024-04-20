const express = require('express')
const ejs = require('ejs');
const path = require('path');
const bcrypt = require('bcrypt');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/authDemo')
    .then(() => {
        console.log('Mongo Connection Open')
    })
    .catch(err => {
        console.log("Oh no Mongo Connection Error!")
        console.log(err);
    })

app.set('view engine', 'ejs')
app.set('views', 'views');
app.set(path.join(__dirname, 'views'));

app.get('/', (req,res) => {
    res.send("THIS IS THE HOME PAGE!");
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.post('/register', async (req,res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', async (req,res) => {
    const { username, password} = req.body;
    const user = await User.findOne({ username })
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword) {
        res.send("Yay, Welcome!")
    }
    else {
        res.send("TRY AGAIN!")
    }
})

app.get('/secret', (req,res) => {
    res.send("This is Secret!");
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})