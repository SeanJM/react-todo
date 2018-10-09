const idLib = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";

function r(a) {
  return a[Math.floor(Math.random() * (a.length - 1))];
}

export default function generateId(length: number = 12) {
  let id = "";
  let i = -1;

  while (++i < length) {
    id += r(idLib);
  }

  return id;
}