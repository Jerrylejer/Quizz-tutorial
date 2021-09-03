"use strict";

const form = document.querySelector(".quizz-form");
// Ce tab recueille les choix du joueur
let tableauResultats = [];
// Réponses aux questions du quizz
const reponses = ["c", "a", "b", "a", "c"];
// Interaction sur l'encart message fin de quizz
const emojis = ["✔️", "✨", "👀", "😭", "👎"];
const titreResultaty = document.querySelector(".msg-valid h2");
const texteResultat = document.querySelector(".note");
const sideResultat = document.querySelector(".aide");
// Interaction sur les encarts quizz
const toutesLesQuestions = document.querySelectorAll(".quest-quizz");
// Tableau de vérification des données recueillis
let verifTableau = [];

// RECUPERATION DES DONNEES CLIQUEES SUR LE QUIZZ DANS UN TABLEAU
// fonction anonyme de récupération des données cliquées
form.addEventListener("submit", (e) => {
  // (e) renvoi à la méthode e.preventDefault()
  // permet d'annuler l'effet clic bouton (soumettre le form), lien (suivre l'url).
  e.preventDefault();
  // Itération dans q1, q2, q3, q4, q5 et push dans tableau "verifTableau"
  for (let i = 1; i < 6; i++) {
    tableauResultats.push(
      document.querySelector(`input[name='q${i}']:checked`).value
    );
    console.log(tableauResultats);
    funcVerifTableau(tableauResultats);
    // Réinitialisation du tableau après le clic pour ne pas ajouter les résultats aux précédents
    tableauResultats = [];
  }
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
  verifTableau = [];
}
