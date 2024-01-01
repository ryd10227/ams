<!-- 대시보드 페이지 중 날짜별 변경이력 테이블 컴포넌트의 하위 컴포넌트, 캘린더에서 선택된 날짜를 표시 -->
<template src="./CalendarDate.html"></template>
<script lang="ts">
export default ({
  props: {
    PickedDate: {
      type: String,
      default: "Hm"
    },
  },
});
</script>