var motds = [];


function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText;
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;

            }
        }
    }
    rawFile.send(null);
    return allText;

}

function loadMotds() {
    console.log("Requesting motd file...");
    motdlist = readTextFile("content/motd.txt");
    motds = motdlist.split('\n');
    setInterval(function() {
        nextMotd();
    }, 20000);
}

function nextMotd() {
    r = Math.floor(Math.random() * motds.length);
    printText(motds[r], "motd", 50);
}

function printText(text, elementId, speed) {
    pt = "";
    var c;
    for (c = 0; c < text.length; c++) {
        pt = pt + text[c];
        setTimeout(function(pt) {
            document.getElementById(elementId).innerHTML = pt;
        }, speed * c, pt); //cool
    }
}