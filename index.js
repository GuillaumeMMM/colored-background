const X_OFFSET = 50;
const Y_OFFSET = 50;
const VERT_LINE_WIDTH = 2;
const HOR_LINE_WIDTH = 2;

const body = document.body;
const html = document.documentElement;
console.log(body.clientHeight);
const viewHeight = body.scrollHeight
const viewWidth = html.clientWidth;

document.getElementById('svg-container').setAttribute('height', viewHeight + 'px');
document.getElementById('svg-container').setAttribute('width', viewWidth + 'px');

const hLines = [];
const vLines = [];

const drawVerticalLines = function(xOffset, range) {
    let sum = 0;
    while (sum < viewWidth) {
        const randIndex = range[Math.trunc(Math.random() * range.length)];
        sum += xOffset * randIndex;
        vLines.push(sum);
        const newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        newLine.setAttribute('x1', (sum));
        newLine.setAttribute('y1', 0);
        newLine.setAttribute('x2', (sum));
        newLine.setAttribute('y2', viewHeight);
        newLine.setAttribute('style', 'stroke: white; stroke-width: ' + VERT_LINE_WIDTH);

        document.getElementById('svg-container').append(newLine)
    }
    vLines.push(viewWidth);
}

const drawHorizontalLines = function(yOffset, range) {
    let sum = 0;
    while (sum < viewHeight) {
        const randIndex = range[Math.trunc(Math.random() * range.length)];
        sum += yOffset * randIndex;
        hLines.push(sum);
        const newLine = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        newLine.setAttribute('x1', 0);
        newLine.setAttribute('y1', (sum));
        newLine.setAttribute('x2', viewWidth);
        newLine.setAttribute('y2', (sum));
        newLine.setAttribute('style', 'stroke: white; stroke-width: ' + HOR_LINE_WIDTH);

        document.getElementById('svg-container').append(newLine)
    }
    hLines.push(viewHeight);
}

const fillRectAt = function(hLineIndex, vLineIndex, color) {
    const newRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    // console.log(hLineIndex, vLineIndex)
    if (hLineIndex === 0) {
        newRect.setAttribute('height', hLines[hLineIndex] - HOR_LINE_WIDTH);
        newRect.setAttribute('y', 0 + (HOR_LINE_WIDTH / 2));
    } else {
        newRect.setAttribute('y', hLines[hLineIndex - 1] + (HOR_LINE_WIDTH / 2));
        newRect.setAttribute('height', (hLines[hLineIndex] - hLines[hLineIndex - 1]) - HOR_LINE_WIDTH);
    }
    if (vLineIndex === 0) {
        newRect.setAttribute('width', vLines[vLineIndex] - VERT_LINE_WIDTH);
        newRect.setAttribute('x', 0 + (VERT_LINE_WIDTH / 2));
    } else {
        newRect.setAttribute('x', vLines[vLineIndex - 1] + (VERT_LINE_WIDTH / 2));
        newRect.setAttribute('width', (vLines[vLineIndex] - vLines[vLineIndex - 1]) - VERT_LINE_WIDTH);
    }
    newRect.setAttribute('style', 'fill: ' + color);

    newRect.addEventListener('mouseout', event => {
        // console.log('event', event);
        // event.target.setAttribute('style', 'fill: white');
        if (html.scrollTop < 500) {
            fillRandNumberOfSquares(5, ['#0FA3B1', '#B5E2FA', '#5FBFF9', '#40E0D0']);
        } else {
            fillRandNumberOfSquares(5, ['#0FA3B1', '#B5E2FA', '#5FBFF9', '#40E0D0']);
        }
        console.log(html.scrollTop)
    });

    newRect.addEventListener('mouseover', event => {
        // console.log('event', event);
        fillRandNumberOfSquares(5, ['#0FA3B1', '#B5E2FA', '#5FBFF9', '#40E0D0']);
    });

    document.getElementById('svg-container').append(newRect);
}

drawVerticalLines(Y_OFFSET, [0.5, 1, 2, 1.5]);
drawHorizontalLines(X_OFFSET, [1, 0.5, 2, 1.5]);

// fillRectAt(hLines.length - 10, vLines.length - 10, 'red');


const fillRandNumberOfSquares = function(number, colors) {
    if (number === 0) {
        for (let i = 0; i < hLines.length - 1; i++) {
            for (let j = 0; j < vLines.length - 1; j++) {
                const color = colors[Math.trunc(Math.random() * colors.length)];
                fillRectAt(i, j, color);
            }
        }
    } else {
        for (let i = 0; i < number; i++) {
            const color = colors[Math.trunc(Math.random() * colors.length)];
            fillRectAt(Math.trunc(Math.random() * (hLines.length - 1)), Math.trunc(Math.random() * (vLines.length - 1)), color);
        }
    }
}

// const fillAllRect = function(colors) {
//     for (let i = 0; i < hLines.length - 1; i++) {
//         for (let j = 0; j < vLines.length - 1; j++) {
//             const color = colors[Math.trunc(Math.random() * colors.length)];
//             fillRectAt(i, j, color);
//         }
//     }
// }

fillRandNumberOfSquares(0, ['#0FA3B1', '#B5E2FA', '#5FBFF9', '#40E0D0']);

// document.getElementById('svg-container').addEventListener('mouseover', (event) => {
//     increaseWidth(7);
// });

// const increaseWidth = function(col) {
//     document.
// }