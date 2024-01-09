const jwt = require('jsonwebtoken');

// Clé secrète pour signer le JWT 
const SECRET_KEY = '123';

// Middleware pour l'authentification
module.exports = {
    /**
     * Authentifier le user et renvoie le token si l'authentification est réussie
     * sinon renvoie une erreur 401 (Unauthorized)
     * 
     * @param {object} req 
     * @param {object} res 
     * @returns {object} renvoie le token si l'authentification est réussie
     */
    authenticate: (req, res) => {
        const { pseudo, password } = req.body;

        // Lire les utilisateurs depuis le fichier JSON
        const users = require('./users.json');

        // Recherche de l'utilisateur
        const user = users.find(u => u.pseudo === pseudo && u.password === password);

        if (!user) {
            return res.status(401).send({ error: 'Utilisateur ou mot de passe incorrect' });
        }

        // Création du JWT
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1d' });

        // Renvoyer le token
        res.send({ token });
    },

    /**
     * Midlleware pour vérifier le token
     * 
     * @param {object} req 
     * @param {object} res 
     * @param {function} next 
     * @returns {object} renvoie une erreur 401 (Unauthorized) si le token est invalide, sinon passe la main au middleware suivant
     */
    verifyToken: (req, res, next) => {
        let token = req.headers['authorization'];
        token = token.split(' ')[1];

        if (!token) {
            return res.status(401).send({ error: 'Token manquant' });
        }

        console.log(token);

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(401).send({ error: 'Token invalide' });
            }
            req.token = decoded;
            next();
        });
    },

};


