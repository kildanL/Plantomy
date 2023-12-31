var models = require('../models'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const eH = require('../middleware/errorHandler');
var Account = models.Account;
var User = models.User;

// should contain in req: in body - login, hash (not hashed password)
module.exports.login = async function(req, res) {
    try {
        const candidate = await Account.findOne({raw: true, where: {Login: req.body.login}});
    if (candidate) {
        const pw = bcrypt.compareSync(req.body?.hash, candidate.Hash);
        if (pw) {
            const token = jwt.sign({
                login: candidate.Login,
                userId: candidate.id,
            }, config.jwt, {expiresIn: 60*60*24*7});

            res.status(200).json({
                token: `Bearer ${token}`,
            });
        } else {
            return res.status(401).json({message:'Логин и пароль не совпадают'});
        }
    } else {
        return res.status(401).json({message:'Пользователь не найден'});
    }
    } catch(err) {
        eH(res, err);
    }
}

// should contain in req: in body - login, hash (not hashed password)
module.exports.resgister = async function(req, res) {
    try {
        const candidate = await Account.findOne({raw: true, where: {Login: req.body.login}});
        if (candidate) {
            return res.status(409).json({message: 'Пользователь уже зарегистрирован'});
        }

        const salt = bcrypt.genSaltSync(10);
        const pw = req.body?.hash;

        const _account = Account.build({ Login: req.body?.login, Hash: bcrypt.hashSync(pw, salt) });
        await _account.save().then(() => {
            
            const _user = User.create({AccountId: _account.id, id: _account.id});
            res.status(200).json({message: 'Регистрация прошла успешно!'});

        });
    } catch(err) {
        eH(res, err);
    }
}