class pointCloudSvg {
    constructor(svgID, deleteAllButtonID) {
        this.draggedElement = null;
        this.preventNextMouseClick = false;

        this.svg = document.getElementById(svgID);
        this.btDeleteAll = document.getElementById(deleteAllButtonID);

        this.svg.addEventListener("click", (evt) => this.createPoint(evt) );
        this.svg.addEventListener('mousemove', (evt) => this.drag(evt));
        this.svg.addEventListener('mouseup', (evt) => this.endDrag(evt));
        this.btDeleteAll.addEventListener("click", () => this.deleteAllPoints());
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

        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, "cx", coords.x);
        circle.setAttributeNS(null, "cy", coords.y);
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
