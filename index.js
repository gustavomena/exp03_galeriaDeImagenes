const express = require('express')
const app = express()
const fs=require('fs')

app.listen(3000,()=>{console.log('UP 3000')})

const expressFileUpload = require('express-fileupload')
app.use(expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit: 'el archivo supera el tamaño permitido (5MB)'
}))

app.use(express.static('public'))

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/html/formulario.html");
});
app.get('/imagen', (req, res) => {
    res.sendFile(__dirname + '/html/collage.html')
})

app.post('/imagen', (req, res) => {
    const {target_file} = req.files;
    const { posicion } = req.body;
    const nombre = `imagen-${posicion}.jpg`;
    target_file.mv(`${__dirname}/public/imgs/${nombre}`, (err) => {
        res.redirect("/imagen")
    })

})

app.get('/deleteImg/:imagen', (req, res) => {
    const { imagen } = req.params
    fs.unlink(`${__dirname}/public/imgs/${imagen}`,(err)=> {
        res.redirect("/imagen")
    })
})

