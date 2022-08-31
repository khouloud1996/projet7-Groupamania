// Permet d'importer jsonwebtoken
const jwt = require('jsonwebtoken');

// Permet de vérifier le token envoyé par le frontend
module.exports = (req, res, next) => {
    try {
        // console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        // const userId = Number(req.params.id)
        const decodedToken = jwt.verify(token, 'JWT_SECRET_TOKEN');
        const tokenUserId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== tokenUserId) {
            // console.log(req.body.userId)
            // console.log(tokenUserId)
            // console.log(req.body.userId && req.body.userId !== tokenUserId)
            throw 'User ID non valable';
        } else {            
            next();
        }
    } catch (error) {
        console.log("Erreur middleware" , error)
        res.status(401).json({ error: 'Requête non authentifiée'});
    }
};