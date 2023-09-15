

export default apiClient = {

     mapApiKey : "AIzaSyBBw17hDdX7_BLxRouq9zXnNePpYC-NE40",
    
      post: (url, params) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .catch(error => { throw error }),
    
      get: (url, params) => fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .catch(error => { throw error }) 
}