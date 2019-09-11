const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/auth');
const dotenv = require('dotenv');
const postsRoute = require('./routes/posts');
const path = require('path');

app.use(express.json());
dotenv.config();
app.use('/api/user', userRoute);
app.use('/api/posts', postsRoute);

app.use(express.static(path.join(__dirname, '../', 'dist/')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'dist/index.html'));
});

mongoose.connect(process.env.DB_CONNECTION_URL, 
{useNewUrlParser: true}, (err) => {
    if(err)
        console.log(err);
    
    console.log('Connected to DB!');
});

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err)
        console.log(err);
    
    console.log(`Listening on port ${port}`);
});
