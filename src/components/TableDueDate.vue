<!-- 대시보드 페이지 중 반납기한 임박 테이블 컴포넌트 -->
<template src="./TableDueDate.html"></template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    computed: {
        // 미반납 자산 중 반납기한이 현재 날짜와 가장 가까운 자산 5개를 보여줌
        upcomingReturns() {
            // 현재 날짜를 가져옴
            const currentDate = new Date();

            // 반납 예정 아이템 필터링
            const items = this.$store.state.dataList
                // 반납기한은 정해졌는데 반납일이 입력되지 않은 경우
                .filter(item => item.inputHWExpectedReturnDate && !item.inputReturnedDate)
                // 그 중에서 오늘 날짜와 가까운 것부터 5개 표시, 반납기한이 지난 항목은 붉은색으로 표시하는 스타일 적용
                .map(item => ({
                    ...item,
                    dateDifference: Math.abs(currentDate.getTime() - new Date(item.inputHWExpectedReturnDate).getTime()),
                    isOverdue: new Date(item.inputHWExpectedReturnDate) < currentDate
                }))
                .sort((a, b) => a.dateDifference - b.dateDifference)
                .slice(0, 5);

            return items;
        }
    },
    methods: {
        // 더보기 버튼 클릭 이벤트, '전체' 카테고리가 선택된 채로 리스트 페이지로 이동
        more() {
            this.$store.commit('setSelectedCategory', 'entire');
            this.$router.replace('/main/list');
        },
    },
});
</script>