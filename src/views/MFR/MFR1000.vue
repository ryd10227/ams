<template src="./MFR1000.html"></template>
<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
    methods: {
        // 로그아웃 버튼 클릭 이벤트
        logout() {
            // 서버 통신 오류 처리하는 부분
            // this.$bizMOB.Network.requestTr({
            //     "_sTrcode": "AGY0800",
            //     "_oHeader": {
            //         // empty
            //     },
            //     "_oBody": {
            //         // empty
            //     },
            //     "_fCallback": (resAGY0800) => {
            //         alert("로그아웃 되었습니다.\n로그인 후 다시 이용해주세요.");
            //         sessionStorage.removeItem("userList"); // storage에 저장된 유저 정보 삭제
            //         this.$router.replace('/login'); // 다시 로그인하도록 권유할 것
            //     }
            // });
        },
    },
});
</script>