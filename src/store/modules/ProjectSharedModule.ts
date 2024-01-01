const state = {
    SAMPLE : "test"
}

const getters = {
    getSample: (state: { SAMPLE: string; })  =>  {
       return state.SAMPLE;
    }
}

const mutations = {
    setSample(state: any, sampleData:string) {
       
        state.sample = sampleData;
        
    }
}

const actions = {
    setSampleData : ({ commit }: any, sampleData: string ) => {
        commit('setbizMOBState',sampleData);
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
