const fs = require('fs');
const content = fs.readFileSync('C:/Users/otro/Pictures/mexico-map-vector/MEXICO_MAP003-01.svg', 'utf8');

const targetStr = '<g opacity="0.4">';
let cleanSvg = '';
const startIndex = content.indexOf(targetStr);

if (startIndex !== -1) {
  cleanSvg = content.substring(0, startIndex);
  cleanSvg += '</g>\n</svg>';
  fs.writeFileSync('C:/Users/otro/Projects/ehsw-platform/public/Images/mapa-mexico.svg', cleanSvg);
  console.log('Successfully wrote clean SVG to public/Images/mapa-mexico.svg');
} else {
  console.log('Watermark not found!');
}
