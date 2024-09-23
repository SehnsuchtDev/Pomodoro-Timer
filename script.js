const temps = document.getElementById("time");
const travail = document.getElementById("travail");
const pause = document.getElementById("pause");

let nbMinTravail = 0;
let nbSecTravail = 10;

let nbMinRepos = 10;
let nbSecRepos = 0;

let isTravail = true;

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
    console.log("test");
}

function changerEtape(){
    if(isTravail){
        isTravail = false;
        minActu = nbMinRepos;
        secActu = nbSecRepos;
        mettreAjourHorloge(minActu, secActu);
        travail.classList.remove("actuel");
        travail.classList.add("attend")
        pause.classList.remove("attend")
        pause.classList.add("actuel");

    }
    else {
        isTravail = true;
        minActu = nbMinTravail;
        secActu = nbSecTravail;
        mettreAjourHorloge(minActu, secActu);
        pause.classList.remove("actuel");
        pause.classList.add("attend")
        travail.classList.remove("attend")
        travail.classList.add("actuel");
    }
}

function mettreAjourHorloge(min, sec){
    if(sec < 10) { 
        temps.innerText = min + ":0" + sec;
        return;
    }
    temps.innerText = min + ":" + sec;
}

setInterval(diminuerTemps, 1000);