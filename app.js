const movieController = require('./controller/movie-controller')
const path = require('path'); //Importando o modulo path

const express = require('express'); //Importando o modulo do express
app = express(); //Instanciando o express na variavel app
port = 3000; //Settando a porta

app.set('views', path.join(__dirname, 'view')); //Settando a pasta onde seram lidas as views como a pasta view
app.set('view engine', 'ejs'); //Settando o renderer das views como ejs

app.use(express.static(path.join(__dirname, 'public'))); //Settando o diretório dos arquivos estáticos como a pasta public

app.get("/", (req, res, next)=>{ //Criando um listener no index
    res.render('index'); //Colocando para renderizar a view index quando a request for feita na url
});

app.listen( //Colocando o app para escutar o localhost
    port, //Passando a porta que ele deverá escutar (nesse caso a url vai ser localhost:3000)
    ()=> console.log(`Listening App on Port ${port}`) //Fazendo uma arrow function para printar qual porta ele está escutando quando rodar o app
);
