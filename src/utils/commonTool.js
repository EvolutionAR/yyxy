import './jsencrypt.js'
// 使用公钥加密
const fnencrypt = function (password, publicKey) {
  var encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  var resPassWord = encryptor.encrypt(password)
  return resPassWord
}
// 深拷贝
const deepCopy = function (arr) { // 无法处理 原型，构造函数，Date ,Regexp ,Math
  let obj = Array.isArray(arr) ? [] : {}
  for (let item in arr) {
    if (arr.hasOwnProperty(item)) {
      if (typeof arr[item] === 'object' && arr[item] !== null) {
        obj[item] = deepCopy(arr[item])
      } else {
        obj[item] = arr[item]
      }
    }
  }
  return obj
}
// 判断文件类型
const judgeFileType = (fileName, typeArray) => {
  if (!fileName || !typeArray || !(typeArray instanceof Array) || typeArray.length === 0) {
    return false
  }
  // let type = fileName.split('/')[1]
  let fileTypeArr = fileName.split('.')
  console.log(fileTypeArr, '什么数组')
  let fileIndex = fileTypeArr.length - 1
  let type = fileTypeArr[fileIndex]

  let index = typeArray.indexOf(type)
  if (index === -1) {
    return false
  }
  return true
}
const addArrayOption = (list, key) => {
  if (list === 'undefined' || list === 'null' || list.length === 0 || !list) {
    return list
  }
  return list.map(item => {
    item[key] = ''
    return item
  })
}
const Sum = (...arg) => {
  if (arg.length === 0) {
    return
  }
  return arg.reduce((prev, next) => {
    return prev + next
  })
}
const dealErrMessage = (message) => {
  if (!message || typeof message !== 'string') {
    return message
  }
  return message.split(';').join(';<br>')
}
export {
  fnencrypt, deepCopy, judgeFileType, addArrayOption, Sum, dealErrMessage
}
