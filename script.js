let global = {
    "target": undefined,
    "clickPosition": { // Position of beaker svg on click
        "left": 0, "top": 0
    },
    "clickOffset": { // Click offset inside svg container
        "left": 0, "top": 0
    },
    "movementLock": false,
    "uid": (() => { // Returns new uid when called as function
        let uid = 0;
        return () => {
            uid += 1;
            return uid;
        }
    })(),
    "pourEvent": (hex, targetPosition) => {
        pourEvent(hex, targetPosition)
    },
    "beakers": []
};

function pourEvent(hex, targetPosition) {
    // Accepts hex and target position of pouring container
    // Triggers any effected containers to change
    for (let beaker of global.beakers) {
        let container = beaker.ref();
        // Container position
        let cx = pxToInt(container.style.left);
        let cy = pxToInt(container.style.top);

        // Liquid bounding rect
        let topLeftX = cx + 64; // container.x + liquid.x(estimate from path)
        let topLeftY = cy + 110; // container.y + liquid.y
        let boundHeight = 45;
        let boundWidth  = 65;

        let tx = targetPosition.left;
        let ty = targetPosition.top;

        // Check bounds
        let one = (tx >= topLeftX) && (tx <= topLeftX + boundWidth);
        let two = (ty >= topLeftY) && (ty <= topLeftY + boundHeight);
        if (one && two) {
            beaker.mix(hex);
        }
    }
}

function pxToInt(px) {
    // Accepts px as "5px" returns number value ex. 5
    return parseInt(px.substring(0, px.length - 2));
}

function main() {
    let pageArea = document.querySelector(".page-area");

    let beaker = new Beaker("#FF0000");
    pageArea.appendChild(beaker.ref());

    let beaker2 = new Beaker("#00FF00");
    pageArea.appendChild(beaker2.ref());

    // Move target on mouse move
    window.addEventListener("mousemove", e => {
        if (global.target != undefined) {
            // Current position of mouse in window
            let cx = e.clientX;
            let cy = e.clientY;

            // Delta between start and current
            let dx = cx - global.clickPosition.left;
            let dy = cy - global.clickPosition.top;

            // New position for beaker
            let nx = global.clickPosition.left + dx - global.clickOffset.left;
            let ny = global.clickPosition.top + dy - global.clickOffset.top;

            // Assign new position
            global.target.style.left = nx + "px";
            global.target.style.top = ny + "px";
        }
    });

}
window.onload = main;
