export class CommonCheck {
  static isUndefinedOrNullOrEmpty (ele) {
    return (
      typeof ele === 'undefined' || ele === null || ele.length <= 0 || ele === {} || ele === ''
    )
  }
}
