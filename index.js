const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})
//-------------------------------- fim conf padrao

//instancia conexão com db
const conn = require('./db/conn')
//--------------------------------

//Models--------------------------
const Pensamento = require('./models/Pensamento')
const User = require('./models/User')
//--------------------------------


//Import Routes-------------------
const pensamentosRoutes = require('./routers/pensamentosRoutes')
const authRoutes = require('./routers/authRoutes')
//--------------------------------


//Import Controller---------------
const PensamentoController = require('./controllers/PensamentoController')
//const AuthController = require('./controllers/AuthController')
//--------------------------------


// definir template engine--------
app.engine('handlebars', hbs.engine) //exphbs() <- antiga chamada da template engine
app.set('view engine', 'handlebars')
//--------------------------------


// receber resposta do body------
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(
    express.json()
)
//--------------------------------


//public path--------------------
app.use(
    express.static('public')
)
//--------------------------------


//sessions middleware-------------
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    })
)
//--------------------------------


//flash messages------------------
app.use(flash())
//--------------------------------


//set session to res--------------
app.use((req, res, next) => {
    if(req.session.userid) {
        res.locals.session = req.session
    }
    next()
})
//--------------------------------


//Routes--------------------------
app.use('/pensamentos', pensamentosRoutes)
app.use('/', authRoutes)
app.get('/', PensamentoController.showPensamentos)
//--------------------------------


//efetua conexão com db-----------
conn 
    //.sync({force: true})
    .sync()
    .then(() => {
        app.listen(5500)
    })
    .catch((err) => console.log(err))
//--------------------------------
