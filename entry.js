class Entry {

    constructor(title, start, end, data, dependencies, requiredFor, color, rawStart, rawEnd){
        this.title = title;
        this.start = start;
        this.end = end;
        this.data= data;
        this.dependencies = dependencies;
        this.requiredFor = requiredFor;
        this.color = color;
        this.rawStart = rawStart;
        this.rawEnd = rawEnd;
        
    }
}

export default Entry;