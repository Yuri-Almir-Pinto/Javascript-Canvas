const canvas = document.querySelector("#canvas");
const wHeight = window.innerHeight;
const wWidth = window.innerWidth;

canvas.height = wHeight - 20;
canvas.width = wWidth - 20;

function toRadians(degress) {
    return (Math.PI / 180) * degress;
}

function draw(teste) {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const auxFunc = getAuxFunc(ctx);

        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);
        auxFunc.fillRectCenter(0, 0, 150, 300);

    }
}

draw();