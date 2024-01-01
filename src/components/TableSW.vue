<!-- 대시보드 페이지 중 소프트웨어 자산 변경이력 테이블 컴포넌트 -->
<template src="./TableSW.html"></template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    computed: {
        // 소프트웨어 자산의 수정 내역을 최신순으로 5개 보여줌
        recentSWItems() {
            return this.$store.state.dataList.filter(item => item.assetType === 'isSW').slice(-5).reverse();
        }
    },
    methods: {
        // 더보기 버튼 클릭 이벤트, '소프트웨어' 카테고리가 선택된 채로 리스트 페이지로 이동
        more() {
            this.$store.commit('setSelectedCategory', 'sw');
            this.$router.replace('/main/list');
        }
    }
});
</script>