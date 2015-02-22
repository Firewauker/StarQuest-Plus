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
        GM_log(TOTAttack +" = "+ def[i][2] + "*"+def[i][5]+" | * "+ GM_getValue('RWeapons'));
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
