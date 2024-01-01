<template src="./HOM1000.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import "swiper/css/pagination";
import ChartAsset from '../../components/ChartAsset.vue'
import CalendarDate from '../../components/CalendarDate.vue';
import TableChangePerDate from '../../components/TableChangeHistoryByDate.vue';
import TableHW from '../../components/TableHW.vue';
import TableSW from '../../components/TableSW.vue';
import TableDueDate from '../../components/TableDueDate.vue';

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
      // var deviceInfo = this.$bizMOB.Device.getInfo();
      // this.$store.commit('setDeviceInfo', deviceInfo);
      this.$store.commit('setSelectedCategory', 'hw');
      this.$router.replace('/main/add');
    },
  },
});
</script>