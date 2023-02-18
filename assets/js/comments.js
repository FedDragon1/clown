// 2023-02-05 clipper.js完成
// 收缩楼中楼 / 楼中楼换页

function displayComment(element, target) {
    element.innerText = "收起回复"
    element.setAttribute("onclick", `hideComment(this, this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('lzl')[0])`)
    target.style.maxHeight = target.getAttribute("data-height")
    // 从短页换到长页一直有max-height的话会被截掉一点
    setTimeout(() => {
        target.style.maxHeight = "";
    }, 500)
}

function hideComment(element, target) {
    let dataHeight;
    dataHeight = target.offsetHeight;
    target.setAttribute("data-height", `${dataHeight}px`)
    target.style.maxHeight = `${dataHeight}px`
    // 让函数先出栈，刷新css属性值
    setTimeout(() => {
        element.innerText = "显示回复"
        element.setAttribute("onclick", `displayComment(this, this.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('lzl')[0])`)
        target.style.maxHeight = "0"
    }, 1)

}

function lzlTpNext(lzl) {
    let currentPn = lzl.getAttribute("data-currentpn");
    let maxPn = lzl.getAttribute("data-totalpn");
    if (maxPn === currentPn)
        return

    let nextPn = parseInt(currentPn) + 1;
    let anchor = lzl.querySelector(`[data-tpto="${nextPn}"]`);
    lzlTpTo(anchor);
}

function lzlTpHead(tpContainer) {
    let anchor = tpContainer.querySelector('[data-tpto="1"]');
    lzlTpTo(anchor);
}

function lzlTpTail(lzl) {
    let maxPn = lzl.getAttribute("data-totalpn");
    let anchor = lzl.querySelector(`[data-tpto="${maxPn}"]`);
    lzlTpTo(anchor);
}

function lzlTpTo(element) {
    let eleClass;
    if ((eleClass = element.getAttribute("class")) !== null && eleClass.includes("current-page"))
        return

    let tpTo = element.innerText;
    let lzl = element.parentElement.parentElement.parentElement;
    let to = lzl.querySelector(`[data-replypn="${tpTo}"]`);
    let currentPn = lzl.getAttribute("data-currentpn");
    let current = lzl.querySelector(`[data-replypn="${currentPn}"]`);
    current.style.height = "0";
    to.style.height = "";
    lzl.setAttribute("data-currentpn", tpTo);

    element.classList.add("current-page");
    element.parentElement.querySelector(`[data-tpto="${currentPn}"]`).classList.remove("current-page");
    tpTail(lzl, to);
}

function tpTail(lzl, to) {
    const y = lzl.getBoundingClientRect().top + window.scrollY - 200;
    if (Math.abs(y - window.scrollY) > 200)
        window.scroll({
          top: y,
          behavior: 'smooth'
        });
    requestAnimationFrame(opacityTransition(to, 500))
}

function opacityTransition(to, time) {
    let start;
    let half = time / 2;
    to.style.backdropFilter = "blur(5px)"
    let interpolate = (delta) => 1 / time * delta
    function animate(timestamp) {
        if (start === undefined)
            start = timestamp;
        let delta = timestamp - start;

        if (delta < half)
            to.style.opacity = interpolate(delta * 2)
        else
            to.style.opacity = ``;
            to.style.backdropFilter = `blur(${interpolate((delta - half) * 2) * 5}px)`

        if (delta < time)
            requestAnimationFrame(animate)
        else
            to.style.backdropFilter = ""
    }
    return animate
}
