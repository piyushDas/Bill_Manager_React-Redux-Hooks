import Axios from 'axios'

export const appAxiosInstance = (url, method, isFile, data) => {
  let instance
  const config = {
    timeout: 120000,
    headers: {
      X_CT_SOURCETYPE: 'MOBILE',
      'app-agent': 'PWA'
    }
  }
  if (isFile) {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  if (method.toLowerCase() === 'get') {
    instance = Axios.get(url, {
      params: data,
      headers: config.headers
    })
  } else if (method.toLowerCase() === 'post') {
    instance = Axios.post(url, data, config)
  }
  return instance
}


/*
  Checks useragent of the browser used to determine
  whether its a mobile device or desktop
*/
export const checkMobileDevice = () => {
  let returnVal = false
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent)) {
    returnVal = true
  }
  return returnVal
}

export const htmlDecoder = str => {
  const parser = new DOMParser()
  const domStr = parser.parseFromString(str, 'text/html')
  const decodedStr = domStr.body.textContent
  return decodedStr
}

/*
  Util method to convert string input of date into date Obj
  Input date format is dd/mm/yy
  return Date Object
*/
export const createDateObj = (dateStr, time) => {
  if (dateStr instanceof Date) {
    return dateStr
  }
  let returnVal = `${dateStr.substr(3, 2)}/${dateStr.substr(0, 2)}/${dateStr.substr(6, 4)}`
  if (time) {
    returnVal += ` ${time}`
  }
  returnVal = new Date(returnVal)
  return returnVal
}
