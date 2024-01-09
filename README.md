#Rendu du TP de Dev API 

D'abord installer les modules nodeJs avec la commande : npm install

Ensuite lancer le serveur avec la commande : node index.js

Le serveur écoute sur le port 3000

## Pour se logger : 

**POST /login**

Passer le pseudo et le mot de passe dans le body de la requête 

Exemple :
```
{
  "pseudo": "bo",
  "password": "bobpass"
}
```

Le serveur renvoie le token au format JSON 

Exemple : 
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzA0ODE4NTU1LCJleHAiOjE3MDQ5MDQ5NTV9._htZq2-KWyH7FSDX_dXWduJuUi6IEmU67qo5EfQf9UE"
}
```

## Pour récupérer les posts : 

**GET /post**

Passer le token dans le header d'authorisation de la requête

Exemple :
```
"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzA0ODE0NjQ1LCJleHAiOjE3MDQ5MDEwNDV9.B9BifNzHyrFsra5hN1f5JqM7HnsbSQWo0waA4CPIQ-4"
```
