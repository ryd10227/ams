import { createStore } from 'vuex';

export default createStore({
  state: {
    dataList: [], // 입력된 데이터를 저장하는 배열
    platformInfo: null, // 기기등록 버튼 플랫폼 정보
    currentPath: '', // Path 설정
    selectedCategory: 'entire',
  },
  mutations: {
    // ADD1000 에서 자산 추가하는 메소드
    addData(state, payload) {
      state.dataList.push(payload);
    },
    // LST1000 자산 삭제 메소드
    deleteData(state, payload) {
      state.dataList = state.dataList.filter(item => !payload.includes(item));
    },
    // HOM1000 현재 기기를 자산으로 등록하기 클릭 이벤트, navigator에서 가져온 디바이스의 플랫폼 정보를 저장
    setPlatformInfo(state, platformInfo) {
      state.platformInfo = platformInfo;
    },
    // Path 설정
    setCurrentPath(state, path) {
      state.currentPath = path;
    },
    // 자산 카테고리 설정
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
  },
  getters: {
    // 자산 카테고리 getter
    selectedCategory: (state) => state.selectedCategory,
  },
});