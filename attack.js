function attackValues(){
    var attack = new Array();
    
    attack[0] = new Array(Name:'Transporteur léger',ID:'val_202',Attack:5,Shield:10,Load:5000);
    attack[1] = new Array(Name:'Transporteur lourd',ID:'val_203',Attack:5,Shield:25,Load:25000);
    attack[2] = new Array(Name:'Chasseur léger',ID:'val_204',Attack:50,Shield:10,Load:2000);
    attack[3] = new Array(Name:'Chasseur lourd',ID:'val_205',Attack:150,Shield:25,Load:2500);
    attack[4] = new Array(Name:'Intercepteur',ID:'val_206',Attack:400,Shield:50,Load:3000);
    attack[5] = new Array(Name:'Cuirassé',ID:'val_207',Attack:1000,Shield:200,Load:4000);
    attack[6] = new Array(Name:'Colonisateur',ID:'val_208',Attack:50,Shield:100,Load:5000);
    attack[7] = new Array(Name:'Recycleur',ID:'val_209',Attack:1,Shield:10,Load:100000);
    attack[8] = new Array(Name:'Sonde',ID:'val_210',Attack:0,Shield:0,Load:15);
    attack[9] = new Array(Name:'Bombardier',ID:'val_211',Attack:1000,Shield:500,Load:10000);
    attack[10] = new Array(Name:'Vaisseau mère',ID:'val_213',Attack:2250,Shield:1000,Load:12000);
    attack[11] = new Array(Name:'Etoile de la mort',ID:'val_214',Attack:85000,Shield:80000,Load:1000000);
    attack[12] = new Array(Name:'Exterminateur',ID:'val_215',Attack:1500,Shield:750,Load:10000);
    attack[13] = new Array(Name:'Vaisseau d\'expédition',ID:'val_225',Attack:1,Shield:300,Load:5000);

    return attack;
}




function attackPanel(){
    var attack = attackValues();
    var nb;
    
    for(var i= 0; i < def.length; i++)
    {
        nb = getAvailableNumbers(attack[i].ID);
        def[i].Units = nb;
    }
    insertTableAttack(attack);
}



function insertTableDefense(attack){
    var elem = document.getElementById("tabs");
    
    var table = document.createElement('div');
    table.id = 'calculTable';
    elem.insertBefore(table,document.getElementById("tabs-1"));
    
    table.innerHTML =  createResearchTable();
    table.innerHTML += createAttackTable(attack);
    
}

function createAttackTable(attack){
    var strBuilder = "<table><tr><th>Nom</th><th>Attack</th><th>Shield</th><th>Load</th><th>Units</th>";
    strBuilder += "<th>TAttack</th><th>TShield</th><th>TArmor</th>";
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
        strBuilder += "<td>"+ FormatIntToString(attack[i]?Shield * attack[i].Units);
        strBuilder += "<span style='color:yellow'>(+"+ FormatIntToString(((attack[i].Shield * attack[i].Units) * ((GM_getValue('RShield')+10)/10))-(attack[i].Shield * attack[i].Units)) +")</span></td>";
        strBuilder += "<td>"+ FormatIntToString(attack[i].Load * attack[i].Units) + "</td>";
        
        strBuilder += "<tr>";        
    }
    
    strBuilder += "<td></td><td></td><td></td><td></td><td>"+FormatIntToString(TOTUnits)+"</td><td>"+FormatIntToString(TOTAttack)+"</td><td>"+FormatIntToString(TOTShield)+"</td><td>"+FormatIntToString(TOTLoad)+"</td>";
    strBuilder += "</table>"; 
    
    return strBuilder;   
}



