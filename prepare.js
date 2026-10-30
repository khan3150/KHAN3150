// KHAN___3150.html ko www/ me copy karta hai. Sirf 2 cheezein: pdf-lib ab app ke andar (offline), aur native.js add.
const fs=require('fs'),path=require('path');
let h=fs.readFileSync('KHAN___3150.html','utf8');
const cdn=/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/pdf-lib\/1\.17\.1\/pdf-lib\.min\.js"><\/script>/;
if(!cdn.test(h))throw new Error('pdf-lib script tag nahi mila');
h=h.replace(cdn,'<script src="pdf-lib.min.js"></script><script src="native.js"></script>');
fs.mkdirSync('www',{recursive:true});
fs.writeFileSync('www/index.html',h);
fs.copyFileSync('node_modules/pdf-lib/dist/pdf-lib.min.js','www/pdf-lib.min.js');
fs.copyFileSync('native.js','www/native.js');
console.log('www ready');
