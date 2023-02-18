// 2/17 贴吧分页

let content;
let jump;
let jump2;
let maxPage = 67;
setTimeout(pagerMain, 200)


function pagerMain() {
    content = document.getElementById("content");
    jump = document.getElementById("jump");
    jump2 = document.getElementById("jump-2");
}

function jumpTo(to) {
    console.log(to)
    let current = parseInt(content.getAttribute("data-currpn"));

    let fromA = jump.querySelector(`a[data-tpto="${current}"]`);
    fromA.classList.remove("current-page");
    content.setAttribute("data-currpn", `${to}`);

    fetch(`assets/pages/page${to}.html`)
        .then((r) => r.text())
        .then((t) => content.innerHTML = t);

    // 左边四个右边五个
    if (5 < to && to < maxPage - 5) {
        for (const [index, element] of jump.querySelectorAll(".relative-jump").entries()) {
            let text = `${to-4+index}`;
            element.innerText = text;
            element.setAttribute("data-tpto", text)
        }
    } else if (to <= 5 && current > 5) {
        for (const [index, element] of jump.querySelectorAll(".relative-jump").entries()) {
            let text = `${index + 1}`;
            element.innerText = text;
            element.setAttribute("data-tpto", text)
        }
    } else if (to >= maxPage - 5 && current < maxPage - 5) {
        for (const [index, element] of jump.querySelectorAll(".relative-jump").entries()) {
            let text = `${index + maxPage - 9}`;
            element.innerText = text;
            element.setAttribute("data-tpto", text)
        }
    }

    content.style.filter = "blur(10px)";
    content.style.opacity = "0";
    if (window.scrollY > 300)
        window.scroll(0, 0);

    setTimeout(() => {
        let toA = jump.querySelector(`a[data-tpto="${to}"]`);
        toA.classList.add("current-page");
        jump2.innerHTML = jump.innerHTML;
        content.style.filter = "";
        content.style.opacity = "";
    }, 250)
    setTimeout(main, 200)
}

function jumpAbs(input) {
    let toNumber = parseInt(input.value);
    if (toNumber < 1 || toNumber > maxPage || input.value === content.getAttribute("data-currpn"))
        return;
    jumpTo(toNumber);
    input.value = "";
}

function jumpHead() {
    if ("1" === content.getAttribute("data-currpn"))
        return;
    jumpTo(1);
}

function jumpDelta(d) {
    // d ∈ {-1, 1}
    let curr = parseInt(content.getAttribute("data-currpn"));
    if (curr + d < 1 || curr + d > maxPage)
        return;
    jumpTo(curr + d);
}

function jumpAnchor(a) {
    if (a.classList.contains("current-page"))
        return;
    jumpTo(parseInt(a.innerText));
}

function jumpEnd() {
    if (maxPage === content.getAttribute("data-currpn"))
        return;
    jumpTo(maxPage);
}
