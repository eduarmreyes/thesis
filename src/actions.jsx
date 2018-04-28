

const setAuth = (obj) => {
  return {
    type: "SET_AUTH",
    payload: {
      auth: {
        authorize: obj.authorize || false,
        token: obj.token || null,
        scope: obj.scope || null,
        email: obj.email || null,
        id:    obj.id || null,
        register:obj.register || null,
        type:obj.type || null,
        infouser:obj.infouser || null,
        info_cuenta:obj.info_cuenta || null,
        info_cuenta_pfx:obj.info_cuenta_pfx || null
      }
    }
  }
}


const setUserOptions = (obj) => {
  return {
    type: "SET_USER_OPTIONS",
    payload: {
      ...obj
    }
  }
}
const setBaseUrl = (baseurl) => {

  return {
    type: "SET_BASEURL",
    payload: {
      baseurl: baseurl
    }
  }
}


export default {
  setAuth,
  setUserOptions,
  setBaseUrl
}
