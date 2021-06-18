var motds = [];

const projectItemT = `<div class="project-element hvr-grow">
<a href='{main}'><img class="project-image" src="{img}" alt=""></img></a>
<h3 style="display: inline-block;">{name}</h3><img src="{typeicon}" width="20px" height="20px" style="float: left;" />
<p>{about}</p>
<a class="highlight-btn more" style='position: absolute; right:2px; bottom: 50px;' href='{main}'><img class="highlight-btn2" src='content/image/more.png' width='46px' height='46px'/></a>
<a class="highlight-btn ghub" style='position: absolute; right:2px; bottom: 2px;' href='{source}'><img class="highlight-btn2" src='content/image/github.png' width='46px' height='46px'/></a>
</div>`;
const appItemT = `<div class="quicklink">
<a href="{applink}">
    <img src="{appicon}">
    <h4>{appname}</h4>
</a>
</div>`;

const artItemT = `<div class="art-element">
<h2>{arttitle}</h2>
<h3>{arttype} &middot {artdate}</h3>
<div class="art-element-content">
{arthtml}
</div>
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
    motdlist = readTextFile("/content/motd.txt");
    motds = motdlist.split('\n');
    setInterval(function() {
        nextMotd(50);
    }, 20000);
}

function loadProjects(tag = "") {

    document.getElementById("cat-all").classList.remove("highlight-btn-selected");
    document.getElementById("cat-app").classList.remove("highlight-btn-selected");
    document.getElementById("cat-game").classList.remove("highlight-btn-selected");
    document.getElementById("cat-plugin").classList.remove("highlight-btn-selected");

    switch (tag) {

        case "":
            document.getElementById("cat-all").classList.add("highlight-btn-selected");
            break;
        case "app":
            document.getElementById("cat-app").classList.add("highlight-btn-selected");
            break;
        case "game":
            document.getElementById("cat-game").classList.add("highlight-btn-selected");
            break;
        case "plugin":
            document.getElementById("cat-plugin").classList.add("highlight-btn-selected");
            break;
    }


    projects = readTextFile("/content/projects.json");
    pdata = JSON.parse(projects);

    console.log(pdata.projects.length);
    document.getElementById("projects").innerHTML = "";
    for (i = 0; i < pdata.projects.length; i++) {
        formatted = projectItemT
            .replace(/{name}/g, pdata.projects[i].name)
            .replace(/{about}/g, pdata.projects[i].desc)
            .replace(/{img}/g, pdata.projects[i].img)
            .replace(/{source}/g, pdata.projects[i].source)
            .replace(/{main}/g, pdata.projects[i].main)
            .replace(/{typeicon}/, getIconFor(pdata.projects[i].type));
        if (pdata.projects[i].source == "null") {
            formatted = formatted.replace(/ghub/g, "invisible");
        }
        if (pdata.projects[i].type == tag || tag == "")
            document.getElementById("projects").innerHTML = document.getElementById("projects").innerHTML + formatted;
    }
}

function loadArt() {
    arts = readTextFile("/content/arts.json");
    pdata = JSON.parse(arts);

    console.log(pdata.arts.length);
    document.getElementById("art").innerHTML = "";
    for (i = 0; i < pdata.arts.length; i++) {
        formatted = artItemT
            .replace(/{arttitle}/g, pdata.arts[i].title)
            .replace(/{arttype}/g, pdata.arts[i].type)
            .replace(/{arthtml}/g, pdata.arts[i].html)
            .replace(/{artdate}/g, pdata.arts[i].date);
        document.getElementById("art").innerHTML = document.getElementById("art").innerHTML + formatted;
    }
}

function loadApps() {


    projects = readTextFile("/content/apps.json");
    pdata = JSON.parse(projects);

    console.log(pdata.projects.length);
    document.getElementById("quicklinks").innerHTML = "";
    for (i = 0; i < pdata.projects.length; i++) {
        formatted = appItemT
            .replace(/{appname}/g, pdata.projects[i].name)
            .replace(/{applink}/g, pdata.projects[i].url)
            .replace(/{appicon}/g, pdata.projects[i].img);
        document.getElementById("quicklinks").innerHTML = document.getElementById("quicklinks").innerHTML + formatted;
    }
}

function getIconFor(type) {
    if (type == "app")
        return "/content/image/settings.png";
    else
    if (type == "plugin")
        return "/content/image/puzzle--v1.png";
    else
    if (type == "game")
        return "/content/image/controller.png";
    else
        return "/content/image/hash.png";

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