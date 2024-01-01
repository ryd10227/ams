<!-- 
인턴 3팀 윤서연, 소소휘
 -->

<!-- 대시보드 전문 미완성으로, CalendarDate를 제외하고 import된 모든 컴포넌트가 전문 완성 전 VueX Store를 사용해 자산 정보를 저장하고(ADD1000.vue 최하단 주석) 저장된 데이터를 받아와 대시보드에 반영하는 소스임 -->

<template src="./HOM1000.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/pagination";
import ChartAsset from '../../components/HOM/ChartAsset.vue'
import CalendarDate from '../../components/HOM/CalendarDate.vue';
import TableChangePerDate from '../../components/HOM/TableChangeHistoryByDate.vue';
import TableHW from '../../components/HOM/TableHW.vue';
import TableSW from '../../components/HOM/TableSW.vue';
import TableDueDate from '../../components/HOM/TableDueDate.vue';

export default defineComponent({
  name: "HOM1000",
  components: {
    ChartAsset,
    CalendarDate,
    TableChangePerDate, TableHW, TableSW, TableDueDate,
  },
  setup() {
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Pagination],
    };
  },

  methods: {
    // '현재 기기를 자산으로 등록하기' 버튼 클릭 이벤트
    // $bizMOB.Device에서 가져온 디바이스 정보를 Vuex store 저장, 카테고리를 'hw'로 Vuex store 저장, 하드웨어 자산 추가 페이지로 이동
    registerDevice() {
      var deviceInfo = this.$bizMOB.Device.getInfo();
      this.$store.commit('setDeviceInfo', deviceInfo);
      this.$store.commit('setSelectedCategory', 'hw');
      this.$router.replace('/main/add');
    },
  },
});
</script>