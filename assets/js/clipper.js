// 2023-02-04 如果帖子过长需要生成clip path
// 今天才看见帖子，祝你十八岁生日快乐啊ヾ(•ω•`)o

setTimeout(main, 1000)
const WIDTH = 185, HEIGHT = 260;
let container = document.getElementById("clippath").children[0]

function main() {
    let floors = document.getElementsByClassName("floor-main");
    for (let floor of floors) {
        let width = floor.offsetWidth, height = floor.offsetHeight;

        if (height < 310) continue

        let floorLevel = floor.getAttribute("data-seq");

        generateClippath(floor, floorLevel, height, width);
        let [overListener, outListener] = hoverListener(floor, height)
        floor.addEventListener("mouseover", overListener);
        floor.addEventListener("mouseout", outListener);
    }

    setTimeout(main, 5000)
}

function generateClippath(floor, floorLevel, height, width) {
    let clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')
    clipPath.setAttribute("id", `clipper-${floorLevel}`);
    container.appendChild(clipPath);

    // polygon
    let polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    polygon.setAttribute("points", `0,-10 ${width + 10},-10 ${width + 10},${height+10} ${WIDTH+20},${height+10} ${WIDTH+20},${height-20} ${WIDTH},${height-20} ${WIDTH},${HEIGHT} 20,${HEIGHT} 20,${HEIGHT-20} 0,${HEIGHT-20}`);
    clipPath.appendChild(polygon);

    // rounded edge
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute("cx", "20");
    circle.setAttribute("cy", `${HEIGHT-20}`);
    circle.setAttribute("r", "20")
    clipPath.appendChild(circle);

    circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute("cx", `${WIDTH+20}`);
    circle.setAttribute("cy", `${height-22}`);
    circle.setAttribute("r", "20");
    clipPath.appendChild(circle);

    let arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    arc.setAttribute("d", `M ${WIDTH-20} ${HEIGHT} A 20 20 0 0 1 ${WIDTH} ${HEIGHT+20} l 0 -20 l -20 0`);
    clipPath.appendChild(arc);

    floor.style.clipPath = `url(#clipper-${floorLevel})`;
}

function hoverListener(floor, height) {
    // border bottom
    let dummydiv = document.createElement("div");
    // css in floor.styl
    dummydiv.style.height = `${height - HEIGHT - 20}px`;
    dummydiv.setAttribute("class", "clipper-border")
    floor.parentElement.appendChild(dummydiv);

    let onHover = () => dummydiv.style.opacity = "100%"
    let onAway = () => dummydiv.style.removeProperty("opacity")

    return [onHover, onAway];
}
