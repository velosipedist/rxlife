export const COLOR_EMPTY = Symbol('empty');

export class Board {
  #cellRefs = new Map();
  #cellSizePx = 0;
  #domRoot = null;

  constructor (cellsX, cellsY, cellSizePx) {
    this.#cellSizePx = cellSizePx;

    this.#cellRefs = Array(cellsX)
      .fill(1)
      .map((_, idx) => idx)
      .reduce((acc, x) => {
        for (let y = 0; y < cellsY; y++) {
          acc.set([x, y], COLOR_EMPTY);
        }
        return acc;
      }, new Map());
  }

  get isMounted () {
    return this.#domRoot instanceof HTMLElement;
  }

  mount (domRoot) {
    this.#domRoot = domRoot;
    this.#domRoot.style.width = '1000px';
    this.#domRoot.style.height = '1000px';
    this.#domRoot.style.position = 'relative';
  }

  repaint (changeset) {
    for (const { coords, color } of changeset) {
      const [x, y] = coords;
      this.#paint(x, y, color);
    }
  }

  #paint (x, y, color) {
    const cellRef = this.#cellRefs.get([x, y]);
    const cellNode = document.createElement('div');
    cellNode.style.width = '10px';
    cellNode.style.height = '10px';
    cellNode.style.backgroundColor = color;
    cellNode.style.position = 'absolute';
    cellNode.style.left = `${x * 10}px`;
    cellNode.style.top = `${y * 10}px`;
    this.#domRoot.appendChild(cellNode);
  }
}