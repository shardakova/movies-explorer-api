function validateUrl(url) {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (err) {
    return false;
  }
  return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
}

module.exports = validateUrl;
