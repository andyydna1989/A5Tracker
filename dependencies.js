import { entities } from "./main.js";
import Entry from "./entry.js"


const list = document.getElementById("depsList");


//this function updates the drop-down list of dependencies in a new project entry upon creation of a new project.
export function updateDependencies(entry) {
  let dep = document.createElement("option");
  dep.classList.add("depOption");
  dep.innerHTML = entry.title;
  document.getElementById("depInput").appendChild(dep);
}

// this does the heavy-lifting of working out the critical path for a given project based on its dependencies.
export function dependencyRelationshipCalc(name){
  
  // this bit is identifying which project the modal is displaying
    let subject;
    const ignoreList = [];
    for (let i=0; i<entities[0].length; i++){
    
    if (name == entities[0][i].title){
        subject = entities[0][i];
    }
}
// this next section then iterates through the subject project's dependencies, adding the objects to an array (they are stored as strings on the original object)
if (subject){
    let subDeps = [...subject.dependencies];
    let subDepsEntries = [];
    
    for (let i=0; i<subDeps.length; i++){
    
        for (let j=0; j<entities[0].length; j++){
            
            if (subDeps[i] == entities[0][j].title){
                subDepsEntries.push(entities[0][j]);
                
            }
        }
    }
        subDepsEntries.forEach(testDepDuplication);
        subDepsEntries.sort(compareEndDates);
        subDepsEntries.forEach(HTMLListBuilder);
        

        // finally, if the dependency is not on the ignore list this function builds a new list item to display.
        function HTMLListBuilder(item){
            
            
           if (ignoreList.includes(item.title) == false){
            console.log("Drawing " + item.title);
            let entry = document.createElement("li");
            entry.style.backgroundColor = item.color;
            entry.className = "depsListEntry";
            if (item.dependencies.length > 0){
            entry.innerHTML = item.title + ", which ends " + item.rawEnd + ", which in turn depends on " + item.dependencies;
        }
        else{
            entry.innerHTML = item.title + ", which ends " + item.rawEnd;
        }
            list.appendChild(entry);
           }
        }

        // this is a tidying-up funtion, preventing display of a dependency that is already shown as a sub-dependency.
        function testDepDuplication(item){
            for (let i = 0; i<item.dependencies.length; i++){
                for (let j=0; j < subDepsEntries.length; j++){
                    if (item.dependencies[i] == subDepsEntries[j].title){
                        console.log("we got a match!" + item.dependencies[i]);
                        ignoreList.push(item.dependencies[i]);
                        console.log("ignoring " + ignoreList);
                        
                    }
                }
            }
            console.log(ignoreList.includes(item.title));
            console.log(item.title);
        }


}

}
// this is a sorting function for the critical path.
function compareEndDates(a, b){
    return a.end - b.end;
}



function returnTitles(entry){
    console.log(entry.title);
}

