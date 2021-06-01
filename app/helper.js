module.exports.nl2br = (str) => {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  return (str + '').replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + '<br>' + '$2'
  );
};
