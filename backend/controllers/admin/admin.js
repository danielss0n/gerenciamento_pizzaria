const Admin = require("../../models/admin/Admin")
const jwt = require('jsonwebtoken');

module.exports = class adminCONTROLLER {

    static async logarAdmin(req, res) {

        const { nome, senha1, senha2 } = req.body
        const admin = await Admin.findOne({nome:nome})

        if(!admin){
            res.status(200).json({mensagem:`Admin inexistente!`})
            return
        }
        if(senha1 !== admin.senha1){
            res.status(200).json({mensagem:`Senha 1 incorreta!`})
            return
        }
        if(senha2 !== admin.senha2){
            res.status(200).json({mensagem:`Senha 2 incorreta!`})
            return
        }

        const id = admin._id; 
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 999999 
        });

        return res.json({ auth: true, token: token });
    }

}