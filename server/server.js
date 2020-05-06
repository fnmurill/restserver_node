const bodyParser = require('body-parser');
require('./config/config');


const express = require('express');
const mongoose = require('mongoose');


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**Configuración global de rutas*/
app.use(require('./routes/index'));



mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) throw err;
        console.log('Data Base Online')

    })

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});