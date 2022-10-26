import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCqlvElJZ--P-xDggRep1Vp26bWrTwToSU",
  authDomain: "a5gantt.firebaseapp.com",
  projectId: "a5gantt",
  storageBucket: "a5gantt.appspot.com",
  messagingSenderId: "44189324270",
  appId: "1:44189324270:web:b08ea3d9eca6af272c34ff",
};

const app = initializeApp(firebaseConfig);

import * as newProjEntry from "./addProject.js";
import build from "./builder.js";
import Entry from "./entry.js";
import AxpEntry from "./axpEntry.js";
import {
  updateDependencies,
  dependencyRelationshipCalc,
} from "./dependencies.js";

const axpEvents = [];
const projects = [];
const storage = window.localStorage;
let selected = null;


// dev tool in place of backend
const load = document.getElementById("loadButton");
load.onclick = () => {
    let importedProjects = storage.getItem("saved");
    importedProjects = JSON.parse(importedProjects);
    console.log(importedProjects);
    for (let i=0; i<importedProjects.length; i++){
        projects.push(importedProjects[i]);
        drawEntry(importedProjects[i], false);
        updateDependencies(importedProjects[i]);
    };
    let importedAxp = storage.getItem("axp");
    importedAxp = JSON.parse(importedAxp);
    for (let j=0; j<importedAxp.length; j++){
        axpEvents.push(importedAxp[j]);
        drawEntry(importedAxp[j], true);
    }
}
const save = document.getElementById("saveButton");
save.onclick = () => {
    const tempProjects = JSON.stringify(projects);
    storage.setItem("saved", tempProjects);
    const tempAxp = JSON.stringify(axpEvents);
    storage.setItem("axp", tempAxp);
};



export const entities = [projects];
// imperatives for DOM elements
const axpButton = document.getElementById("axpButton");
axpButton.onclick = () => {
  newProjEntry.newProj("axp");
};

const inputButton = document.getElementById("projButton");
inputButton.onclick = () => newProjEntry.newProj();
const projSubButton = document.getElementById("projSubButton");
projSubButton.onclick = function () {
  newProjAdded();
};
const axpSubButton = document.getElementById("axpSubButton");
axpSubButton.onclick = function () {
  newAxpAdded();
};

// handler functions for creation of new elements

function newProjAdded() {
  const a = newProjEntry.submitProject();
  projects.push(a);
  drawEntry(a, false);
  updateDependencies(a);
}

function newAxpAdded() {
  const a = newProjEntry.submitAxpEvent();
  axpEvents.push(a);
  drawEntry(a, true);
}

// tells the app where to start rendering.
let currentRow = 4;

//modal elements
const container = document.getElementById("container");
const items = document.getElementsByClassName("item");
const modal1 = document.getElementById("modal1");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalStartDate = document.getElementById("modalStartDate");
const modalEndDate = document.getElementById("modalEndDate");
const modalData = document.getElementById("modalData");
const modalDependencies = document.getElementById("modalDependencies");
const modalRequiredFor = document.getElementById("modalRequiredFor");

closeModal.onclick = function () {
  modal1.dataset.close;
  modal1.style.visibility = "hidden";
  modal1.style.opacity = "0";
  // this removes the drawn dependencies once the modal is closed.
  let cleanUpDeps = () => {
    let a = document.getElementById("depsList");
    while (a.firstChild) {
      a.removeChild(a.firstChild);
    }
  };
  cleanUpDeps();
};
for (let i = 0; i < items.length; i++) {
  items[i].setAttribute("data-open", "modal");
  items[i].onclick = function () {
    loadItemModal(items[i]);
  };
}






function drawEntry(ganttEntry, isAxp) {
  let entry = document.createElement("div");
  entry.innerHTML = ganttEntry.title;

  if (isAxp == false) {
    entry.style.gridRowStart = currentRow;
    entry.style.gridColumnStart = ganttEntry.start;
    entry.style.gridColumnEnd = ganttEntry.end;
    entry.style.backgroundColor = ganttEntry.color;
    entry.classList.add("item");
    entry.setAttribute("data-open", "modal");
    entry.ondblclick = function () {
      loadItemModal(entry);
    };
    entry.onclick = function (event) {
      console.log(event.target);
      selected = event.target;
      styleSelected();
    }
    addClassAttributes(entry, ganttEntry, false);
    currentRow++;
  } else if (isAxp == true) {
    
    entry.style.gridRowStart = isRow1Free(ganttEntry);
    entry.style.gridColumnStart = ganttEntry.start;
    entry.style.gridColumnEnd = ganttEntry.end;
    entry.style.backgroundColor = ganttEntry.color;
    entry.classList.add("item");
    entry.onclick = function () {
      console.log("I'm an AXP entry!");
    };
    addClassAttributes(entry, ganttEntry, true);
  }
  container.appendChild(entry);
}

function loadItemModal(entry) {
  modal1.dataset.open;
  modal1.style.visibility = "visible";
  modal1.style.opacity = "0.9";
  modalTitle.innerHTML = entry.title;
  modalStartDate.innerHTML = entry.getAttribute("start");
  modalEndDate.innerHTML = entry.getAttribute("end");
  modalData.innerHTML = entry.getAttribute("data");
  modalDependencies.innerHTML = entry.getAttribute("dependencies");
  modalRequiredFor.innerHTML = entry.getAttribute("requiredFor");
  dependencyRelationshipCalc(modalTitle.innerHTML);
}

//necessary to ensure the functionality and styling are correct on an entry.
function addClassAttributes(entry, Entry, isAxp) {
  entry.setAttribute("title", Entry.title);
  entry.setAttribute("start", Entry.rawStart.toString());

  entry.setAttribute("end", Entry.rawEnd.toString());
  entry.setAttribute("data", Entry.data);
  if ((isAxp == false)) {
    entry.setAttribute("dependencies", Entry.dependencies.toString());
    entry.setAttribute("requiredFor", Entry.requiredFor.toString());
  }
}

function isRow1Free(entry){
    //this is necessary to avoid an event conflicting with itself.
    const tempEvents = [...axpEvents];
    tempEvents.pop();
    if(tempEvents.length >0) {
    for (let i=0; i<tempEvents.length; i++){
        if (entry.end < tempEvents[i].start || entry.start > tempEvents[i].end ){
            return 2;
        }
        else{
            return 3;
        }
    }
}
else { return 2;}
}

window.addEventListener("keydown", function(event) {
  if(selected !== null){

  if(event.key == "ArrowUp" || event.key == "ArrowDown"){
  event.preventDefault();
  }
  if(event.key=="ArrowUp" && selected.style.gridRowStart > 3){
  selected.style.gridRowStart = processUpPress(selected.style.gridRowStart);
  console.log(selected.style.gridRowStart);
  
  }
  else if (event.key=="ArrowDown"){
    selected.style.gridRowStart = processDownPress(selected.style.gridRowStart)
    console.log(selected.style.gridRowStart);
  }
}
})

// styles return strings so a pair of converter functions
function processUpPress(row){
let entries = document.getElementsByClassName("item");
let a = parseInt(row);
a -=1;
if(checkRowFree(selected, a, entries)){
  return a.toString();
}
else {return row};
}

function processDownPress(row){
  let counter =0;
  let entries = document.getElementsByClassName("item");
  let a = parseInt(row);

for (let i=0; i<entries.length; i++){
  if (entries[i].style.gridRowStart+1 > counter){
    counter = entries[i].style.gridRowStart;
  }
}

if(a < counter){
  a +=1;
  if(checkRowFree(selected, a, entries)){
  return a.toString();
  }
  else {return row}
}

else {return row}
  
  }

  // prevents overlap of projects
function checkRowFree(item, newRow, itemsArray){
let itemStart = (Date.parse(item.getAttribute("start")));
let itemEnd = (Date.parse(item.getAttribute("end")));
  let tester = 0;

  for (let i=0; i<itemsArray.length; i++){
  if (parseInt(itemsArray[i].style.gridRowStart) == newRow){
    
    let tempStart = (Date.parse(itemsArray[i].getAttribute("start")));
    let tempEnd = (Date.parse(itemsArray[i].getAttribute("end")));

    if(itemStart > tempEnd || itemEnd< tempStart){
      console.log("No clash");
      
    }
    else {tester++; console.log("Clash!")}
  }
}
if (tester > 0){
  return false;
}
else return true;
}

function styleSelected(){
  
  let entries = document.getElementsByClassName("item");
  for (let i=0; i<entries.length; i++){
    entries[i].style.borderColor = "";
    entries[i].style.fontSize = "";
  }
  selected.style.borderColor = "blue";
  selected.style.fontSize = "larger";
  
  

}