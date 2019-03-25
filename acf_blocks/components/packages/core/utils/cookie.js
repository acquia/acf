import cookie from 'js-cookie'

// Set cookies
export const setCookie = (key, value, day = 30) => {
  cookie.set(key, value, {
    expires: day,
    path: '/'
  })
}

// Get cookies
export const getCookie = key => {
  return cookie.get(key)
}

// Remove cookies
export const removeCookie = key => {
  cookie.remove(key)
}
