<!-- 
인턴 3팀 윤서연
 -->
<!-- 대시보드 페이지 중 날짜별 변경이력 테이블 컴포넌트 -->
<template src="./TableChangeHistoryByDate.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
import { VDatePicker } from "vuetify/lib/components/index.mjs";
import CalendarDate from './CalendarDate.vue';

export default defineComponent({
  components: {
    VDatePicker,
    CalendarDate,
  },
  data() {
    return {
      datePicker: new Date(),
      pickedData: ''
    };
  },
  computed: {
    // 추가된 자산의 개수를 반환
    isAdded() {
      return this.calculateItemCount('isAdded');
    },

    // 수정된 자산의 개수를 반환
    isModified() {
      return this.calculateItemCount('isModified');
    },

    // 삭제된 자산의 개수를 반환
    isDeleted() {
      return this.calculateItemCount('isDeleted');
    },

    // 전체 자산의 변경사항을 최신순으로 5개 보여줌
    recentDateItems() {
      const dateItems = this.$store.state.dataList;
      return dateItems.slice(-5).reverse();
    },
  },
  methods: {
    // 캘린더에서 날짜 선택 시 호출됨
    dataChanged() {
      this.pickedData = (new Date(this.datePicker.getTime() - (this.datePicker.getTimezoneOffset() * 60000)).toISOString()).substring(0, 10);
      return;
    },

    // 더보기 버튼 클릭 이벤트, '전체' 카테고리가 선택된 채로 리스트 페이지로 이동
    more() {
      this.$store.commit('setSelectedCategory', 'entire');
      this.$router.replace('/main/list');
    },

    // 추가, 수정, 삭제된 자산의 개수를 계산
    calculateItemCount(type) {
      return this.$store.state.dataList.filter(item => item.editType === type).length;
    },
  },
  mounted() {
    this.pickedData = (new Date(this.datePicker.getTime() - (this.datePicker.getTimezoneOffset() * 60000)).toISOString()).substring(0, 10)
  },
});
</script>