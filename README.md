Le code est séparé en 2 dossiers :

- Backend/ : il contient tout ce qui est relatif au serveur (notamment dans le fichier index.js)
- Frontend/ : il contient tout ce qui est relatif à la partie visible par le client (notamment dans les fichiers index.html, style.css et script.js)

Les liens du déploiement sont les suivants :

- Pour la page web visible par le client : https://tp-archiapp-web-1.onrender.com
- Pour le serveur : https://tp-archiapp-web.onrender.com

Les liens des projets Replit :
- Pour la page web visible par le client : https://replit.com/@ouzilloudam/TP-ArchiApp?v=1#index.html
- Pour le serveur : https://replit.com/@ouzilloudam/MessageBoard?v=1#index.js

Comment vérifier le fonctionnement du code :

- Lorsque l'on clique sur le lien de la page web visible par le client (https://tp-archiapp-web-1.onrender.com), si en haut dans "URL du serveur" il y a autre chose que
https://tp-archiapp-web.onrender.com (sans "/" à la fin !), il faut modifier le lien par celui-ci puis appuyer sur "Sauvegarder". Si à cet endroit, nous mettons le lien du serveur d'un de mes camarades,
puis que nous appuyons sur "Sauvegarder", nous sommes censés récupérer les messages associés à leur serveur.

- En bas, il est possible de poster un message à l'aide d'un pseudonyme ainsi que d'un contenu de message. Il faut remplir les champs pseudo et message, et appuyer sur "Envoyer".
S'il manque au moins l'un des deux, un pop up d'erreur avec le message "Veuillez entrer un pseudo et un message !" apparaît. Sinon, cela envoie bien le message sur le serveur.

- Il est possible de changer le thème de couleurs de la page en appuyant sur le bouton "Changer de style" à n'importe quel moment. Cela permet de switch entre un dark-mode et le mode normal.

- Les commandes indiquées dans le TP sont toutes possibles : une fois sur la page du serveur (https://tp-archiapp-web.onrender.com), on peut ajouter du texte à la fin de l'URL pour
obtenir certains comportements. Par exemple : ajouter "/msg/get/index du message" (exemple : https://tp-archiapp-web.onrender.com/msg/get/0) pour récupérer le message de l'index indiqué.
On peut aussi ajouter "/cpt/query" pour obtenir la valeur d'un compteur, "/cpt/inc" pour l'incrémenter de 1, et "/cpt/inc?v=XXX" pour incrémenter de XXX (par exemple 020 pour incrémenter de 20). On peut enfin ajouter "/msg/getAll" pour obtenir tous les messages, "/msg/post/contenu du message" pour ajouter un message, "/msg/nber" pour avoir le nombre de messages total, et "/msg/del/index du message" pour supprimer le message de l'indice indiqué.
