const { ccclass, property } = cc._decorator;

@ccclass
export default class YZ_LocalStorage {

    /**
     * 获取本地缓存数据
     * @param key 
     * @param defaultValue 默认值
     * @returns 
     */
    public static getItem(key: string, defaultValue?: string): any {
        let value = cc.sys.localStorage.getItem(key);
        if (value) {
            return value;
        }
        if (defaultValue) return defaultValue;
        return null;
    }


    /**
     * 保存本地缓存
     * @param key 
     * @param value 
     */
    public static setItem(key: string, value: any): void {
        cc.sys.localStorage.setItem(key, value);
    }

    public static clearItems(){
        cc.sys.localStorage.clear();
    }

}