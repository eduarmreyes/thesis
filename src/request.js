
import axios from "axios"
import store from "./store"

const _request = (obj) => {
  let headers = {
    "Secret": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJkYXRhcGFnYS5jb20iLCJuYW1lIjoiZGF0YXBhZ2EifQ.nhhJX5PWbV3hj4Z9n7WdjKkixp7Fj5EL_vqhotwziBY"
  }

  let method = "post"

  let data = null

  if (store.getState().mainReducer.auth.authorize) {
    headers.Authorization = `Bearer ${store.getState().mainReducer.auth.token}`
  }

  if (obj.headers) {
    headers = {
      ...headers,
      ...obj.headers
    }
  }

  if (obj.data) {
    data = {
      ...obj.data
    }
  }

  if (obj.method) {
    const allowMethods = ["post", "get"]
    const toUse = obj.method.toLowerCase()

    if (allowMethods.indexOf(toUse) > -1) {
      method = toUse
    }
  }

  if (obj.url && data && method) {
    axios({
      method,
      url: obj.url,
      headers,
      data
    }).then(resp => {
      if (typeof obj.done === "function") {
        obj.done(resp)
      }
    }).catch(err => {
      if (typeof obj.fail === "function") {
        obj.fail(err)
      }
    })
  } else {
    // console.log("Err request...")
  }
}

export default _request
