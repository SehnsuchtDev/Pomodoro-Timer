const temps = document.getElementById("time");
const travail = document.getElementById("travail");
const pause = document.getElementById("pause");
const bouton = document.getElementById("bouton");
const formulaire = document.getElementById("formulaire");
const parametres = document.getElementById("parametres");
const fermer = document.getElementById("fermer");

// console.log(document.cookie);

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


let intervalle;
let nbMinTravail;
let nbSecTravail;
let nbMinRepos;
let nbSecRepos;
let minActu;
let secActu;
let enTravail = true;

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
    if(localStorage.getItem("enTravail") == false){
        modePause();
    }
}

let horlogeTourne = false;
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
    let body = document.getElementById("fond");
    if(enTravail){
        modePause();
        localStorage.setItem("enPause",enPause);
        minActu = nbMinRepos;
        secActu = nbSecRepos;
        mettreAjourHorloge(minActu, secActu);
        
    }
    else {
        enTravail = true;
        localStorage.setItem("enPause",enPause);
        minActu = nbMinTravail;
        secActu = nbSecTravail;
        mettreAjourHorloge(minActu, secActu);
        pause.className = "attend";
        travail.className = "actuel";
        body.classList.remove("repos");
    }
    localStorage.setItem("minActu",minActu);
    localStorage.setItem("secActu",secActu);
}

function modePause(){
    enTravail = false;
    travail.className = "attend";
    pause.className = "actuel";
    body.classList.add("repos");
}

function mettreAjourHorloge(min, sec){
    localStorage.setItem("minActu",minActu);
    localStorage.setItem("secActu",secActu);
    if(sec < 10 || sec == "0") { 
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
            localStorage.setItem("nbMinTravail",nbMinTravail);
            localStorage.setItem("nbSecTravial",nbSecTravail);
        }
    }

    if(changerValeurs(pauseMinutes, pauseSecondes)){
        if(nbMinRepos !=  pauseMinutes || nbSecRepos != pauseSecondes){
            nbMinRepos = pauseMinutes;
            nbSecRepos = pauseSecondes;
            chgt = true;
            localStorage.setItem("nbMinPause",nbMinPause);
            localStorage.setItem("nbSecPause",nbSecPause);
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


