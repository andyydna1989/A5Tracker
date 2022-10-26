// hard coded demo entries
const entry1 = {
  data: "Portreath T102 Servicing",
  recall: "1hr",
  type: "radar",
  startDay: 10,
  endDay: 15,
  month: 10,
  year: 2022,
};

const entry2 = {
  data: "Benbecula T92 Servicing",
  recall: "2hrs",
  type: "radar",
  startDay: 20,
  endDay: 25,
  month: 10,
  year: 2022,
};

const entry3 = {
  data: "Boulmer radio Servicing",
  recall: "0.5hr",
  type: "radio",
  startDay: 25,
  endDay: 28,
  month: 10,
  year: 2022,
};

const entry4 = {
  data: "Portreath T102 Servicing",
  recall: "1hr",
  type: "radar",
  startDay: 20,
  endDay: 25,
  month: 0,
  year: 2023,
};

const entries = [entry1, entry2, entry3, entry4];
let currentSubject;

export function loadTacView(subject) {
  currentSubject = subject;
  console.log(subject);
  const header = document.getElementById("monthHeader");
  header.innerHTML = "Month Events " + currentSubject.innerHTML + " " + subject.getAttribute("year");
  // main tacview month display items
  const bigCont = document.getElementById("tacViewCont");
  const cont = document.getElementById("monthEntries");
  if (bigCont.style.display !== "inline") {
    const close = document.getElementById("closeTac");
    close.onclick = function () {
      closeDown(cont, bigCont);
    };

    const newEntryButton = document.getElementById("openAddMonthEventMenu");
    newEntryButton.onclick = () => newEventMenuOpen();

    // new event sub menu items
    const closeNewEventButton = document.getElementById("closeNewEvent");
    closeNewEventButton.onclick = () => closeTacEdit();

    bigCont.style.display = "inline";

    //checks entry validity for inclusion from a universal list of events.

    for (let i = 0; i < entries.length; i++) {
      if (
        entries[i].month == subject.getAttribute("month") &&
        entries[i].year == subject.getAttribute("year")
      ) {
        buildEntry(entries[i], cont);
      }
    }
  }
}
function closeDown(cont, bigCont) {
  bigCont.style.display = "none";
  while (cont.firstChild) {
    cont.removeChild(cont.firstChild);
  }
}

function buildEntry(entry, cont) {
  let item = document.createElement("div");
  item.className = "monthEventEntry";
  item.innerHTML = entry.data;
  cont.appendChild(item);
  const start = document.createElement("p");
  start.className = "monthEventEntryMeta";
  start.innerHTML = "Start Day: " + entry.startDay;
  item.appendChild(start);
  const end = document.createElement("p");
  end.className = "monthEventEntryMeta";
  end.innerHTML = "End Day: " + entry.endDay;
  item.appendChild(end);
  const recall = document.createElement("p");
  recall.className = "monthEventEntryMeta";
  recall.innerHTML = "Recall: " + entry.recall;
  item.appendChild(recall);
}

function newEventMenuOpen() {
  console.log("new event on click triggered");
  const cont = document.getElementById("newEventMenu");
  cont.style.display = "inline";
  const subButton = document.getElementById("newEventSubButton");
  subButton.onclick = () => addNewEvent();
}

function addNewEvent() {
  const a = document.getElementById("tacTitleInput");
  const b = document.getElementById("tacStartInput");
  const c = document.getElementById("tacEndInput");
  const d = document.getElementById("recallInput");

  const x = {
    data: a.value,
    recall: d.value,
    type: "radar",
    startDay: b.value[8].toString() + b.value[9].toString(),
    endDay: c.value[8].toString() + c.value[9].toString(),
    month: b.value[5].toString() + b.value[6].toString(),
    year:
      b.value[0].toString() +
      b.value[1].toString() +
      b.value[2].toString() +
      b.value[3].toString(),
  };
  // the -1 here is to account for 0 index on currentSubject object.
  if (currentSubject.getAttribute("month") == x.month - 1) {
    // logic for checking quality of date entry and managing events that straddle months
    const endMonth = parseInt(c.value[5].toString() + c.value[6].toString());
    const startMonth = parseInt(b.value[5].toString() + b.value[6].toString());
    const startDay = parseInt(b.value[8].toString() + b.value[9].toString());
    const endDay = parseInt(c.value[8].toString() + c.value[9].toString());
    const endYear = parseInt(
      c.value[0].toString() +
        c.value[1].toString() +
        c.value[2].toString() +
        c.value[3].toString()
    );

    if (endMonth >= startMonth || endYear > x.year) {
      if (endDay >= startDay) {
        console.log("verification successful for new event");
        //the below month adjustment is to account for 0-indexing during the load function for tacView each month, 
        //else it will always reload the event in the next month if you leave the tacView and reload.
        x.month = startMonth-1;
        entries.push(x);
        const cont = document.getElementById("monthEntries");
        buildEntry(x, cont);
        const newMenu = document.getElementById("newEventMenu");
  newMenu.style.display = "none";
  a.value = "";
  b.value = "";
  c.value = "";
  d.value = "";
        
      } else if(endMonth>startMonth) {
        console.log("verified, but straddles month");
        x.endDay += " / " + endMonth;
        x.month = startMonth-1;
        entries.push(x);
        const cont = document.getElementById("monthEntries");
        buildEntry(x, cont);
        const newMenu = document.getElementById("newEventMenu");
  newMenu.style.display = "none";
  a.value = "";
  b.value = "";
  c.value = "";
  d.value = "";
        
      }
      else{
        console.log("invalid Entry due to end day");
      window.alert("Check your data, end day is before start day");
      }
    } else {
      console.log("invalid Entry due to end month");
      window.alert("Check your data, that entry is not valid for this month");
    }
  } else {
    console.log("invalid Entry");
    window.alert("Check your data, that entry is not valid for this month");
  }
}

function closeTacEdit() {
  console.log("closed!");
  const a = document.getElementById("tacTitleInput");
  const b = document.getElementById("tacStartInput");
  const c = document.getElementById("tacEndInput");
  const d = document.getElementById("recallInput");
  a.value = "";
  b.value = "";
  c.value = "";
  d.value = "";
  const cont = document.getElementById("newEventMenu");
  cont.style.display = "none";
}

// next job is to fix the verification above to check start date is after end date.
