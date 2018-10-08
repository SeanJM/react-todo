const idLib = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";
function r(a) {
  return a[Math.floor(Math.random() * (a.length - 1))];
}

export default function (length: number = 12) {
  const id: string[] = [];
  let i = -1;
  while (++i < length) {
    id.push(r(idLib));
  }
  return id.join("");
}