class pointCloudSvg {
    constructor(svgID, deleteAllButtonID, importButtonID, importData, evalButtonID) {
        this.draggedElement = null;
        this.preventNextMouseClick = false;
        this.importData = importData;

        // init DOM Elements:
        this.svg = document.getElementById(svgID);
        this.btDeleteAll = document.getElementById(deleteAllButtonID);
        this.btEval = document.getElementById(evalButtonID);
        this.btImport = document.getElementById(importButtonID);

        // init Events:
        this.svg.addEventListener("click", (evt) => this.createPoint(evt) );
        this.svg.addEventListener('mousemove', (evt) => this.drag(evt));
        this.svg.addEventListener('mouseup', (evt) => this.endDrag(evt));

        this.btDeleteAll.addEventListener("click", () => this.deleteAllPoints());
        this.btEval.addEventListener("click", () => this.evalPoints());
        this.btImport.addEventListener("click", () => this.importPoints());
    }
    
    evalPoints() {
        let points = [];

        var pointsHTML  = this.svg.getElementsByClassName("js-canvas__star");

        for(var i = 0; i < pointsHTML.length; i++){
            points.push({
                x: pointsHTML[i].getAttributeNS(null, "cx"),
                y: pointsHTML[i].getAttributeNS(null, "cy")
            });
        }
      
        console.log("points:");
        console.log(points);
    }

    importPoints() {
        for(let i = 0; i < this.importData.length; i++) {
            this.createPointHTML(this.importData[i].x, this.importData[i].y);
        }
    }

    getAdjustedMouseCoords(evt){
        const rect = this.svg.getBoundingClientRect();
        
        // get cursor Coordinates, relative to our svg-element
        const cursorX = evt.clientX - rect.left;
        const cursorY = evt.clientY - rect.top;
    
        // adjust the coordinates, so that they are betweeen 0 and 100
        const x = Math.floor(cursorX / rect.width  * 100);
        const y = Math.floor(cursorY / rect.height * 100);
    
        return { x: x, y: y };
    }

    // -- create/delete point

    createPoint(evt) {
        if(this.preventNextMouseClick === true){
            this.preventNextMouseClick = false;
            return;
          }

        const coords = this.getAdjustedMouseCoords(evt);
        this.createPointHTML(coords.x, coords.y);
    }

    createPointHTML(x, y) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, "cx", x);
        circle.setAttributeNS(null, "cy", y);
        circle.setAttributeNS(null, "r", 1);
        circle.setAttributeNS(null, "class", "cavas__star js-canvas__star");
        circle.addEventListener('mousedown', (evt) => this.startDrag(evt));

        this.svg.appendChild(circle);
    }

    deleteAllPoints() {
        this.svg.innerHTML = "";
      }

    // -- drag events

    startDrag(evt) {
        this.draggedElement = evt.target;
    }

    endDrag(evt){
        // check if there even was a draggedElement
        if(!this.draggedElement){ return; }

        this.draggedElement = null;
        this.preventNextMouseClick = true;
    }

    drag(evt){
        // check if there even was a draggedElement
        if(!this.draggedElement){ return; }

        evt.preventDefault();
        const coord = this.getAdjustedMouseCoords(evt);
        this.draggedElement.setAttributeNS(null, "cx", coord.x);
        this.draggedElement.setAttributeNS(null, "cy", coord.y);
    }
}

export { pointCloudSvg };
