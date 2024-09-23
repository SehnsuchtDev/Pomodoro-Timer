const temps = document.getElementById("time");
const travail = document.getElementById("travail");
const pause = document.getElementById("pause");
const bouton = document.getElementById("bouton");
const formulaire = document.getElementById("formulaire");
const parametres = document.getElementById("parametres");
const fermer = document.getElementById("fermer");

let intervalle;

let nbMinTravail = 0;
let nbSecTravail = 10;

let nbMinRepos = 10;
let nbSecRepos = 0;

let enTravail = true;
let horlogeTourne = false;

let minActu = nbMinTravail;
let secActu = nbSecTravail;

mettreAjourHorloge(minActu, secActu);

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

function changerEtape(){
    if(enTravail){
        enTravail = false;
        minActu = nbMinRepos;
        secActu = nbSecRepos;
        mettreAjourHorloge(minActu, secActu);
        travail.className = "attend";
        pause.className = "actuel";

    }
    else {
        enTravail = true;
        minActu = nbMinTravail;
        secActu = nbSecTravail;
        mettreAjourHorloge(minActu, secActu);
        pause.className = "attend";
        travail.className = "actuel";
    }
}

function mettreAjourHorloge(min, sec){
    if(sec < 10) { 
        temps.innerText = min + ":0" + sec;
        return;
    }
    temps.innerText = min + ":" + sec;
}

function jouerPause(){
    if(!horlogeTourne){
        bouton.className = "fa-solid fa-repeat";
        intervalle = setInterval(diminuerTemps, 1000);
        horlogeTourne = true;
    }
    else {
        bouton.className = "fa-solid fa-play";
        console.log("test");
        clearInterval(intervalle);
        intervalle = null;
        horlogeTourne = false;
    }
    
}

formulaire.addEventListener("submit", event => {
    event.preventDefault();
    retourFormulaire();
})

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
        }
    }

    if(changerValeurs(pauseMinutes, pauseSecondes)){
        if(nbMinRepos !=  pauseMinutes || nbSecRepos != pauseSecondes){
            nbMinRepos = pauseMinutes;
            nbSecRepos = pauseSecondes;
            chgt = true;
        }
    }
    if(chgt){
        enTravail = !enTravail;
        changerEtape();
    }
}

function changerValeurs(heures, minutes){
    if(heures.length > 2 || minutes.length > 2) return false;
    if(heures == "00" || minutes == "00") return false;
    if(heures == 0 && minutes == 0) return false;
    if(heures < 0 || minutes < 0) return false;
    return heures < 60 && minutes < 60;
}

parametres.addEventListener("click", event => {
    let formulaireDiv = document.getElementById("formulaireDiv");
    formulaireDiv.className = "formulaire"
})

fermer.addEventListener("click", event => {
    formulaireDiv.classList.add("cacher");
})


