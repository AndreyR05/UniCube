process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

const express = require("express")
const cors = require("cors")
const path = require("path")
const PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080

const app = express()

const indexRouter = require("./src/routes/index")
const userRouter = require("./src/routes/user")
const publicationRouter = require("./src/routes/publication")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "Public")))

app.use(cors())

app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/publication", publicationRouter)

app.listen(PORTA, function () {
    console.log(`Servidor rodando dentro da: http://localhost:${PORTA} - Ambiente de ${process.env.AMBIENTE_PROCESSO}`);
});
