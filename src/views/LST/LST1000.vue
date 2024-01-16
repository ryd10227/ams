<template src="./LST1000.html"></template>
<script lang="ts">

import { defineComponent, computed, ref, reactive, onMounted, watch } from "vue";
import { mapMutations, mapState, useStore } from 'vuex';
import axios from 'axios';

export default defineComponent({
    setup() {
        // VueX store 사용
        const store = useStore();

        // 이전 페이지(ADD1000)에서 변경한 카테고리(hw/sw) 값을 가져옴
        const selectedCategory = computed(() => store.getters.selectedCategory);

        // 카테고리 변경 시 변경값을 store에 저장
        const changeCategory = (category) => { store.commit('setSelectedCategory', category); };


        watch(selectedCategory, (newCategory) => {
            fetchData(newCategory); // Replace 'this' with the instance variable
        });

        const fetchData = (selectedCategory) => {
            switch (selectedCategory) {
                case 'entire':
                    // Code for 'entire' category
                    break;
                case 'hw':
                    axios.get('https://assetmng-hwlee.koyeb.app/assets/hardwares')
                        .then(response => {
                            return response.data;
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    break;
                case 'sw':
                    axios.get('https://assetmng-hwlee.koyeb.app/assets/softwares')
                        .then(response => {
                            // this.displayedDataList = response.data;
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    break;
                default:
                // Default code, if selectedCategory doesn't match any of the cases
            }
        };


        return {
            selectedCategory,
            changeCategory,
        };
    },
    data() {
        return {
            selectedData: {},
            selectedOption: 'assetCode',
            displayedDataList: [],
        };
    },
    created() {
        this.fetchData(this.selectedCategory);
    },
    computed: {
        isDeleteButtonEnabled() {
            // Check if any item is selected
            return this.displayedDataList.some(item => item.isChecked);
        },
    },

    methods: {
        fetchData(selectedCategory) {
            switch (selectedCategory) {
                case 'entire':
                    // Code for 'entire' category
                    break;
                case 'hw':
                    axios.get('https://assetmng-hwlee.koyeb.app/assets/hardwares')
                        .then(response => {
                            this.displayedDataList = response.data;
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    break;
                case 'sw':
                    axios.get('https://assetmng-hwlee.koyeb.app/assets/softwares')
                        .then(response => {
                            this.displayedDataList = response.data;
                        })
                        .catch(err => {
                            console.error(err);
                        });
                    break;
                default:
                // Default code, if selectedCategory doesn't match any of the cases
            }


            // const options = {
            //     params: {
            //         // id: '2',
            //         // name: 'name',
            //     },
            // };

        },

        selectItem(item) {
            item.isChecked = !item.isChecked;
            const selectedItems = this.displayedDataList.filter(item => item.isChecked);
            console.log('item.hw_idx: ', item.hw_idx)
        },

        toggleSelectAll() {
            this.displayedDataList.forEach(item => (item.isChecked = this.isAllChecked));
        },

        checkWillBeDeletedItems(item) {
            const selectedItems = this.displayedDataList.filter(item => item.isChecked);
            console.log(selectedItems)

        },

        deleteItems(item) {
            const selectedItems = this.displayedDataList.filter(item => item.isChecked);
            // console.log(selectedItems.data)
            if (selectedItems.length > 0) {
                const idxValue = parseInt(selectedItems[0].hw_idx);
                // console.log(idxValue)
                axios.delete('https://assetmng-hwlee.koyeb.app/assets/hardware', { params: { idx: idxValue } })
                    // .then(response => {
                    //     this.displayedDataList = response.data;
                    // })
                    .catch(err => {
                        console.error(err);
                    });
            }

            // Remove selected items from the displayedDataList
            this.displayedDataList = this.displayedDataList.filter(item => !item.isChecked);

            // Deselect all checkboxes
            this.isAllChecked = false;
        },

        // 등록 버튼 클릭 이벤트. 등록 페이지로 이동
        goToAddPage() {
            const selectedCategory = this.selectedCategory;
            // selectedCategory가 'entire'일 시 자동으로 'hw'로 바꿔줌
            if (selectedCategory === 'entire') {
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
    },
});
</script>