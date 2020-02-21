class Beaker {
    constructor(color) {
        // beakerContainer
        this.bc = document.createElement("div");
        this.bc.className = "beaker-container";
        // beakerClickZone
        this.bcz = document.createElement("div");
        this.bcz.className = "beaker-click-zone";
        // beakerLiquidZone
        this.blz = document.createElement("div");
        this.blz.className = "beaker-liquid-zone";
        // SVG
        var parser = new DOMParser();
        var doc = parser.parseFromString(this.getSVGString(global.uid()), "image/svg+xml");
        this.svg = doc.documentElement;
        this.bc.appendChild(this.bcz);
        this.bc.appendChild(this.blz);
        this.bc.appendChild(this.svg);
        this._ref = this.bc;

        // Base color
        this._color = color;
        if (color == undefined) {
            this._color = "#FF0000";
        }
        this.color(this._color);

        // Set click events
        this.bcz.addEventListener("mousedown", e => {
            if (global.movementLock) return; // Prevent events during animation
            if (e.shiftKey) {
                this.pourEvent();
            } else {
                global.target = e.target.parentElement;

                let left = 0;
                if (e.target.parentElement.style.left.length != 0) {
                    left = this.pxToInt(e.target.parentElement.style.left);
                }
                let top = 0;
                if (e.target.parentElement.style.top.length != 0) {
                    top = this.pxToInt(e.target.parentElement.style.top);
                }
                global.clickPosition = {
                    "left": left,
                    "top": top
                };
                global.clickOffset = {
                    "left": e.clientX - left,
                    "top": e.clientY - top
                };
            }
        });
        this.bcz.addEventListener("mouseup", e => {
            global.target = undefined;
        });
        global.beakers.push(this);
    }
    color(hex) {
        // Set new hex color for liquid in beaker
        this._color = hex;
        this.svg.querySelector("#liquid").setAttribute("fill", hex);
        this.svg.querySelector("#liquidDrop").setAttribute("fill", hex);
    }
    ref() {
        // Return ref to beaker DOM element
        return this._ref;
    }
    pxToInt(px) {
        // Accepts px as "5px" returns number value ex. 5
        return parseInt(px.substring(0, px.length - 2));
    }
    mix(hex) {
        // Accept hex as new color to mix with current
        let other = this.seperateComponents(hex);
        let self = this.seperateComponents(this._color);

        let r = self.r + other.r;
        let g = self.g + other.g;
        let b = self.b + other.b;

        // Get max
        let max = parseFloat(Math.max(r, g, b));

        // Normailze color channels
        let ratio = max / 255.0;
        let recip = 1 / ratio;
        r = Math.floor(r * recip);
        g = Math.floor(g * recip);
        b = Math.floor(b * recip);

        let newColor = this.createHexFromComp({
            "r": r,
            "g": g,
            "b": b
        });

        this.color(newColor);
    }
    seperateComponents(hex) {
        // Accepts hex as "#FF00FF"
        // Returns object with rgb components as base ten integers
        return {
            "r": parseInt(hex[1] + hex[2], 16),
            "g": parseInt(hex[3] + hex[4], 16),
            "b": parseInt(hex[5] + hex[6], 16)
        };
    }
    createHexFromComp(comp) {
        let r = this.pad(comp.r.toString(16));
        let g = this.pad(comp.g.toString(16));
        let b = this.pad(comp.b.toString(16));
        return "#" + r + g + b;
    }
    pad(str) {
        if (str.length == 0) {
            return "00";
        }
        if (str.length == 1) {
            return "0" + str;
        }
        return str;
    }
    pourEvent() {
        global.movementLock = true;

        // Trigger animation
        let je = this.svg.querySelector("#jarEdge");
        let mt = this.svg.querySelector("#measureTicks");
        let la = this.svg.querySelector("#liquidClipArea");
        let ld = this.svg.querySelector("#liquidDrop");

        let elements = [je, mt, la];
        for (let elm of elements) {
            elm.setAttribute("class", "tip");
            var newone = elm.cloneNode(true);
            elm.parentNode.replaceChild(newone, elm);
        }
        ld.setAttribute("class", "drop");
        var newone = ld.cloneNode(true);
        ld.parentNode.replaceChild(newone, ld);

        setTimeout(() => {
            let left = 0;
            if (this.bc.style.left.length != 0) {
                left = this.pxToInt(this.bc.style.left);
            }
            let top = 0;
            if (this.bc.style.top.length != 0) {
                top = this.pxToInt(this.bc.style.top);
            }
            // Trigger global pour event
            global.pourEvent(this._color, {
                "left": left + 154, // container.left + svg.liquidDrop.x
                "top": top + 110 + 150 // container.top + svg.liquidDrop.y + anim.height
            });
        }, 2000);

        setTimeout(() => {
            global.movementLock = false;
        }, 3500);
    }
    getSVGString(id) {
        return `<svg width="200" height="400" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id="clip${id}">
                <path id="liquidClipArea" d="M64.8456 142.947L64.8456 92.4466V49.9466L130.846 49.9466V92.4466V142.947C130.346 149.947 128.346 150.447 121.346 150.447H76.3456C67.3456 150.447 64.8456 147.947 64.8456 142.947Z" fill="#FEBA94" fill-opacity="0.5"/>
              </clipPath>
            </defs>
            <rect id="background" x="1.14441e-05" width="200" height="200" fill="#D0D0D0" opacity="0"/>
            <rect id="liquid" x="35" y="110" width="135" height="53" fill="#67B9DD" clip-path="url(#clip${id})"/>
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
