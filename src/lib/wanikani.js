function buildRequest(token, path) {
  const url = `https://api.wanikani.com/v2/${path}`;
  const headers = new Headers({
    'Wanikani-Revision': '20170710',
    Authorization: `Bearer ${token}`,
  });

  return new Request(url, { method: 'GET', headers });
}

async function doRequest(token, path) {
  const request = buildRequest(token, path);
  try {
    const response = await fetch(request);
    const data = await response.json();

    // wanikani errors return objects with { code: Integer, error: String }
    if (data.error) {
      throw data.code === 401 // we get 401 when the token is not valid
        ? `${data.code}: Invalid token` // change message, since WaniKani's is not very user-friendly
        : `${data.code}: ${data.error}`;
    }
    // wanikani returns { data: {}, ... } objects for successful requests
    // and { data: [{data: {}, ...}, ...], ...} for arrays
    return Array.isArray(data.data) ? data.data.map(x => x.data) : data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(token) {
  return doRequest(token, 'user');
}

export async function getProgression(token) {
  return doRequest(token, 'level_progressions');
}
