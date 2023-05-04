const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        //encontar usuario
        const user = await User.findOne({where: {email: email}})
        if (!user){
            req.flash('message', "Usuário não encontrado!")
            res.render('auth/login')
            return
        }

        //verificar senha
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch){
            req.flash('message', "Senha não confere!")
            res.render('auth/login')
            return
        }

        req.session.userid = user.id
        req.flash('message', "Você está logado!")
        req.session.save(() => {
            res.redirect('/')
        })
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body

        //validação de senha
        if(password != confirmpassword) {
            req.flash('message', "As senhas não conferem! Tente novavmente.")
            res.render('auth/register')
            return
        }

        //validar usuario existente
        const checkIfUserExists = await User.findOne({where: {email: email}})
        if(checkIfUserExists) {
            req.flash('message', "E-mail já registrado.")
            res.render('auth/register')
            return
        }

        //criar senha
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email, 
            password:hashedPassword
        }

        try {
            const createdUser = await User.create(user)

            //inicializar sessão
            req.session.userid = createdUser.id

            req.flash('message', "Registro efetuado com sucesso!")

            req.session.save(() => {
                res.redirect('/')
            })
            //res.render('pensamentos/home')
        } catch (err) {
            console.log(err)
        }
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }
} 

