const CHARSET = `abcdefgh`;
// const CHARSET = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012346789`;
const ROOM_CODE_LENGTH = 1;

function* roomCode(n) {
  if (n === 1) yield* CHARSET;
  else
    for (let a of roomCode(n - 1)) {
      for (let b of CHARSET) {
        yield `${a}${b}`;
      }
    }
}

function getRoomCode(generator) {
  let code = generator.next();
  if (code.done) throw new Error(`Replace generator`);

  return code.value;
}

let generator = roomCode(ROOM_CODE_LENGTH);
const runs = 50;
for (let i = 0; i < runs; i++) {
  do {
    try {
      console.log(getRoomCode(generator));
      break;
    } catch (e) {
      generator = roomCode(ROOM_CODE_LENGTH);
    }
  } while (true);
}
