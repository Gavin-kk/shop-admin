// localStorage存储的工具类
class LocalStorage {
  public permanentlyStoreData(key:string, value:any):void {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }

  public removePermanentlyStoreData(key:string):void {
    window.localStorage.removeItem(key);
  }

  public readPermanentlyStoreData(key:string):any {
    const data = window.localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
}

export default new LocalStorage();
