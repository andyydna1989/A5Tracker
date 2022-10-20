import {loadTacView} from './tacView.js';

function build(){

console.log("builder working");

const container = document.getElementById("container");

const today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

for (let i=0; i <36; i++){
let entry = document.createElement("div");
entry.className="month";
entry.innerHTML = nameMonth(month);
entry.style.gridRowStart="1";
entry.style.borderStyle = "solid";
entry.style.borderWidth = "1px";
entry.style.width = "50px";
entry.style.textAlign = "center";
entry.setAttribute("month", month);
entry.setAttribute("year", year);
entry.onclick = function(){loadTacView(entry)}
container.appendChild(entry);
month += 1;
if (month > 11){
    month = 0;
    year+=1;
}
}
}


function nameMonth(month){
    switch (month){
        case 0:
        return "Jan";
        break;
        case 1:
        return "Feb";
        break;
        case 2:
            return "Mar";
            break;
            case 3:
                return "Apr";
                break;
                case 4:
                    return "May";
                    break;
                    case 5:
                        return "Jun";
                        break;
                        case 6:
                            return "Jul";
                            break;
                            case 7:
                                return "Aug";
                                break;
                                case 8:
                                    return "Sep";
                                    break;
                                    case 9:
                                        return "Oct";
                                        break;
                                        case 10:
                                            return "Nov";
                                            break;
                                            case 11:
                                                return "Dec";
                                                break;        
    }
}

export default build();