

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