import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router';
/* localizaion i18n Class */
import i18n from '@/i18n';
/* Vuex Store & Settings */
import store from '@/store';

/* Ionic basic Classes */
import { toastController, IonRadioGroup, IonRadio, IonSpinner, loadingController, useIonRouter, IonBackdrop, IonNote, IonItemSliding, IonItemOptions, IonItemOption, IonItemGroup, IonItemDivider, IonLabel, IonTextarea, IonInput, alertController, IonicVue,  IonSelect,
  IonSelectOption, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonItem, IonList, IonText , IonCheckbox, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import '@/assets/css/global.scss';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import { createVuetify } from 'vuetify'

/* Theme variables */
import './theme/variables.css';

/* Global Class Define */
import LoggerService from './shared/bizMOB/LoggerService';

const vuetify = createVuetify();

const app = createApp(App)
.use(i18n)
.use(IonicVue)
.use(store)
.use(router)
.use(vuetify);

// bizMOB Web Config Set
(window as any).bizMOB.setConfig({
    App: {
        _sAppKey: process.env.VUE_APP_KEY, // App Key
        _bIsRelease: process.env.NODE_ENV === 'production', // Is Build Release
    },
    PushManager: {
        _sPushUrl: process.env.VUE_APP_PUSH_URL, // Push Server Url
    },
});

// registration bizMOB as global;
app.config.globalProperties.$bizMOB = (window as any).bizMOB; // this.$bizMOB
// registration moment as global;
app.config.globalProperties.$logger = new LoggerService();
// console.log(app.config.globalProperties.$logger);
app.config.unwrapInjectedRef = true;

// 크롬 console 디버깅용 객체 생성
(window as any).Vue = app;

//registration global Components;
app.component("IonContent",IonContent)
.component("IonPage",IonPage)
.component("IonHeader",IonHeader)
.component("IonToolbar",IonToolbar)
.component("IonTitle",IonTitle)
.component("IonFooter",IonFooter)
.component("IonBackButton",IonBackButton)
.component("IonItem",IonItem)
.component("IonList",IonList)
.component("IonText",IonText)
.component("IonSelect",IonSelect)
.component("IonSelectOption",IonSelectOption)
.component("IonButton",IonButton)
.component("IonButtons",IonButtons)
.component("alertController",alertController )
.component("IonCheckbox",IonCheckbox )
.component("IonInput",IonInput )
.component("IonTextarea",IonTextarea )
.component("IonLabel",IonLabel )
.component("IonItemDivider",IonItemDivider )
.component("IonItemGroup",IonItemGroup )
.component("IonItemOption",IonItemOption )
.component("IonItemOptions",IonItemOptions )
.component("IonItemSliding",IonItemSliding )
.component("IonNote",IonNote )
.component("IonBackdrop",IonBackdrop )
.component("useIonRouter",useIonRouter )
.component("loadingController ",loadingController  )
.component("IonSpinner  ",IonSpinner   )
.component("IonRadio ",IonRadio  )
.component("IonRadioGroup ",IonRadioGroup  )
.component("IonSelect ",IonSelect  )
.component("IonCard",IonCard)
.component("IonCardTitle",IonCardTitle)
.component("IonCardHeader",IonCardHeader)
.component("IonCardContent",IonCardContent)
.component("IonSelectOption ",IonSelectOption  )
.component("toastController ",toastController  );


router.isReady().then(() => {
  app.mount('#app');
});
