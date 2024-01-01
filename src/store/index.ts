import { createStore } from 'vuex';
import globalModule from './modules/GlobalSharedModule';
import AppStateModule from './modules/AppStateModule';
import ProjectSharedModule from './modules/ProjectSharedModule';


export default createStore({
    modules: {globalModule, AppStateModule, ProjectSharedModule},
})

