import LoggerService from '@/shared/bizMOB/LoggerService';
import i18n from '@/i18n';

const logger  = new LoggerService();

class LocaleService {
    // private currentLangCd = "";
    constructor() { 
    //    this.currentLangCd = i18n.global.locale.value;
    //    console.log(window.bizMOB);
    }
   
    initLocale(){
        window.bizMOB.Localization.getLocale({
            _fCallback : function(res:any){
                if(res.locale != ""){
                    const initLocale = res.locale.substring(0,2);
                    i18n.global.locale.value = initLocale;
                    // window.bizMOB.Network.changeLocale({"_sLocaleCd" : initLocale});
                    window.bizMOB.Logger.log("[LocaleService][initLocale] locale language is changed to " + initLocale);
                }
                
            }
        });
    }

    changeLocale(newLocaleCd:string){
       
        window.bizMOB.Network.changeLocale({"_sLocaleCd" : newLocaleCd });
        window.bizMOB.Localization.setLocale({
            "_sLocaleCd" : newLocaleCd, 
            "_fCallback" : function(res:any) {
                window.bizMOB.Logger.log("[LocaleService][changeLocale] Locale language stored successfully. " + newLocaleCd);
            }
        });
        
    }
    
}

export default LocaleService