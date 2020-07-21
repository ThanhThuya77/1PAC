function get(url) {
  return fetch(url, { credentials: "same-origin" }).then(function (response) {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export { get };
