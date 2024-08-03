let token = ''

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}

const getConfig = () => {
  return {
    headers: {
      Authorization: token,
    },
  }
}

export default { setToken, getToken, getConfig }
