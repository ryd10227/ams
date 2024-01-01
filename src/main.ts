import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import store from '@/store';

import {
  toastController, IonRadioGroup, IonRadio, IonSpinner, loadingController, useIonRouter, IonBackdrop, IonNote, IonItemSliding, IonItemOptions, IonItemOption, IonItemGroup, IonItemDivider, IonLabel, IonTextarea, IonInput, alertController, IonicVue, IonSelect,
  IonSelectOption, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonItem, IonList, IonText, IonCheckbox, IonCard, IonCardTitle, IonCardHeader, IonCardContent
} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

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
/* Custom CSS */
import '@/assets/css/global.scss';

const vuetify = createVuetify();
const app = createApp(App)
  .use(IonicVue)
  .use(store)
  .use(router)
  .use(vuetify);

//registration global Components;
app
  .component("IonContent", IonContent)
  .component("IonPage", IonPage)
  .component("IonHeader", IonHeader)
  .component("IonToolbar", IonToolbar)
  .component("IonTitle", IonTitle)
  .component("IonFooter", IonFooter)
  .component("IonBackButton", IonBackButton)
  .component("IonItem", IonItem)
  .component("IonList", IonList)
  .component("IonText", IonText)
  .component("IonSelect", IonSelect)
  .component("IonSelectOption", IonSelectOption)
  .component("IonButton", IonButton)
  .component("IonButtons", IonButtons)
  .component("alertController", alertController)
  .component("IonCheckbox", IonCheckbox)
  .component("IonInput", IonInput)
  .component("IonTextarea", IonTextarea)
  .component("IonLabel", IonLabel)
  .component("IonItemDivider", IonItemDivider)
  .component("IonItemGroup", IonItemGroup)
  .component("IonItemOption", IonItemOption)
  .component("IonItemOptions", IonItemOptions)
  .component("IonItemSliding", IonItemSliding)
  .component("IonNote", IonNote)
  .component("IonBackdrop", IonBackdrop)
  .component("useIonRouter", useIonRouter)
  .component("loadingController ", loadingController)
  .component("IonSpinner  ", IonSpinner)
  .component("IonRadio ", IonRadio)
  .component("IonRadioGroup ", IonRadioGroup)
  .component("IonSelect ", IonSelect)
  .component("IonCard", IonCard)
  .component("IonCardTitle", IonCardTitle)
  .component("IonCardHeader", IonCardHeader)
  .component("IonCardContent", IonCardContent)
  .component("IonSelectOption ", IonSelectOption)
  .component("toastController ", toastController);

router.isReady().then(() => {
  app.mount("#app");
});
