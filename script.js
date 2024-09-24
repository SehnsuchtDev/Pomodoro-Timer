// Éléments HTML
const temps = document.getElementById("time");
const travail = document.getElementById("travail");
const pause = document.getElementById("pause");
const bouton = document.getElementById("bouton");
const formulaire = document.getElementById("formulaire");
const parametres = document.getElementById("parametres");
const fermer = document.getElementById("fermer");

// Variables
let intervalle;
let nbMinTravail;
let nbSecTravail;
let nbMinRepos;
let nbSecRepos;
let minActu;
let secActu;
let enTravail = true;
let horlogeTourne = false;

// Récupérer variables stockées si elles existent
if(localStorage.getItem("nbMinTravail") == null){
    nbMinTravail = 25;
    nbSecTravail = 0;
} else {
    nbMinTravail = localStorage.getItem("nbMinTravail");
    nbSecTravail = localStorage.getItem("nbSecTravail");
}

if(localStorage.getItem("nbMinRepos") == null){
    nbMinRepos = 10;
    nbSecRepos = 0;
} else {
    nbMinRepos = localStorage.getItem("nbMinRepos");
    nbSecRepos = localStorage.getItem("nbSecRepos");
}

if(localStorage.getItem("minActu") == null){
    minActu = nbMinTravail;
    secActu = nbSecTravail;
} else {
    minActu = localStorage.getItem("minActu");
    secActu = localStorage.getItem("secActu");
    if(localStorage.getItem("enTravail") == "false"){
        modePause();
    }
}

if(localStorage.getItem("horlogeTourne") == "true"){
    jouerPause();
}

mettreAjourHorloge(minActu, secActu);

// Fais tourner le temps et vérifie la validité de l'horaire
function diminuerTemps() {
    if(minActu == 0 && secActu == 0) {
        changerEtape();
        return;
    }
    if(secActu == 0) {
        minActu--;
        secActu = 59;
    }
    else {
        secActu--;
    }
    mettreAjourHorloge(minActu, secActu);
}

// Passe du mode travail au mode pause et vice versa
function changerEtape(){
    if(enTravail){
        modePause();
        localStorage.setItem("enTravail",enTravail);
        changerTempsActuel(nbMinRepos, nbSecRepos);
    }
    else {
        modeTravail();
        localStorage.setItem("enTravail",enTravail);
        changerTempsActuel(nbMinTravail, nbSecTravail);
    }
}

// Gère la transition vers le mode pause
function modePause(){
    let body = document.getElementById("fond");
    enTravail = false;
    travail.className = "attend";
    pause.className = "actuel";
    body.classList.add("repos");
}

// Gère la transition vers le mode travail
function modeTravail(){
    let body = document.getElementById("fond");
    enTravail = true;
    pause.className = "attend";
    travail.className = "actuel";
    body.classList.remove("repos");
}

// Change le temps actuel
function changerTempsActuel(min, sec){
    minActu = min;
    secActu = sec;
    mettreAjourHorloge(minActu, secActu);
    localStorage.setItem("minActu",minActu);
    localStorage.setItem("secActu",secActu);
}

// Met à jour l'affichage de l'horloge, ajoute un 0 si nécessaire
function mettreAjourHorloge(min, sec){
    localStorage.setItem("minActu",minActu);
    localStorage.setItem("secActu",secActu);
    if(sec < 10 || sec == "0") { 
        temps.innerText = min + ":0" + sec;
        return;
    }
    temps.innerText = min + ":" + sec;
}

// S'occupe de la gestion du bouton de lecture et de réinitialisation
function jouerPause(){
    if(!horlogeTourne){
        bouton.className = "fa-solid fa-repeat";
        intervalle = setInterval(diminuerTemps, 1000);
        horlogeTourne = true;
    }
    else {
        bouton.className = "fa-solid fa-play";
        clearInterval(intervalle);
        intervalle = null;
        horlogeTourne = false;
        if(enTravail){
            changerTempsActuel(nbMinTravail, nbSecTravail);
        } else {
            changerTempsActuel(nbMinRepos, nbSecRepos);
        }
    }
    localStorage.setItem("horlogeTourne",horlogeTourne);
}

// Écoute l'envoi du formulaire
formulaire.addEventListener("submit", event => {
    event.preventDefault();
    retourFormulaire();
})

// S'occupe de la gestion du formulaire
function retourFormulaire(){
    let travailMinutes = document.getElementById("travail-minutes").value;
    let travailSecondes = document.getElementById("travail-secondes").value;
    let pauseMinutes = document.getElementById("pause-minutes").value;
    let pauseSecondes = document.getElementById("pause-secondes").value;
    let chgt = false;

    if(changerValeurs(travailMinutes, travailSecondes)){
        if(nbMinTravail !=  travailMinutes || nbSecTravail != travailSecondes){
            nbMinTravail = travailMinutes;
            nbSecTravail = travailSecondes;
            chgt = true;
            localStorage.setItem("nbMinTravail",nbMinTravail);
            localStorage.setItem("nbSecTravail",nbSecTravail);
        }
    }

    if(changerValeurs(pauseMinutes, pauseSecondes)){
        if(nbMinRepos !=  pauseMinutes || nbSecRepos != pauseSecondes){
            nbMinRepos = pauseMinutes;
            nbSecRepos = pauseSecondes;
            chgt = true;
            localStorage.setItem("nbMinRepos",nbMinRepos);
            localStorage.setItem("nbSecRepos",nbSecRepos);
        }
    }
    if(chgt){
        enTravail = !enTravail;
        changerEtape();
    }
}

// Vérifie la validité des valeurs entrées
function changerValeurs(heures, minutes){
    if(heures.length > 2 || minutes.length > 2) return false;
    if(heures == "00" || minutes == "00") return false;
    if(heures == 0 && minutes == 0) return false;
    if(heures < 0 || minutes < 0) return false;
    return heures < 60 && minutes < 60;
}

// Écoute le clic sur le bouton d'ouverture de paramètres
parametres.addEventListener("click", event => {
    let formulaireDiv = document.getElementById("formulaireDiv");
    formulaireDiv.className = "formulaire"
})

// Écoute le clic sur le bouton de fermeture des paramètres
fermer.addEventListener("click", event => {
    formulaireDiv.classList.add("cacher");
})


