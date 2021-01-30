// Spotify API

export const actions = {
  async getToken({ commit }, [clientId, clientSecret]) {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    })
    const data = await result.json()

    return data.access_token
  },
  async searchTrack({ commit }, [token, query]) {
    const result = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`, {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
      }
    )
    const data = await result.json()

    return data
  }
}