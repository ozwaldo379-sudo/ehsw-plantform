const fs = require('fs');
let content = fs.readFileSync('public/Images/mapa-mexico.svg', 'utf8');

// Replace the deep blue solid background rectangle with a transparent one so the app's gradient glows through
content = content.replace(/<rect[^>]*fill="#1E3B63"[^>]*\/>/g, '<rect x="0" y="0" width="1600" height="1058" fill="transparent"/>');

// Replace the bright blue states (Vexels blue) with our dark, classy EHSW-platform navy blue matching the Tracom example, and add a crisp subtle border.
content = content.replace(/fill="#009BDB"/g, 'fill="#11213A" stroke="rgba(255,255,255,0.15)" stroke-width="2"');

fs.writeFileSync('public/Images/mapa-mexico.svg', content);
console.log('Map colors updated and transparency fixed successfully!');
