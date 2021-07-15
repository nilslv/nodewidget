export class Helper {
  constructor() {
    this.urlParams = new URLSearchParams(window.location.search);
  }

  initializeParam(searchValue, defaultValue) {
    const param = this.urlParams.get(searchValue);
    return param != null ? param : defaultValue;
  }
}
