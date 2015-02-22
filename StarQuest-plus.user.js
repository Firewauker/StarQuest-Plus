// ==UserScript==
// @name         StarQuest Plus
// @namespace    
// @version      0.21
// @description  
// @author       Firewauker
// @match        http://*.starsquest.co.uk/*
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// @require      http://code.jquery.com/jquery-latest.js
// @require      defense.js
// @require      common.js
// @require      attack.js
// ==/UserScript==


function controller(){
    var url = document.URL;
    if(url.match(/mode=defense/)){
        defensePanel();
        return;
    }
    
    if(url.match(/mode=fleet/)){
        attackPanel();
        return;
    }
    
}


function createResearchTable(){
    
    var result = getHtmlFromURL("http://s3.starsquest.co.uk/game.php?page=imperium");
    
    var rweapons = result.match(/\Equipement:<br \/><b>Niveau (.*)\"/);
    GM_setValue("RWeapons",parseInt(rweapons[1]));
    var rshield = result.match(/\Bouclier:<br \/><b>Niveau (.*)\"/);
    GM_setValue("RShield",parseInt(rshield[1]));
    var rarmor = result.match(/\Blindage:<br \/><b>Niveau (.*)\"/);
    GM_setValue("RArmor",parseInt(rweapons[1]));
    
    var strBuilder = "<table><tr><th>Weapons</th><th>Shield</th><th>Armor</th>";
    
    strBuilder += "<tr><td>"+(parseInt(rweapons[1])+10)*10+"%</td><td>"+(parseInt(rshield[1])+10)*10+"%</td><td>"+(parseInt(rweapons[1])+10)*10+"%</td></tr>";
    strBuilder+= "</table>";
    return strBuilder;   
}

controller();