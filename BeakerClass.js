class Beaker {
    constructor() {
        // beakerContainer
        let bc = document.createElement("div");
        bc.className = "beaker-container";
        // beakerClickZone
        let bcz = document.createElement("div");
        bcz.className = "beaker-click-zone";
        // beakerLiquidZone
        let blz = document.createElement("div");
        blz.className = "beaker-liquid-zone";
        // SVG
        var parser = new DOMParser();
        var doc = parser.parseFromString(this.getSVGString(), "image/svg+xml");
        let svg = doc.documentElement;
        bc.appendChild(bcz);
        bc.appendChild(blz);
        bc.appendChild(svg);
        this._ref = bc;
    }
    color(hex) {
        // Set new hex color for liquid in beaker
    }
    ref() {
        // Return ref to beaker DOM element
        return this._ref;
    }
    getSVGString() {
        return `<svg width="200" height="400" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="clip">
                <path id="liquidClipArea" d="M64.8456 142.947L64.8456 92.4466V49.9466L130.846 49.9466V92.4466V142.947C130.346 149.947 128.346 150.447 121.346 150.447H76.3456C67.3456 150.447 64.8456 147.947 64.8456 142.947Z" fill="#FEBA94" fill-opacity="0.5"/>
              </clipPath>
            </defs>
            <rect id="background" x="1.14441e-05" width="200" height="200" fill="#D0D0D0" opacity="0"/>
            <rect id="liquid" x="35" y="110" width="135" height="53" fill="#67B9DD" clip-path="url(#clip)"/>
            <rect id="liquidDrop" x="154" y="110" width="6" height="7" rx="3" fill="#67B9DD"/>
            <path id="jarEdge" d="M47.9454 55.3878C44.4454 52.3878 44.9454 48.8878 51.4454 48.8878L144.445 48.8878C150.945 48.8878 150.945 52.3878 147.945 55.3878C147.945 55.3878 137.945 64.3878 137.945 71.3878V139.888C137.945 153.888 126.445 157.888 120.445 157.888H75.4454C65.4454 157.888 58.4454 150.888 57.9454 139.888L57.9454 71.3878C57.9454 64.3878 47.9454 55.3878 47.9454 55.3878Z" stroke="#F9FEFF" stroke-width="2"/>
            <g id="measureTicks">
                <rect id="Rectangle 1" x="95.477" y="71.0805" width="25" height="2" fill="#F9FEFF"/>
                <rect id="Rectangle 2" x="95.477" y="90.0805" width="25" height="2" fill="#F9FEFF"/>
                <rect id="Rectangle 3" x="95.477" y="109.081" width="25" height="2" fill="#F9FEFF"/>
                <rect id="Rectangle 4" x="95.477" y="128.081" width="25" height="2" fill="#F9FEFF"/>
                <rect id="Rectangle 5" x="95.477" y="147.081" width="25" height="2" fill="#F9FEFF"/>
            </g>
        </svg>`;
    }
}
