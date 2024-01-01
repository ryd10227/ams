import { useStore } from "vuex";

class GlobalDataUtil {
    private store:any;
    constructor() { 
        this.store  = useStore();
    }
   
    setGlobalDataByKey(key:string, data:any){
        // const store = useStore();
        this.store.dispatch("globalModule/setSharedData",{id: key,  value: data} );
        // this.$store.dispatch()
    }
    getGlobalDataByKey(key:string){
        const getter = this.store.getters["globalModule/getDataByKey"];
        return getter(key);
    }
    removeGlobalDataByKey(key:string){
        
        this.store.dispatch("globalModule/removeSharedData", key );
    }
    
}

export default GlobalDataUtil