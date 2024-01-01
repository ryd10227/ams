// 인턴 3팀 윤서연

import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import RootRouter from './RootRouter';
import { toastController } from '@ionic/vue';
import store from '@/store';

const routes: Array<RouteRecordRaw> = ([] as Array<RouteRecordRaw>).concat(RootRouter);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/**
 * 네비게이션 가드 설정
 * to: 이동할 url
 * from: 현재 url
 * next: to에서 지정한 url로 이동하기 위해 호출하는 함수
 */

// 뒤로가기 버튼을 2초 이내에 2번 누르면 앱이 종료됩
router.beforeEach((to, from, next) => {
  let backbtnPressed = 0;
  window.bizMOB.setEvent("backbutton", () => {
    const now = new Date().getTime();
    if (now - backbtnPressed < 2000) 
    {
      window.bizMOB.App.exit({ "_sType": "exit" });
    }
    else 
    {
      if (to.path === '/fpw') 
      {
        router.go(-1);
      } 
      else
      {
        showToast("뒤로가기 버튼을 한 번 더 누르면 종료됩니다.");
      }
    }
    backbtnPressed = new Date().getTime();
  });
  // 라우터 이동 시 이동된 Path를 VueX Store에 저장
  store.commit('setCurrentPath', to.path);

  // 인자에 path를 넣으면 해당 path로 강제 이동 (Ex. 로그인 필요페이지 접근시 로그인 화면 호출 -- next("/login"))
  next();
});

// 뒤로가기 버튼 한 번 클릭 시 토스트 띄움
function showToast(message) {
  toastController
    .create({
      message: message,
      duration: 2000,
      position: 'bottom'
    })
    .then((toast) => {
      toast.present();
    });
}

export default router