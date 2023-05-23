process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express")
var cors = require("cors")
var path = require("path")
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080

var app = express()

var indexRouter = require("./src/routes/index")
var userRouter = require("./src/routes/user")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "Public")))

app.use(cors())

app.use("/", indexRouter)
app.use("/user", userRouter)

app.listen(PORTA, function () {
    console.log(`Servidor rodando dentro da: http://localhost:${PORTA} - Ambiente de ${process.env.AMBIENTE_PROCESSO}`);
});
