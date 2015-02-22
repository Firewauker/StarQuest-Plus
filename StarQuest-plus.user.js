// ==UserScript==
// @name         StarQuest Plus BETA
// @namespace    
// @version      0.31.1
// @description  
// @author       Firewauker
// @match        http://*.starsquest.co.uk/*
// @grant        GM_log
// @grant        GM_setValue
// @grant        GM_getValue
// @require      http://code.jquery.com/jquery-latest.js

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


function getHtmlFromURL(url){
    return $.ajax({
        type: "GET",
        url: url,
        async: false
    }).responseText;   
    
}

function FormatIntToString(int){
    
    if(int > 1000000000000)
        return (int/1000000000000).toFixed(1)+ "B";
    if(int > 1000000)
        return (int/1000000).toFixed(1) + "M";
    if(int > 1000)
        return (int/1000).toFixed(1) + "K";
    
    GM_log(int);
    return int.toFixed(1);
}

function Contains(string,char){
    if(string.indexOf(char) > -1)
        return true;
    return false;
}

function getAvailableNumbers(id){
    
    var elem = document.getElementById(id);
    if(elem === null)
        return 0;
    
    var inner = elem.innerHTML;
    
    var match = inner.match(/\(Disponible:  (.*)\)/);
    GM_log(match);
    
    var cleaner = 0;
    if(match !== null){
        cleaner =  match[1];
        
        while(Contains(cleaner,".")){
            cleaner = cleaner.replace(".", "");
        }
    }
    GM_log("Clean: "+cleaner)
    
    return parseInt(cleaner);    
}
function defenseValues(){
    var defense = new Array();
    
    defense[0] = new Array('Canon léger','val_401',90,20,2000);
    defense[1] = new Array('Canon lourd','val_402',150,40,2000);
    defense[2] = new Array('Plate-forme canon','val_403',600,300,8000);    
    defense[3] = new Array('Canon Guauss','val_404',1500,1000,35000);       
    defense[4] = new Array('Plate-forme ionique','val_405',400,600,8000); 
    defense[5] = new Array('Plate-forme plasma','val_406',8000,2400,100000);  
    defense[6] = new Array('Champ de force','val_407',1,10000,20000);
    defense[7] = new Array('Ultra bouclier','val_408',1,50000,100000);
    
    return defense;
}

function defensePanel(){
    var def = defenseValues();
    var nb;
    
    for(var i= 0; i < def.length; i++)
    {
        nb = getAvailableNumbers(def[i][1]);
        def[i][5] = nb;
    }
    insertTableDefense(def);
}



function insertTableDefense(def){
    var elem = document.getElementById("tabs");
    
    var table = document.createElement('div');
    table.id = 'calculTable';
    elem.insertBefore(table,document.getElementById("tabs-1"));
    
    table.innerHTML =  createResearchTable();
    table.innerHTML += createDefenseTable(def);
    
}

function createDefenseTable(def){
    
    var strBuilder = "<table><tr><th>Defense</th><th>Attack</th><th>Shield</th><th>Armor</th><th>Units</th>";
    strBuilder += "<th>TAttack</th><th>TShield</th><th>TArmor</th>";
    strBuilder += "</tr>";
    
    var TOTUnits = 0;
    var TOTAttack = 0;
    var TOTShield = 0;
    var TOTArmor = 0;
    
    for(var i = 0; i < def.length; i++){
        strBuilder += "<tr>";                    
        for(var cpt = 0; cpt < 6; cpt++){
            if(cpt == 0)
                strBuilder += "<td>" +def[i][cpt]+"</td>";
            else if(cpt != 1)
                strBuilder += "<td>" +FormatIntToString(def[i][cpt])+"</td>";
                
                }
        
        TOTUnits += def[i][5];
        TOTAttack += (def[i][2] * def[i][5]) * ((GM_getValue('RWeapons')+10)/10);
        TOTShield += def[i][3] * def[i][5] * ((GM_getValue('RShield')+10)/10);
        TOTArmor += def[i][4] * def[i][5] * ((GM_getValue('RArmor')+10)/10);
        
        
        strBuilder += "<td>"+ FormatIntToString(def[i][2] * def[i][5]);
        strBuilder += "<span style='color:yellow'>(+"+ FormatIntToString(((def[i][2] * def[i][5]) * ((GM_getValue('RWeapons')+10)/10))-(def[i][2] * def[i][5])) +")</span></td>";
        strBuilder += "<td>"+ FormatIntToString(def[i][3] * def[i][5]);
        strBuilder += "<span style='color:yellow'>(+"+ FormatIntToString(((def[i][3] * def[i][5]) * ((GM_getValue('RShield')+10)/10))-(def[i][3] * def[i][5])) +")</span></td>";
        strBuilder += "<td>"+ FormatIntToString(def[i][4] * def[i][5]) 
        strBuilder += "<span style='color:yellow'>(+"+ FormatIntToString(((def[i][4] * def[i][5]) * ((GM_getValue('RArmor')+10)/10))-(def[i][4] * def[i][5])) +")</span></td>";
        
        strBuilder += "<tr>";        
    }
    
    strBuilder += "<td></td><td></td><td></td><td></td><td>"+FormatIntToString(TOTUnits)+"</td><td>"+FormatIntToString(TOTAttack)+"</td><td>"+FormatIntToString(TOTShield)+"</td><td>"+FormatIntToString(TOTArmor)+"</td>";
    strBuilder += "</table>"; 
    
    return strBuilder;   
}

function attackValues(){
    var attack = new Array();
    
    
    attack[0] = {Name:'Transporteur léger',ID:'val_202',Attack:5,Shield:10,Load:5000};
    attack[1] = {Name:'Transporteur lourd',ID:'val_203',Attack:5,Shield:25,Load:25000};
    attack[2] = {Name:'Chasseur léger',ID:'val_204',Attack:50,Shield:10,Load:2000};
    attack[3] = {Name:'Chasseur lourd',ID:'val_205',Attack:150,Shield:25,Load:2500};
    attack[4] = {Name:'Intercepteur',ID:'val_206',Attack:400,Shield:50,Load:3000};
    attack[5] = {Name:'Cuirassé',ID:'val_207',Attack:1000,Shield:200,Load:4000};
    attack[6] = {Name:'Colonisateur',ID:'val_208',Attack:50,Shield:100,Load:5000};
    attack[7] = {Name:'Recycleur',ID:'val_209',Attack:1,Shield:10,Load:100000};
    attack[8] = {Name:'Sonde',ID:'val_210',Attack:0,Shield:0,Load:15};
    attack[9] = {Name:'Bombardier',ID:'val_211',Attack:1000,Shield:500,Load:10000};
    attack[10] = {Name:'Vaisseau mère',ID:'val_213',Attack:2250,Shield:1000,Load:12000};
    attack[11] = {Name:'Etoile de la mort',ID:'val_214',Attack:85000,Shield:80000,Load:1000000};
    attack[12] = {Name:'Exterminateur',ID:'val_215',Attack:1500,Shield:750,Load:10000};
    attack[13] = {Name:'Vaisseau d\'expédition',ID:'val_225',Attack:1,Shield:300,Load:5000};

    return attack;
}




function attackPanel(){
    var attack = attackValues();
    var nb;
    
    for(var i= 0; i < attack.length; i++)
    {
        attack[i].Units = getAvailableNumbers(attack[i].ID);
    }
    GM_log(attack);
    insertTableAttack(attack);
}



function insertTableAttack(attack){
    var elem = document.getElementById("tabs");
    
    var table = document.createElement('div');
    table.id = 'calculTable';
    elem.insertBefore(table,document.getElementById("tabs-1"));
    
    table.innerHTML =  createResearchTable();
    table.innerHTML += createAttackTable(attack);
    
}

function createAttackTable(attack){
    var strBuilder = "<table><tr><th>Nom</th><th>Attack</th><th>Shield</th><th>Load</th><th>Units</th>";
    strBuilder += "<th>TAttack</th><th>TShield</th><th>TLoad</th>";
    strBuilder += "</tr>";
    
    var TOTUnits = 0;
    var TOTAttack = 0;
    var TOTShield = 0;
    var TOTLoad = 0;
    
    for(var i = 0; i < attack.length; i++){
        strBuilder += "<tr>";    
        strBuilder += "<td>" +attack[i].Name+"</td>"; 
        strBuilder += "<td>" +attack[i].Attack+"</td>"; 
        strBuilder += "<td>" +attack[i].Shield+"</td>"; 
        strBuilder += "<td>" +attack[i].Load+"</td>"; 
        strBuilder += "<td>" +attack[i].Units+"</td>"; 

        
        TOTUnits += attack[i].Units;
        TOTAttack += (attack[i].Attack * attack[i].Units) * ((GM_getValue('RWeapons')+10)/10);
        TOTShield += attack[i].Shield * attack[i].Units * ((GM_getValue('RShield')+10)/10);
        TOTLoad += attack[i].Load * attack[i].Units
        
        
        
        strBuilder += "<td>"+ FormatIntToString(attack[i].Attack * attack[i].Units);
        strBuilder += "<span style='color:yellow'>(+"+ FormatIntToString(((attack[i].Attack * attack[i].Units) * ((GM_getValue('RWeapons')+10)/10))-(attack[i].Attack * attack[i].Units)) +")</span></td>";
        strBuilder += "<td>"+ FormatIntToString(attack[i].Shield * attack[i].Units);
        strBuilder += "<span style='color:yellow'>(+"+ FormatIntToString(((attack[i].Shield * attack[i].Units) * ((GM_getValue('RShield')+10)/10))-(attack[i].Shield * attack[i].Units)) +")</span></td>";
        strBuilder += "<td>"+ FormatIntToString(attack[i].Load * attack[i].Units) + "</td>";
        
        strBuilder += "<tr>";        
    }
    
    strBuilder += "<td></td><td></td><td></td><td></td><td>"+FormatIntToString(TOTUnits)+"</td><td>"+FormatIntToString(TOTAttack)+"</td><td>"+FormatIntToString(TOTShield)+"</td><td>"+FormatIntToString(TOTLoad)+"</td>";
    strBuilder += "</table>"; 
    
    return strBuilder;   
}




controller();