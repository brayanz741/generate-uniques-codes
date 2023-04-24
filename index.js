const fs = require('fs');
const path = require('path');

const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const codeLength = 5;
const outputDir = path.join(__dirname, 'files');
const totalCodes = 16000000;
const codesPerFile = 100000;
const codesSet = new Set();

async function main() {
  if (!fs.existsSync(outputDir)) {
    await fs.promises.mkdir(outputDir);
  }
  for (let i = 0; i < totalCodes; i++) {
    if (i % codesPerFile === 0) {
      const fileIndex = i / codesPerFile + 1;
      const filePath = path.join(outputDir, `Codigos-Parte-${fileIndex}.dbf`);
      await fs.promises.writeFile(filePath, 'ref,code\n');
    }
    let code = generateCode();
    while (codesSet.has(code)) {
      code = generateCode();
    }
    codesSet.add(code);
    const fileIndex = Math.floor(i / codesPerFile) + 1;
    const filePath = path.join(outputDir, `Codigos-Parte-${fileIndex}.dbf`);
    const content = `${i + 1},${code}\n`;
    await fs.promises.appendFile(filePath, content);
  }
  console.log('Finalizado!');
}

function generateCode() {
  let code = '';
  for (let i = 0; i < codeLength; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

main();
