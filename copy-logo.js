const fs=require('fs'),p=require('path');
const src=p.join(__dirname,'ChatGPT Image May 16, 2026, 01_07_00 PM.png');
const dest=p.join(__dirname,'public','govassist-logo.png');
if(!fs.existsSync(p.join(__dirname,'public')))fs.mkdirSync(p.join(__dirname,'public'));
fs.copyFileSync(src,dest);
console.log('Done: govassist-logo.png');
