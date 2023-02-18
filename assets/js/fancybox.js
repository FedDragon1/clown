// 2/11 放大图片
// 本着能不用jQuery就不用jQuery的原则手造轮子，仿制一下fancybox

let fbZoom = 1;
let fbMax = false;
let fbHeight, fbWidth;

function fancyBox(image) {
    let box = document.getElementById("fancybox");
    let wrapper = document.getElementById("fb-img-wrapper");
    wrapper.innerHTML = `<img src="${image.getAttribute("src")}" alt="${image.getAttribute("alt")}">`
    box.style.zIndex = "0"
    box.style.opacity = "1";
    setTimeout(fbInit, 1)
}

function fbInit() {
    let img = document.getElementById("fb-img-wrapper").children[0];
    fbHeight = img.offsetHeight;
    fbWidth = img.offsetWidth;
}

function fbClose() {
    let box = document.getElementById("fancybox");
    box.style.zIndex = "-1";
    box.style.opacity = "0";
    fbReset();
}

function fbZoomIn() {
    let sixtyVW = window.innerWidth * 60 / 100
    if (fbMax)
        return;

    let img = document.getElementById("fb-img-wrapper").children[0];
    let height = img.offsetHeight, width = img.offsetWidth;
    fbZoom += 0.15;
    let zoomedWith = width * fbZoom;
    if (zoomedWith <= sixtyVW) {
        img.style.width = `${fbWidth * fbZoom}px`;
        img.style.height = `${fbHeight * fbZoom}px`;
    } else {
        img.style.width = `${sixtyVW}px`;
        let aspr = width / height;
        img.style.height = `${sixtyVW / aspr}px`;
        fbMax = true;
    }
}

function fbZoomOut() {
    if (fbZoom === 1)
        return;

    let img = document.getElementById("fb-img-wrapper").children[0];
    fbMax = false;
    fbZoom -= 0.15;
    fbZoom = Math.max(fbZoom, 1);
    img.style.width = `${fbWidth * fbZoom}px`;
    img.style.height = `${fbHeight * fbZoom}px`;
}

function fbReset() {
    let img = document.getElementById("fb-img-wrapper").children[0];
    fbMax = false;
    fbZoom = 1;
    img.style.height = img.style.width = "";
}
