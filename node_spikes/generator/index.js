const CHARSET = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
const CODE_LENGTH = 4;
const codesUsed = [];

/**
 * Gets a random character from the charset
 * @param {string} charset The set of characters to choose from
 */
function getRandomCharacter(charset) {
  const index = Math.trunc(Math.random() * charset.length);
  return charset.charAt(index);
}

/**
 * Given a charset, generates code that is length n
 * @param {string} charset The set of characters to choose from
 * @param {number} n the length of the code
 */
function generateCode(charset, n) {
  let code = "";
  for (let i = 0; i < n; i++) code += getRandomCharacter(charset);
  return code;
}

function getRoomCode() {
  let code = null;
  do {
    code = generateCode(CHARSET, CODE_LENGTH);
  } while (codesUsed.includes(code));
  codesUsed.push(code);
  return code;
}

const runs = 10;
for (let i = 0; i < runs; i++) console.log(getRoomCode());
