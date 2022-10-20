
import AxpEntry from './axpEntry.js';
import Entry from "./entry.js";

const closeAxp = document.getElementById("closeAxp");
closeAxp.onclick= () => {
  document.getElementById("axpContainer").style.display = "none";
  const a = document.getElementById("axptitleInput");
  const b = document.getElementById("axpstartInput");
  const c = document.getElementById("axpendInput");
  const d = document.getElementById("axpdataInput");
  a.value = "";
  b.value = "";
  c.value = "";
  d.value = "";
}
const closeProj = document.getElementById("closeProj");
closeProj.onclick = () => {
  document.getElementById("inputContainer").style.display = "none";
  const a = document.getElementById("titleInput");
  const b = document.getElementById("startInput");
  const c = document.getElementById("endInput");
  const d = document.getElementById("dataInput");
  const e = document.getElementById("depInput");
  const f = document.getElementById("reqForInput");
  a.value = "";
  b.value = "";
  c.value = "";
  d.value = "";
  e.value = "";
  f.value = "";
  dependencies = [];
}
const redButton = document.getElementById("red");
const grnButton = document.getElementById("green");
const bluButton = document.getElementById("blue");
const addDep = document.getElementById("addDep");

addDep.onclick= function() {newDependency()};

redButton.onclick = () => {
  color = "red";
};
grnButton.onclick = () => {
  color = "greenyellow";
};
bluButton.onclick = () => {
  color = "cyan";
};

let color = "";
let dependencies = [];

export function newProj(type) {

  if (type == "axp"){
    const a = document.getElementById("axpContainer");
    a.style.display = "block";
  }
  else{
  const a = document.getElementById("inputContainer");
  a.style.display = "block";
  }
}

export function submitProject() {
  const a = document.getElementById("titleInput");
  const b = document.getElementById("startInput");
  const c = document.getElementById("endInput");
  const d = document.getElementById("dataInput");
  const e = document.getElementById("depInput");
  const f = document.getElementById("reqForInput");
   
  //if (a.value && b.value && c.value){
  console.log("validation successful");
  let proj = new Entry(
    a.value,
    calculateStartMonth(b.value),
    calculateEndMonth(c.value),
    d.value,
    dependencies,
    f.value,
    color,
    b.value,
    c.value
  );
  document.getElementById("inputContainer").style.display = "none";
  a.value = "";
  b.value = "";
  c.value = "";
  d.value = "";
  e.value = "";
  f.value = "";
  dependencies = [];
  return proj;
  // }
}

export function submitAxpEvent(){
  const a = document.getElementById("axptitleInput");
  const b = document.getElementById("axpstartInput");
  const c = document.getElementById("axpendInput");
  const d = document.getElementById("axpdataInput");

  let axp = new AxpEntry(
    a.value,
    calculateStartMonth(b.value),
    calculateEndMonth(c.value),
    d.value,
    "pink",
    b.value,
    c.value
  );
  document.getElementById("axpContainer").style.display = "none";
  a.value = "";
  b.value = "";
  c.value = "";
  d.value = "";
  return axp;
}

function calculateStartMonth(start) {
  let a = start[5].toString();
  let b = start[6].toString();
  let c = a + b;
  let d = parseInt(c);
  const today = new Date();
  let z = today.getMonth();
  d -= z;

  let e = start[2].toString();
  let f = start[3].toString();
  let g = parseInt(e + f);

  const currYear = today.getFullYear() - 2000;

  if (g > currYear) {
    d += 12 * (g - currYear);
  }

  return d;
}

function calculateEndMonth(end) {
  let a = end[5].toString();
  let b = end[6].toString();
  let c = a + b;
  let d = parseInt(c);
  const today = new Date();
  let z = today.getMonth();
  d -= z-1

  let e = end[2].toString();
  let f = end[3].toString();
  let g = parseInt(e + f);

  const currYear = today.getFullYear() - 2000;

  if (g > currYear) {
    d += 12 * (g - currYear);
  }

  return d;
}


function newDependency(){
    let output = document.getElementById("depInput");
    if(dependencies.includes(output.value) == false){
    dependencies.push(output.value);
    }
    else{ (window.alert("You already input " + output.value))}
    output.value = "";
}