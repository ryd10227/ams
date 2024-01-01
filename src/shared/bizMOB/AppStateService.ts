import { useStore } from "vuex";
import LoggerService from '@/shared/bizMOB/LoggerService';

const logger  = new LoggerService();

class AppStateService {
    private store:any;
    constructor() { 
        this.store  = useStore();
    }
   
    setAppReadyState(appState:boolean){
        this.store.dispatch("AppStateModule/setAppState", appState );
        // logger.log("App Ready State is updated. " + appState );
    }

    isReadyApp(){
        const isReady = this.store.getters["AppStateModule/isReadyApp"];
        return isReady;
    }

    setLoginState(loginState:boolean){
        this.store.dispatch("AppStateModule/setAppReadyState", loginState );
        // logger.log("App Ready State is updated. " + loginState );
    }

    isLogin(){
        const isLogin = this.store.getters["AppStateModule/isLogin"];
        return isLogin;
    }
    
}

export default AppStateService