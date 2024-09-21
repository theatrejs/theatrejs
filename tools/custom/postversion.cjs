const fs = require('fs');

const file = './package.json';
const content = fs.readFileSync(file, 'utf8');

fs.writeFileSync(file, content.replace(/(:\s*[{[])/g, '$1\n'), 'utf8');
