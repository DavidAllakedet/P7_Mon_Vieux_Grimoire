const bcrypt = require('bcrypt');

const User = require('../models/User')

const jwt = require('jsonwebtoken');

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//       .then(hash => {
//         const user = new User({
//           email: req.body.email,
//           password: hash
//         });
//         user.save()
//           .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//           .catch(error => res.status(400).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
//   };

// exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
//                     }
//                     res.status(200).json({
//                         userId: user._id,
//                         token: 'TOKEN'
//                     });
//                 })
//                 .catch(error => res.status(500).json({ error }));
//         })
//         .catch(error => res.status(500).json({ error }));
//  };

exports.signup = (req, res, next) => {
    // on hash le mot de passe avec bcrypt
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        //on cree un nouveau utilisateur
        const user = new User({
            email: req.body.email,
            password: hash
        })
        //on enregistre l'utilisateur
        user.save()
            .then(() => res.status(201).json({message: 'utilisateur cree !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}
exports.login = (req, res, next) => {
    User.findOne({ email : req.body.email })
    .then( user => {
        if (user === null){
            res.status(401).json({message: 'Pair identifiant mot de passe incorrecte'})
        }else{
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid){
                    res.status(401).json({message : 'Pair identifiant mot de passe incorrecte'})
                }else{
                    res.status(200).json({
                        userId : user._id,
                        token : jwt.sign({
                            userId : user._id
                        },'RANDOM_TOKEN_SECRET', {
                            expiresIn : '24h'
                        })
                    });
                }
            })
            .catch(error => res.status(500).json({ error }))
        }
    })
    .catch(error => res.status(500).json({error}))
};