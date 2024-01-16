<template src="./ADD1000.html"></template>
<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { mapMutations, useStore } from "vuex";
import axios from 'axios';

export default defineComponent({
    setup() {
        // VueX store 사용
        const store = useStore();

        // 이전 페이지(LST1000)에서 변경한 카테고리(hw/sw) 값을 가져옴
        const selectedCategory = computed(() => store.getters.selectedCategory);

        // 카테고리 변경 시 변경값을 store에 저장
        const changeCategory = (category) => { store.commit('setSelectedCategory', category); };

        // HOM1000에서 기기등록 버튼을 통해 이동했을 경우 VueX Store에 저장된 현재 디바이스의 정보(플랫폼)를 불러오고, 아니라면 빈 문자열로 초기화
        const inputModel = ref(store.state.platformInfo || '');

        // 기타 입력 필드 데이터
        const inputManufacturer = ref('');
        const inputDeviceType = ref('');
        const inputAssetCode = ref('');
        const inputSerialNum = ref('');
        const inputHWCPU = ref('');
        const inputHWSSD = ref('');
        const inputHWHDD = ref('');
        const inputHWMemory = ref('');
        const inputAssetState = ref('');
        const inputHWLocation = ref('');
        const inputDepartment = ref('');
        const inputUser = ref('');
        const inputExUser = ref('');
        const inputBuyDate = ref('');
        const inputPayDate = ref('');
        const inputSWExpireDate = ref('');
        const inputHWExpectedReturnDate = ref('');
        const inputReturnedDate = ref('');
        const inputPeriodOfUse = ref('');
        const inputNote = ref('');

        // 입력 필드에 값이 있는데 저장하지 않고 페이지를 떠날 때 컨펌창을 띄움
        const confirmLeave = () => {
            if (inputAssetCode.value !== '' || inputDeviceType.value !== '' || inputManufacturer.value !== '' || inputSerialNum.value !== '' || inputModel.value !== '' || inputHWCPU.value !== '' || inputHWSSD.value !== '' || inputHWHDD.value !== '' || inputHWMemory.value !== '' || inputAssetState.value !== '' || inputHWLocation.value !== '' || inputDepartment.value !== '' || inputUser.value !== '' || inputExUser.value !== '' || inputBuyDate.value !== '' || inputPayDate.value !== '' || inputSWExpireDate.value !== '' || inputHWExpectedReturnDate.value !== '' || inputReturnedDate.value !== '' || inputPeriodOfUse.value !== '' || inputNote.value !== '') {
                return confirm('이 페이지를 벗어나면 마지막 저장 후 수정된 내용은 저장되지 않습니다. (\'저장\' 버튼을 클릭한 경우, 이 경고창을 무시하세요.)');
            }
            return true;
        };

        // 페이지 이탈 시 호출됨
        // HOM1000에서 기기등록 버튼을 통해 현재 페이지로 이동했을 경우 VueX Store에 현재 디바이스의 플랫폼 정보가 저장되어 있어 타 자산 등록 시 방해되므로
        // 페이지에서 이탈할 때 setPlatformInfo 뮤테이션을 호출헤 현재 디바이스의 정보를 null로 설정
        onBeforeRouteLeave(async (to, from, next) => {
            if (confirmLeave()) {
                store.commit('setPlatformInfo', null);
                next();
            }
            else {
                next(false);
            }
        });

        return {
            selectedCategory,
            changeCategory,
            inputAssetCode, inputDeviceType, inputManufacturer, inputSerialNum, inputModel, inputHWCPU, inputHWSSD, inputHWHDD, inputHWMemory, inputAssetState, inputHWLocation, inputDepartment, inputUser, inputExUser, inputBuyDate, inputPayDate, inputSWExpireDate, inputHWExpectedReturnDate, inputReturnedDate, inputPeriodOfUse, inputNote,
        };
    },
    methods: {
        // 저장 버튼 클릭 이벤트
        saveData() {
            // 필수 입력 필드 유효성 검사
            if (!this.inputAssetCode || !this.inputSerialNum) {
                alert('자산코드와 S/N은 필수 입력 항목입니다.');
                return;
            }

            if (this.selectedCategory === "hw") {
                const dataToSend = {
                    asset: {
                        // assetCode: this.inputAssetCode,
                        assettype: this.inputDeviceType,
                        sn: this.inputSerialNum,
                        dept: this.inputDepartment,
                        manufacturer: this.inputManufacturer,
                        assetname: this.inputModel,
                    },
                    cpu: this.inputHWCPU,
                    ssd: this.inputHWSSD,
                    hdd: this.inputHWHDD,
                    memory: this.inputHWMemory,
                    status: this.inputAssetState,
                    usageduration: this.inputPeriodOfUse,
                    returndate: this.inputReturnedDate,
                    // assignedDate: "2024-01-11T12:30:00",
                    currentuser: this.inputUser,
                    previoususer: this.inputExUser,
                    location: this.inputHWLocation,
                };

                axios.post('https://assetmng-hwlee.koyeb.app/assets/hardware', dataToSend)
                    .catch(error => {
                        console.error(error);
                    });
            }

            else {
                const dataToSend = {
                    asset: {
                        assettype: this.inputDeviceType,
                        sn: this.inputSerialNum,
                        dept: this.inputDepartment,
                        manufacturer: this.inputManufacturer,
                        assetname: this.inputModel,
                    },
                    expirydate: this.inputSWExpireDate,
                };

                axios.post('https://assetmng-hwlee.koyeb.app/assets/software', dataToSend)
                    .catch(error => {
                        console.error(error);
                    });
            }

            // 에러 처리
            //         "_fCallback": function (resAGY0605) {
            //             try {
            //                 if (resAGY0605.header.error_code == "ERR0651") {
            //                     alert("이미 존재하는 자산코드 혹은 시리얼넘버입니다.\n다시 입력해주세요.")
            //                 }
            //             }
            //             catch (error) {
            //                 if (error.response && error.response.status === 500) {
            //                     // status 500: Internal Server Error
            //                     alert("서버에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
            //                 }
            //                 else {
            //                     // Other unexpected errors
            //                     alert("예기치 못한 오류가 발생하였습니다.");
            //                 }
            //             }
            //         }
            // }
            this.$router.replace('/main/list');
        },

    },
});
</script>


<!-- 
    editType: 'isAdded',
    currentDate: formattedDate,
    assetType: this.selectedCategory === 'sw' ? 'isSW' : 'isHW',
    inputAssetCode: this.inputAssetCode,
    inputDeviceType: this.inputDeviceType,
    inputManufacturer: this.inputManufacturer,
    inputSerialNum: this.inputSerialNum,
    ...((this.selectedCategory === 'hw') && {
        inputModel: this.inputModel,
        inputHWCPU: this.inputHWCPU,
        inputHWSSD: this.inputHWSSD,
        inputHWHDD: this.inputHWHDD,
        inputHWMemory: this.inputHWMemory,
        inputHWLocation: this.inputHWLocation,
    }),
    inputAssetState: this.inputAssetState,
    inputDepartment: this.inputDepartment,
    inputUser: this.inputUser,
    inputExUser: this.inputExUser,
    inputBuyDate: this.inputBuyDate,
    inputPayDate: this.inputPayDate,
    ...((this.selectedCategory === 'sw') && { inputSWExpireDate: this.inputSWExpireDate }),
    inputHWExpectedReturnDate: this.inputHWExpectedReturnDate,
    inputReturnedDate: this.inputReturnedDate,
    inputPeriodOfUse: this.inputPeriodOfUse,
    inputNote: this.inputNote, -->
