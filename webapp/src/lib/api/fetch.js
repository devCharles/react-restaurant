const apiFetch = (resource, config) => {
  const baseUrl = 'http://restaurant-api.devcharles.com'
  return fetch (`${baseUrl}${resource}`, config)
}

export default apiFetch
