import { useStore } from "vuex";
// import { GLOBAL_SHARED } from "../models/GlobalData";
const GlobalSharedService = () => {
     
    const setGlobalDataByKey = (key:string, data:any) => {
        const store = useStore();
        store.dispatch("globalModule/setSharedData",{id: key,  value: data} );
    }

    const getGlobalDataByKey = (key:string)  => {
        const store = useStore();
        const getter = store.getters["globalModule/getDataByKey"];
        return getter(key);
    }

    const removeGlobalDataByKey = (key:string)  => {
        const store = useStore();
        store.dispatch("globalModule/removeSharedData",key );
    }
  
    return { setGlobalDataByKey, getGlobalDataByKey , removeGlobalDataByKey };
};
  


export default GlobalSharedService