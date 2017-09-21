function param(obj) {
  let paramArray = []
  if (typeof obj !== 'object') {
    return
  }

  Object.keys(obj).forEach(key => {
    paramArray.push(`${key}=${obj[key]}`)
  })

  return paramArray.join('&')
}

export { param }