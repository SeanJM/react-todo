const { getOptions } = require("loader-utils");

module.exports = function (source) {
  const options = getOptions(this);
  let i = -1;
  const n = options.matches.length;

  while (++i < n) {
    source = source.replace(
      options.matches[i].match,
      options.matches[i].reducer
    );
  }

  return source;
}