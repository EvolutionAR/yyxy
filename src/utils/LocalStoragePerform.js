export const getInfoFromLocalStorage = function (key) {
  return window.localStorage.getItem(key)
}

export const setInfoToLocalStorage = function (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const removeInfoFromLocalStorage = function (key) {
  return window.localStorage.removeItem(key)
}

export const removeAllInfoFromLocalStorage = function () {
  console.log('windowlocalclear')
  return window.localStorage.clear()
}

export const getSecurityInfoFromStorage = function () {
  return JSON.parse(getInfoFromLocalStorage('mtkSecurityInfo'))
}
//
export const setUserInfoToStorage = function (tokenInfo) {
  return setInfoToLocalStorage('mtkUserInfo', tokenInfo)
}
export const getUserInfoFromStorage = function () {
  return getInfoFromLocalStorage('mtkUserInfo')
}
export const removeUserInfoFromStorage = function () {
  return removeInfoFromLocalStorage('mtkUserInfo')
}
export const getUserId = function () {
  if (!JSON.parse(getUserInfoFromStorage())) {
    return ''
  }
  return JSON.parse(getUserInfoFromStorage()).userId
}
export const getNickName = function () {
  if (!JSON.parse(getUserInfoFromStorage())) {
    return ''
  }
  return JSON.parse(getUserInfoFromStorage()).nickName
}
// export const getRoleId = function () {
//   if (!JSON.parse(getUserInfoFromStorage())) {
//     return ''
//   }
//   return JSON.parse(getUserInfoFromStorage()).roleId
// }

export const setAccountInfo = function (accountInfo) {
  return setInfoToLocalStorage('mtkAccountInfo', accountInfo)
}
export const getAccountInfo = function () {
  return getInfoFromLocalStorage('mtkAccountInfo')
}
export const removeAccountInfo = function (accountInfo) {
  return removeInfoFromLocalStorage('mtkAccountInfo')
}
export const setRoleId = function (roleId) {
  return setInfoToLocalStorage('mtkRoleId', roleId)
}
export const getRoleId = function () {
  return getInfoFromLocalStorage('mtkRoleId')
}
export const removeRoleId = function (accountInfo) {
  return removeInfoFromLocalStorage('mtkRoleId')
}
