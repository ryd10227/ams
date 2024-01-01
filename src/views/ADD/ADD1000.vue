<!-- 
윤서연
 -->
<template src="./ADD1000.html"></template>
<script lang="ts">

import { computed, defineComponent, ref } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { mapMutations, useStore } from "vuex";

export default defineComponent({
    setup() {
        // VueX store 사용
        const store = useStore();

        // 이전 페이지(LST1000)에서 변경한 카테고리(hw/sw) 값을 가져옴
        const selectedCategory = computed(() => store.getters.selectedCategory);

        // 카테고리 변경 시 변경값을 store에 저장
        const changeCategory = (category) => { store.commit('setSelectedCategory', category); };

        // HOM1000에서 기기등록 버튼을 통해 이동했을 경우 VueX Store에 저장된 현재 디바이스의 정보(자산종류, 제조사, 모델명)를 불러오고, 아니라면 빈 문자열로 초기화
        const inputDeviceType = ref(store.state.deviceInfo?.device_type || '');
        const inputManufacturer = ref(store.state.deviceInfo?.manufacturer || '');
        const inputModel = ref(store.state.deviceInfo?.model || '');

        // 기타 입력 필드 데이터
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
            if (inputAssetCode.value !== '' || inputDeviceType.value !== '' || inputManufacturer.value !== '' || inputSerialNum.value !== '' || inputModel.value !== '' || inputHWCPU.value !== '' || inputHWSSD.value !== '' || inputHWHDD.value !== '' || inputHWMemory.value !== '' || inputAssetState.value !== '' || inputHWLocation.value !== '' || inputDepartment.value !== '' || inputUser.value !== '' || inputExUser.value !== '' || inputBuyDate.value !== '' || inputPayDate.value !== '' || inputSWExpireDate.value !== '' || inputHWExpectedReturnDate.value !== '' || inputReturnedDate.value !== '' || inputPeriodOfUse.value !== '' || inputNote.value !== '') 
            {
                return confirm('이 페이지를 벗어나면 마지막 저장 후 수정된 내용은 저장되지 않습니다. (\'저장\' 버튼을 클릭한 경우, 이 경고창을 무시하세요.)');
            }
            return true;
        };

        // 페이지 이탈 시 호출됨
        // HOM1000에서 기기등록 버튼을 통해 현재 페이지로 이동했을 경우 VueX Store에 현재 디바이스의 정보가 저장되어 있어 타 자산 등록 시 방해되므로
        // 페이지에서 이탈할 때 setDeviceInfo 뮤테이션을 호출헤 현재 디바이스의 정보를 null로 설정
        onBeforeRouteLeave(async (to, from, next) => {
            if (confirmLeave()) 
            {
                store.commit('setDeviceInfo', null);
                next();
            } 
            else 
            {
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
            if (!this.inputAssetCode || !this.inputSerialNum) 
            {
                alert('자산코드와 S/N은 필수 입력 항목입니다.');
                return;
            }

            // 선택한 탭이 '하드웨어'일 때 하드웨어 추가 로직
            if (this.selectedCategory === "hw") 
            {
                this.$bizMOB.Network.requestTr({
                    "_sTrcode": "AGY0605",
                    "_oHeader": {
                        "is_cryption": false,
                        "error_code": "",
                        "error_text": "",
                        "info_text": "",
                        "login_session_id": "",
                        "message_version": "",
                        "result": false,
                        "trcode": "AGY0605"
                    },
                    "_oBody": {
                        "assetArr": [{
                            "assetCode": this.inputAssetCode,
                            "assetState": this.inputAssetState,
                            "assetType": "HW",
                            "buyDate": this.inputBuyDate,
                            "cpu": this.inputHWCPU,
                            "curUser": this.inputUser,
                            "department": this.inputDepartment,
                            "dueDate": this.inputHWExpectedReturnDate,
                            "exUser": this.inputExUser,
                            "givenDate": this.inputPayDate,
                            "hdd": this.inputHWHDD,
                            "hwBrand": this.inputManufacturer,
                            "hwLocation": this.inputHWLocation,
                            "hwModelName": this.inputModel,
                            "hwType": this.inputDeviceType,
                            "memory": this.inputHWMemory,
                            "notes": this.inputNote,
                            "returnDate": "",
                            "serial": this.inputSerialNum,
                            "ssd": this.inputHWSSD
                        }]
                    },
                    "_fCallback": function (resAGY0605) {
                        try {
                            if (resAGY0605.header.error_code == "ERR0651") 
                            {
                                alert("이미 존재하는 자산코드 혹은 시리얼넘버입니다.\n다시 입력해주세요.")
                            }
                        }
                        catch (error) {
                            if (error.response && error.response.status === 500) 
                            {
                                // status 500: Internal Server Error
                                alert("서버에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                            }
                            else 
                            {
                                // Other unexpected errors
                                alert("예기치 못한 오류가 발생하였습니다.");
                            }
                        }
                    }
                });
            }

            // 선택한 탭이 '소프트웨어'일 때 소프트웨어 추가 로직
            else 
            {
                this.$bizMOB.Network.requestTr({
                    "_sTrcode": "AGY0607",
                    "_oHeader": {
                        "is_cryption": false,
                        "error_code": "",
                        "error_text": "",
                        "info_text": "",
                        "login_session_id": "",
                        "message_version": "",
                        "result": false,
                        "trcode": "AGY0607"
                    },
                    "_oBody": {
                        "assetArr": [{
                            "assetCode": this.inputAssetCode,
                            "assetState": this.inputAssetState,
                            "assetType": "SW",
                            "buyDate": this.inputBuyDate,
                            "curUser": this.inputUser,
                            "department": this.inputDepartment,
                            "dueDate": "",
                            "exUser": this.inputExUser,
                            "expireDate": this.inputSWExpireDate,
                            "givenDate": this.inputPayDate,
                            "returnDate": "",
                            "serial": this.inputSerialNum,
                            "swBrand": this.inputManufacturer,
                            "swType": this.inputDeviceType,
                            "notes": this.inputNote
                        }]
                    },
                    "_fCallback": function (resAGY0607) {
                        try {
                            if (resAGY0607.header.error_code == "ERR6071") 
                            {
                                alert("이미 존재하는 자산코드 혹은 시리얼넘버입니다.\n다시 입력해주세요.")
                            }
                        }
                        catch (error) {
                            if (error.response && error.response.status === 500) 
                            {
                                // status 500: Internal Server Error
                                alert("서버에 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
                            }
                            else 
                            {
                                // Other unexpected errors
                                alert("예기치 못한 오류가 발생하였습니다.");
                            }
                        }
                    }
                });
            }
            this.$router.replace('/main/list');
        },

    },
});
</script>
<!-- 
            // VueX mutations을 사용하여 데이터 추가
        ...mapMutations(['addData']),

        // 현재 날짜 가져옴
const currentDate = new Date();
const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;

// 입력 데이터를 Vuex 스토어에 저장
const inputData = {
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
    inputNote: this.inputNote,
};

this.addData(inputData);
 -->
