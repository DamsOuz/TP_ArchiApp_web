var express = require('express'); // Import de la bibliothèque Express
var cors = require('cors'); //Import de la bibliotheque CORS
var app = express(); // Instanciation d'une application Express

let compteur = 0;
console.log("Compteur au début :", compteur);

var allMsgs = [
    { "pseudo": "Alice", "date": new Date().toLocaleString(), "msg": "Hello World" },
    { "pseudo": "Bob", "date": new Date().toLocaleString(), "msg": "foobar" },
    { "pseudo": "Charles", "date": new Date().toLocaleString(), "msg": "CentraleSupelec Forever" }
];

app.use(cors({
    origin: '*'
}));

// Pour s'assurer que l'on peut faire des appels AJAX au serveur
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Route /msg/get/[numéro] : récupère un message spécifique
app.get("/msg/get/:id", function(req, res) {
    let id = parseInt(req.params.id, 10);
    if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
        res.json({ "code": 1, "msg": allMsgs[id] });
    } else {
        res.json({ "code": 0 });
    }
});

// Route /msg/getAll : récupère tous les messages
app.get("/msg/getAll", function(req, res) {
    res.json(allMsgs);
});

// Route /msg/nber : retourne le nombre total de messages
app.get("/msg/nber", function(req, res) {
    res.json({ "count": allMsgs.length });
});

// Route /msg/post/[message] : ajoute un message à la liste
app.get("/msg/post/:message", function(req, res) {
    let pseudo = req.query.pseudo || "Anonyme";
    let date = req.query.date || new Date().toLocaleString();
    let message = decodeURIComponent(req.params.message);

    allMsgs.push({ pseudo, date, msg: message });  // Ajout sous forme d'objet
    res.json({ "code": 1, "id": allMsgs.length - 1 });
});

// Route /msg/del/[numéro] : supprime un message de la liste
app.get("/msg/del/:id", function(req, res) {
    let id = parseInt(req.params.id, 10);
    if (!isNaN(id) && id >= 0 && id < allMsgs.length) {
        allMsgs.splice(id, 1);
        res.json({ "code": 1 });
    } else {
        res.json({ "code": 0 });
    }
});

// Route /cpt/query : retourne la valeur actuelle du compteur
app.get("/cpt/query", function(req, res) {
    res.json({ "compteur": compteur });
});

// Route /cpt/inc : incrémente le compteur
app.get("/cpt/inc", function(req, res) {
    let increment = 1;

    if (req.query.v !== undefined) {
        if (String(req.query.v).match(/^-?\d+$/)) {
            increment = parseInt(req.query.v, 10);
        } else {
            return res.json({ "code": -1 }); // Erreur si v n'est pas un entier
        }
    }
    console.log("Incrément :", increment);
    compteur += increment;
    console.log("Compteur à la fin :", compteur);
    res.json({ "code": 0 });
});

// Route de base
app.get("/", function(req, res) {
  res.send("Hello");
});

// Route /test/* qui retourne un objet JSON avec différentes valeurs
app.get("/test/*", function(req, res) {
  let message = req.url.substr(6); // Supprime "/test/" de l'URL

  if (message === "object") {
    res.json({ "a": 1, "b": 2 });
  } else if (message === "array") {
    res.json(["Hello", "World"]);
  } else if (message === "number") {
    res.json(42);
  } else {
    res.json({ "msg": message });
  }
});

// Lancement du serveur
app.listen(8080);
console.log("App listening on port 8080...");
