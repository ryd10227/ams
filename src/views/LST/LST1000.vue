<template src="./LST1000.html"></template>
<script lang="ts">

import { defineComponent, computed, ref, reactive, onMounted, watch } from "vue";
import { mapState, useStore } from 'vuex';

export default defineComponent({
    setup() {
        // VueX store 사용
        const store = useStore();

        // 이전 페이지(LST1000)에서 변경한 카테고리(hw/sw) 값을 가져옴
        const selectedCategory = computed(() => store.getters.selectedCategory);

        // 카테고리 변경 시 변경값을 store에 저장
        const changeCategory = (category) => { store.commit('setSelectedCategory', category); };

        // const tableWrap = ref(null);
        const displayedDataList = reactive([]);
        const batchSize = 50; // 한 번에 표시할 아이템 개수
        let isLoading = false;
        let page = 0;

        // 컴포넌트가 마운트 될 때 데이터를 불러옴
        onMounted(() => { loadMoreData(); });

        // 각 항목에 isChecked 속성 부여
        displayedDataList.forEach(item => {
            item.isChecked = ref(false);
        });

        // 선택된 항목이 하나라도 있으면 삭제 버튼 활성화
        const isDeleteButtonEnabled = computed(() => {
            return displayedDataList.some(item => item.isChecked);
        });

        // 모든 항목이 선택되었는지 확인
        const isAllChecked = ref(false);

        // 전체선택 토글
        const toggleSelectAll = () => {
            displayedDataList.forEach(item => {
                item.isChecked = !isAllChecked.value;
            });
        };

        // 카테고리가 변경되면 데이터를 초기화하고 다시 불러옴
        watch(selectedCategory, () => {
            page = 0;
            displayedDataList.length = 0;
            loadMoreData();
        });

        // 서버에서 가져온 아이템의 타입
        interface Item {
            ASSET_STATE: string;
            RETURN_DATE: string;
            ASSET_CODE: string;
            CUR_USER: string;
            DEPARTMENT: string;
            TYPE: string;
            ASSET_TYPE: string;
            IS_DELETED: boolean;
            HW_OR_SW: string;
        }

        // 서버에서 데이터 가져오기
        const fetchDataFromServer = (typeFilter) => {
            return new Promise((resolve) => {
                // window.bizMOB.Network.requestTr({
                //     "_sTrcode": "AGY0600",
                //     "_oHeader": {
                //         "is_cryption": false,
                //         "error_code": "",
                //         "error_text": "",
                //         "info_text": "",
                //         "login_session_id": "",
                //         "message_version": "",
                //         "result": false,
                //         "trcode": "AGY0600"
                //     },
                //     "_oBody": {
                //         "pageNum": "1",
                //         "sortColumn": "ASSET_CODE",
                //         "sortOrder": "ASC",
                //         "typeFilter": typeFilter
                //     },
                //     "_fCallback": (resAGY0600) => {
                //         const res = [JSON.parse(JSON.stringify(resAGY0600.body.assetList))];
                //         const startIdx = page * batchSize;
                //         const endIdx = startIdx + batchSize;
                //         const newData = res.slice(startIdx, endIdx);
                //         resolve(newData);
                //     }
                // });
            });
        };

        // 선택된 카테고리가 바뀔 때마다 카테고리 필터에 맞춰 데이터를 다시 불러옴
        const loadMoreData = () => {
            if (isLoading) 
            {
            return;
            }
            isLoading = true;

            let typeFilter = "ALL";
            if (selectedCategory.value === 'hw') 
            {
            typeFilter = "HW";
            }
            else if (selectedCategory.value === 'sw') 
            {
            typeFilter = "SW";
            }
            fetchDataFromServer(typeFilter).then((res: any) => {
                isLoading = false;
                displayedDataList.push(...res[0]);
                page++;
            });
        };

        return {
            displayedDataList,
            selectedCategory,
            changeCategory,
            isDeleteButtonEnabled,
            isAllChecked,
            toggleSelectAll,
        };
    },
    data() {
        return {
            selectedData: {},
            selectedOption: 'assetCode',
        };
    },
    methods: {
        deleteItems() {
            const selectedItems = this.displayedDataList.filter(item => item.isChecked.value);

            if (selectedItems.length > 0) {
                // 삭제 로직 (미완성)
            }
        },

        // 등록 버튼 클릭 이벤트. 등록 페이지로 이동
        goToAddPage() {
            const selectedCategory = this.selectedCategory;
            // selectedCategory가 'entire'일 시 자동으로 'hw'로 바꿔줌
            if (selectedCategory === 'entire') 
            {
                this.$store.commit('setSelectedCategory', 'hw');
            }
            this.$router.push('/main/add');
        },


        // 아이템 상세보기
        showDetails(item) {
            item.tr_open = !item.tr_open;
            console.log(item.assetType);
            this.selectedData = item;
            this.tr_open = item.tr_open;
        },

        // 아이템 상세보기 취소
        closeDetails() {
            this.tr_open = false;
        },

        // 선택된 항목들을 Vuex 스토어에서 제거
        // deleteItems() {
        //     if (confirm('선택된 항목을 삭제할까요?\n삭제된 자산은 PC에서만 확인 가능합니다.')) {
        //         // 체크박스 선택된 목록들
        //         const selectedItems = this.dataList.filter(item => item.isChecked && item.assetType === `is${this.selectedCategory.toUpperCase()}` || this.selectedCategory === 'entire');

        //         // deleteData mutation 호출
        //         this.$store.commit('deleteData', selectedItems);

        //         console.log('Deleted items:', selectedItems);
        //         alert('삭제되었습니다.\n삭제된 자산은 PC에서 확인해주세요.')
        //     }
        // },

        // sortByUser() {
        //     const batchSize = 50; // 한 번에 표시할 아이템 개수
        //     let page = 0;

        //     let typeFilter = "ALL";
        //     if (this.selectedCategory === 'hw') typeFilter = "HW";
        //     else if (this.selectedCategory === 'sw') typeFilter = "SW";

        //     new Promise((resolve) => {
        //         window.bizMOB.Network.requestTr({
        //             "_sTrcode": "AGY0600",
        //             "_oHeader": {
        //                 "is_cryption": false,
        //                 "error_code": "",
        //                 "error_text": "",
        //                 "info_text": "",
        //                 "login_session_id": "",
        //                 "message_version": "",
        //                 "result": false,
        //                 "trcode": "AGY0600"
        //             },
        //             "_oBody": {
        //                 "pageNum": "1",
        //                 "sortColumn": "CUR_USER",
        //                 "sortOrder": "ASC",
        //                 "typeFilter": typeFilter
        //             },
        //             "_fCallback": (resAGY0600) => {
        //                 const res = [JSON.parse(JSON.stringify(resAGY0600.body.assetList))];
        //                 const startIdx = page * batchSize;
        //                 const endIdx = startIdx + batchSize;
        //                 const newData = res.slice(startIdx, endIdx);
        //                 resolve(newData);
        //             }
        //         });
        //     });
        // },

    },
});
</script>