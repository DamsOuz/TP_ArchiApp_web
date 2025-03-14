// 3.1 TP CLIENT ----------------------------------------------------------
// Fonction qui calcule la factorielle d'un entier positif n
function fact(n) {
    if (n === 0 || n === 1) return 1;
    return n * fact(n - 1);
}

// Affichage de la factorielle de 6 dans la console
console.log("Factorielle de 6 :", fact(6));

// Fonction qui applique une fonction f à chaque élément d'un tableau
function applique(f, tab) {
    return tab.map(f);
}

// Test de la fonction applique avec la factorielle
console.log("Factorielle des éléments [1,2,3,4,5,6] :", applique(fact, [1, 2, 3, 4, 5, 6]));

// Utilisation de applique avec une fonction anonyme (ajout de 1 à chaque élément)
console.log("Ajout de 1 à chaque élément :", applique(function(n) { return n + 1; }, [1, 2, 3, 4, 5, 6]));

// ------------------------------------------------------------------------

let userURL = localStorage.getItem("serverURL") || "https://tp-archiapp-web.onrender.com";

document.getElementById("server-url").value = userURL;

// Fonction pour sauvegarder l'URL du serveur
document.getElementById("save-url").addEventListener("click", function() {
    let newURL = document.getElementById("server-url").value.trim();

    if (newURL) {
        userURL = newURL;
        localStorage.setItem("serverURL", newURL); // Sauvegarde l'URL dans le navigateur
        alert("URL du serveur mise à jour !");
        updateMessages(); // Recharge les messages du nouveau serveur
    } else {
        alert("Veuillez entrer une URL valide !");
    }
});

// Fonction pour récupérer et afficher les messages
function updateMessages() {
    fetch(userURL + '/msg/getAll')
        .then(response => response.json())
        .then(messages => {
            let messageList = document.getElementById("messages-list");
            messageList.innerHTML = "";  // Efface la liste actuelle

            messages.forEach(msg => {
                if (typeof msg === 'object' && msg !== null) {
                    let li = document.createElement("li");
                    li.innerHTML = `<strong>${msg.pseudo || "Anonyme"}</strong> (${msg.date || "Date inconnue"}): ${msg.msg || "Message vide"}`;
                    messageList.appendChild(li);
                } else {
                    console.error("Format de message incorrect :", msg);
                }
            });
        })
        .catch(error => console.error("Erreur lors du chargement des messages :", error));
}

// Fonction pour envoyer un nouveau message
document.getElementById("submit-message").addEventListener("click", function() {
    let pseudoInput = document.getElementById("pseudo").value.trim();
    let messageInput = document.getElementById("new-message").value.trim();
    let submitButton = document.getElementById("submit-message");

    if (pseudoInput === "" || messageInput === "") {
        alert("Veuillez entrer un pseudo et un message !");
        return;
    }

    // Désactiver temporairement le bouton pour éviter les doubles envois
    submitButton.disabled = true;
    submitButton.textContent = "Envoi...";

    fetch(`${userURL}/msg/post/${encodeURIComponent(messageInput)}?pseudo=${encodeURIComponent(pseudoInput)}&date=${encodeURIComponent(new Date().toLocaleString())}`)
        .then(response => response.json())
        .then(data => {
            if (data.code === 1) {
                updateMessages();  // Rafraîchir la liste après envoi
                document.getElementById("new-message").value = ""; // Efface le champ
                alert("Message envoyé avec succès !");
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi du message :", error);
            alert("Échec de l'envoi du message !");
        })
        .finally(() => {
            // Réactiver le bouton après l'envoi
            submitButton.disabled = false;
            submitButton.textContent = "Envoyer";
        });
});

// Ajouter un écouteur d'événement au bouton de mise à jour
document.getElementById("update-messages").addEventListener("click", updateMessages);

// Fonction pour changer le style clair/sombre
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
document.getElementById("toggle-theme").addEventListener("click", toggleTheme);

// Charger automatiquement les messages au chargement de la page
window.onload = updateMessages;



/* Ci-dessous est ce que j'ai fait pour les questions précédentes et qui n'était plus utile pour la suite

// 3.2 + 3.3 TP CLIENT ----------------------------------------------------
// Définition de la variable msgs avec pseudo et date

let msgs = [
    { "msg": "Hello World", "pseudo": "Alice", "date": new Date().toLocaleString() },
    { "msg": "Blah Blah", "pseudo": "Bob", "date": new Date().toLocaleString() },
    { "msg": "I love cats", "pseudo": "Charles", "date": new Date().toLocaleString() }
];

// Fonction qui met à jour la liste des messages affichés
function update(messages) {
    let messageList = document.getElementById("messages-list");

    // Effacer les messages existants
    messageList.innerHTML = "";

    // Ajouter chaque message du tableau sous forme de <li>
    for (let i = 0; i < messages.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${messages[i].pseudo}</strong> (${messages[i].date}): ${messages[i].msg}`;
        messageList.appendChild(li);
    }
}

// Ajouter un écouteur d'événement au bouton de mise à jour
let updateButton = document.getElementById("update-messages");
updateButton.addEventListener("click", function() {
    update(msgs);
});

// Ajouter un écouteur d'événement pour soumettre un message
let submitButton = document.getElementById("submit-message");
submitButton.addEventListener("click", function() {
    let pseudoInput = document.getElementById("pseudo").value;
    let messageInput = document.getElementById("new-message").value;

    if (pseudoInput.trim() !== "" && messageInput.trim() !== "") {
        msgs.push({ "msg": messageInput, "pseudo": pseudoInput, "date": new Date().toLocaleString() });
        update(msgs);
        document.getElementById("new-message").value = "";
    }
});

// Fonction pour changer le style clair/sombre
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Ajouter un écouteur d'événement pour le changement de style
let themeButton = document.getElementById("toggle-theme");
themeButton.addEventListener("click", toggleTheme);


// 3.1 TP serveur ---------------------------------------------------------
let userURL = "https://2d07c363-e668-4312-a05a-097b194667c6-00-2cn3zhsu5rz6c.riker.replit.dev"

fetch(userURL+'/msg/getAll')
.then(function(response) {
  return response.json();
})
.then(function(data) {
  if (data.length > 0) {
    alert(data[0]); // Affiche le premier message du micro-service
  } else {
    alert("Aucun message disponible");
  }
})
.catch(function(error) {
  console.error("Erreur lors du chargement des messages :", error);
});

*/
