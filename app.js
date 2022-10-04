const express = require("express");
const app = express();

//usamos un enrutador
app.set("view engine", "ejs");
app.use("/", require("./router"));

app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
//Nodemon para correr

//directorio para uso de CSS
app.use(express.static(__dirname + "/public/css"));
app.use("/public/css", express.static(__dirname + "/public/css"));
app.use("/static", express.static(__dirname + "/public/css"));

//Directorio de uso PARA SCRIPTS DE JS
app.use(express.static(__dirname + "/public/js"));
app.use(express.static(__dirname + "/public"));

//
