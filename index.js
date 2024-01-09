// Création d'un serveur avec le framework Express
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const app = express();

app.use(bodyParser.json());

// Endpoint pour tester le serveur
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Endpoint pour l'authentification
app.post('/login', auth.authenticate);

// Récupère le midleware pour vérifier le token
const verifyToken = require('./auth').verifyToken;

// Endpoint pour récupérer les posts
// On passe le middleware verifyToken en second paramètre
app.get('/post', verifyToken, (req, res) => {

    console.log(req.token)
    // Lire les posts depuis le fichier JSON
    const posts = require('./posts.json');

    if (!req.token.isAdmin) {
        // Si l'utilisateur n'est pas admin, on ne renvoie que ses posts
        const userPosts = posts.filter(post => post.authorId === req.token.id);
        return res.send(userPosts);
    }
    // Renvoyer les posts
    res.send(posts);
});

app.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port 3000');
});
