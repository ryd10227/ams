import LoggerService from '@/shared/bizMOB/LoggerService';

interface IGlobalData {
  id: string;
  value: any;
}
const logger  = new LoggerService();

const state = {
    DATAS : {}
}

const getters = {
    getDataByKey: (state:any) => (key:string) =>  {
        
        logger.log("data of the key." + key + ": " + JSON.stringify(state.DATAS[key]));
        return state.DATAS[key]
    }
}

const actions = {
    setSharedData : ({ commit }: any, data: IGlobalData ) => {
        commit('setData',data);
    },
    removeSharedData : ({ commit }: any, key: string ) => {
        commit('removeData',key);
    },
}

const mutations = {
    // [GLOBAL_SHARED.ADD_DATA](state:any, data:IglobalData  ) {
    setData (state:any, data:IGlobalData  ) {
      
        logger.log("set data globally.");
        state.DATAS[data.id] = data.value;
        logger.log(JSON.stringify(state.DATAS));

    },
    removeData(state: any, key:string) {
       
        logger.log("removed data globally.");
        delete state.DATAS[key];
        logger.log(JSON.stringify(state.DATAS));
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
