var motds = [];

const projectItemT = `<div class="project-element hvr-grow">
<a href='{main}'><img class="project-image" src="{img}" alt=""></img></a>
<h3>{name}</h3>
<p>{about}</p>
<a class="highlight-btn" style='position: absolute; right:2px; bottom: 50px;' href='{main}'><img class="highlight-btn2" src='content/image/more.png' width='46px' height='46px'/></a>
<a class="highlight-btn" style='position: absolute; right:2px; bottom: 2px;' href='{source}'><img class="highlight-btn2" src='content/image/github.png' width='46px' height='46px'/></a>
</div>`;


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
        nextMotd(50);
    }, 20000);
}

function loadProjects() {
    projects = readTextFile("content/projects.json");
    pdata = JSON.parse(projects);

    console.log(pdata.projects.length);

    for (i = 0; i < pdata.projects.length; i++) {
        formatted = projectItemT
            .replace(/{name}/g, pdata.projects[i].name)
            .replace(/{about}/g, pdata.projects[i].desc)
            .replace(/{img}/g, pdata.projects[i].img)
            .replace(/{source}/g, pdata.projects[i].source)
            .replace(/{main}/g, pdata.projects[i].main);
        document.getElementById("projects").innerHTML = document.getElementById("projects").innerHTML + formatted;
    }
}

function nextMotd(w) {
    r = Math.floor(Math.random() * motds.length);
    printText(motds[r], "motd", w);
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