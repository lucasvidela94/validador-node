const express = require("express")
const bodyParser = require("body-parser")
const { check, validationResult, body } = require("express-validator")
const req = require("express/lib/request")
const app = express()
const port = 5000

app.set("view engine", "ejs")

const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("", (req, res) => {
  res.render("index")
})

app.get("/register", (req, res) => {
  res.render("register")
})

app.post(
  "/register",
  urlencodedParser,
  [
    check("usuario", "El usuario debe tener minimo 3 caractes de longitud")
      .exists()
      .isLength({ min: 3, max: 13 }),
    check("email", "El email no es valido").isEmail().normalizeEmail(),
    check("password","La contraseña debe incluir una minuscula,una mayuscula,un numero y un caracter especial")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"), 

  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      // return res.status(422).jsonp(errors.array())
      const alert = errors.array()
      res.render("register", {
        alert
      })
    }
  }
)

app.get("/terms", (req, res) => {
  res.render("terms")
})

app.listen(port, () =>
  console.info(`La app esta escuchando en el puerto nro ${port}`)
)
