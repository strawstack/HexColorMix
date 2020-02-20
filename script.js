function main() {
    let pageArea = document.querySelector(".page-area");

    let beaker = new Beaker();
    pageArea.appendChild(beaker.ref());

    
}
window.onload = main;
