var motds = [];

const projectItemT = `<div class="project-element hvr-grow">
<img class="project-image" src="{img}" alt="">
<h3>{name}</h3>
<p>{about}</p>
<a style='float: right; display:inline;' href=''>Source Code</a>
<br>
<a style='float: right; display:inline;' href=''>More</a>
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
    projects = `{"projects":[{"name":"Project1","desc":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel.","img":"img"},{"name":"Project2","desc":"desc","img":"img"}]}`; //load from file
    pdata = JSON.parse(projects);

    console.log(pdata.projects.length);

    for (i = 0; i < pdata.projects.length; i++) {
        formatted = projectItemT
            .replace(/{name}/g, pdata.projects[i].name)
            .replace(/{about}/g, pdata.projects[i].desc)
            .replace(/{img}/g, pdata.projects[i].img);
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