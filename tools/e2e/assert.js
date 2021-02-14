const assert = (isTrue, message) => {
  if (isTrue) {
    console.log('[OK]', message);
  } else {
    throw new Error(message);
  }
};


module.exports = {
  assert
};
