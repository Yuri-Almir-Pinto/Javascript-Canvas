function getAuxFunc(canvasContext) {
    const auxFunc = {
        fillRectCenter(x, y, width, height) {
            canvasContext.fillRect(x - width / 2, y - height / 2, width, height);
        }
    }

    return auxFunc;
}