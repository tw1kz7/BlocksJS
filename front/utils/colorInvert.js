export default function colorInvert(color) {

    let [hash, a, b, c, d, e, f] = color.split("");

    let colorR = a + b;
    let colorG = c + d;
    let colorB = e + f;

    let rC = parseInt(colorR, 16);
    let gC = parseInt(colorG, 16);
    let bC = parseInt(colorB, 16);

    let rR = (rC + 100) % 255;
    let gG = (gC + 100) % 255;
    let bB = (bC + 100) % 255;

    return `rgb(${rR},${gG},${bB})`;
}