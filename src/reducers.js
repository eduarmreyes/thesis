
import { combineReducers } from "redux"

const initialState = {
  auth: {
    authorize: false,
    token: null,
    scope:null,
    email:null,
    id:null,
    register:null,
    type:null,
    infouser:null,
    info_cuenta:null,
    info_cuenta_pfx:null
  },
  setBaseUrl: {
    baseurl: 'http://ueesapiv1.azurewebsites.net'
  }
}
const mainReducer = (state = initialState, action = {}) => {

  switch (action.type) { 
    case "SET_AUTH":
      return {
      ...state,
      ...action.payload
    }
    case "SET_BASEURL":
      return {
      ...state,
        setBaseUrl:{
          ...action.payload
      } 
    }
    default:
      return state
  }
}

const reducer = combineReducers({
  mainReducer
})

export default reducer
