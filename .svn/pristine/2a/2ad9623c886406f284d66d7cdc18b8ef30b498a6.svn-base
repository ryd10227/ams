import LoggerService from '@/shared/bizMOB/LoggerService';

const logger  = new LoggerService();

const state = {
    IS_LOGIN : false,
    IS_READY_BIZMOB : false,
}

const getters = {
    isLogin: (state:any)  =>  {
       return state.IS_LOGIN;
    },
    isReadyApp : (state:any)  =>  {
        return state.IS_READY_BIZMOB;
    }
}

const mutations = {
    setAppReadyState(state: any, isReady:boolean) {
       
        state.IS_READY_BIZMOB = isReady;
        logger.log("bizMOB Ready State is updated.");
        logger.log( "bizMOB Ready state changed to " + state.IS_READY_BIZMOB);
    },
    setLoginState(state: any, loginYN:boolean) {
       
        state.IS_LOGIN = loginYN;
        logger.log("Login State is updated.");
        logger.log( "Login State is changed to" + state.IS_LOGIN);
    }
}

const actions = {
    setAppReadyState : ({ commit }: any, isReady: boolean ) => {
        commit('setAppReadyState',isReady);
    },
    setLoginState : ({ commit }: any, loginYN: boolean ) => {
        commit('setLoginState',loginYN);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
