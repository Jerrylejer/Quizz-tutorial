// "use strict";

const form = document.querySelector(".quizz-form");
// Ce tab recueille les choix du joueur
let tableauResultats = [];
// Réponses aux questions du quizz
const reponses = ["c", "a", "b", "a", "c"];
// Interaction sur l'encart message fin de quizz
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
let titreResultat = document.querySelector(".msg-valid h2");
let aideResultat = document.querySelector(".aide");
let texteResultat = document.querySelector(".note");

// Interaction sur les encarts quizz
const toutesLesQuestions = document.querySelectorAll(".quest-quizz");
console.log(toutesLesQuestions);
// Enlever les couleurs correspondant à la comparaison des réponses
// document.querySelector(".q1").classList.remove("wrong");
// document.querySelector(".q2").classList.remove("ok");
// document.querySelector(".q2").classList.remove("wrong");
// document.querySelector(".q3").classList.remove("ok");
// document.querySelector(".q3").classList.remove("wrong");
// document.querySelector(".q4").classList.remove("ok");
// document.querySelector(".q4").classList.remove("wrong");
// document.querySelector(".q5").classList.remove("ok");
// document.querySelector(".q5").classList.remove("wrong");

// Tableau de vérification des données recueillis
let verifTableau = [];
// RECUPERATION DES DONNEES CLIQUEES SUR LE QUIZZ DANS UN TABLEAU
// fonction anonyme de récupération des données cliquées
// UTILISATION DE LA METHODE PREVENTDEFAULT
form.addEventListener("submit", (e) => {
  // (e) renvoi à la méthode e.preventDefault()
  // permet d'annuler l'effet clic bouton (soumettre le form), lien (suivre l'url).
  e.preventDefault();
  // Itération dans q1, q2, q3, q4, q5 et push dans tableau "verifTableau"
  for (let i = 1; i < 6; i++) {
    tableauResultats.push(
      document.querySelector(`input[name="q${i}"]:checked`).value
    );
  }
  // ATTENTION : BIEN PLACER CE BOUT DE CODE APRES LA BOUCLE SINON SE REITERE 5 X !!!!
  // console.log(tableauResultats);
  funcVerifTableau(tableauResultats);
  // Réinitialisation du tableau après le clic pour ne pas ajouter les résultats aux précédents
  tableauResultats = [];
});

// FONCTION POUR VERIFIER TABLEAU REPONSES JOUEUR QUIZZ AVEC REPONSES QUIZZ
function funcVerifTableau(tableauResultats) {
  for (let i = 0; i < 5; i++) {
    if (tableauResultats[i] === reponses[i]) {
      verifTableau.push(true);
    } else {
      verifTableau.push(false);
    }
  }
  console.log(verifTableau);
  afficherResultats(verifTableau);
  couleursFunction(verifTableau);
  verifTableau = [];
}

// FONCTION QUI ISOLE LES FAUTE POUR l'AFFICHAGE DU MESSAGE
function afficherResultats(verifTableau) {
  // Méthode filter() va créer un nouveau tableau avec les el triés
  // el = élément (couramment utilisé)
  // fonction callback type array qui filtre chaque el différents de la valeur true
  // .length pour avoir la longueur du tableau ET l'affichage du nbre de fautes
  const nbDeFautes = verifTableau.filter((el) => el !== true).length;
  // console.log(nbDeFautes);

  switch (nbDeFautes) {
    case 0:
      titreResultat.textContent = `${emojis[0]} Bravo, c"est un sans faute ! ${emojis[0]}`;
      aideResultat.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      texteResultat.textContent = `5/5`;
      break;
    case 1:
      titreResultat.textContent = `${emojis[1]} Vous y êtes presque ! ${emojis[1]}`;
      aideResultat.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      texteResultat.textContent = `4/5`;
      break;
    case 2:
      titreResultat.textContent = `${emojis[1]} Encore un effort ... ${emojis[2]}`;
      aideResultat.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      texteResultat.textContent = `3/5`;
      break;
    case 3:
      titreResultat.textContent = `${emojis[2]} Il reste quelques erreurs. ${emojis[3]}`;
      aideResultat.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      texteResultat.textContent = `2/5`;
      break;
    case 4:
      titreResultat.textContent = `${emojis[3]} Peux mieux faire. ${emojis[3]}`;
      aideResultat.textContent =
        "Retentez une autre réponse dans les cases rouges, puis re-validez !";
      texteResultat.textContent = `1/5`;
      break;
    case 5:
      titreResultat.textContent = `${emojis[4]} Peux mieux faire. ${emojis[4]}`;
      texteResultat.textContent = `0/5`;
      break;
    default:
      "Ce n'était pas prévu !";
  }
}

// FONCTION QUI COLORE LES QUIZZ EN ROUGE OU VERT SELON LA REPONSE
// couleursFunction(verifTableau) dans FONCTION VERIF TABLEAU REPONSES
// UTILISATION DE LA MLETHODE SETTIMEOUT()

function couleursFunction(tabValsBool) {
  for (let i = 0; i < tabValsBool.length; i++) {
    if (tabValsBool[i] === true) {
      toutesLesQuestions[i].style.background = "lightgreen";
    } else {
      toutesLesQuestions[i].style.background = "pink";
      toutesLesQuestions[i].classList.add("echec");

      // Afin de la recharger et quelle se lance une nouvelle fois après validation d'une autre réponse
      // Il faut la désactiver au bout d'un certain temps (500ms) et qu'elle se recharge par la suite (add)
      setTimeout(() => {
        toutesLesQuestions[i].classList.remove("echec");
      }, 500);
    }
  }
}

// Lorsque réponse fausse et essai de correction : le joueur clique sur le quizz ou radio-btn et l'encart redevient blanc
// UTILISATION DE LA METHODE FOREACH
toutesLesQuestions.forEach((questquizz) =>
  questquizz.addEventListener("click", () => {
    questquizz.style.background = "white";
  })
);
//  2 FONCTIONS ARRAY SONT COMBINEES MAIS ON AURAIT PU IMBRIQUER UNE ARRAY ET UNE DECLARATION
// toutesLesQuestions.forEach((questquizz) =>
//   questquizz.addEventListener("click", function () {
//     questquizz.style.background = "white";
//   })
// );
