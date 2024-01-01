<template src="./LOG1000.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
import * as CryptoJS from 'crypto-js';

export default defineComponent({
	name: "LOG1000",
	components: {},
	data() {
		return {
			loginFailed: false,
			pw: false, // pw 가리기 여부
			bt_loading: false, // 로그인 버튼 로딩 css 처리
			userId: '', // id input
			userPw: '', // pw input
			hashedPw: '', // 비밀번호 암호화
			chkSaveId: '', // 체크박스 선택 여부
			userInfo: [], // sessionStorage에 저장할 유저 정보
			loginErrorTxt: '', // 로그인 에러 문구
			userPerm: '' // 사용자 권한(관리자, 일반 사용자) 부여
		};
	},
	mounted() {
		this.initData();
	},
	methods: {
		initData() {
			// 저장된 아이디 값이 존재할 경우
			// var saveId = this.$bizMOB.Storage.get({ "_sKey": "saveId" });

			// if (saveId) 
			// {
			// 	this.userId = saveId;
			// 	this.chkSaveId = true;
			// }
		},
		hashPassword() {
			var hashedPassword = CryptoJS.SHA256(this.userPw).toString(CryptoJS.enc.Hex);
			this.hashedPw = hashedPassword;
		},
		loginMethod() {

			// 아이디 입력 확인
			if (!this.userId) {
				this.loginErrorTxt = "아이디를 입력해주세요.";
				this.loginFailed = true;

				return;
			}

			// 비밀번호 입력 확인
			if (!this.userPw) {
				this.loginErrorTxt = "비밀번호를 입력해주세요.";
				this.loginFailed = true;
				return;
			}

			this.hashPassword(); // 비밀번호 암호화

			var address = window.location.href; // 현재 접속한 ip 및 port 포함된 url 가져오기

			if (this.userId && this.userPw) {
				this.bt_loading = !this.bt_loading;

				// 서버로부터 응답 받았는지 확인하는 변수
				let responseReceived = false;

				// timeout 5초로 설정
				const timeoutId = setTimeout(() => {
					if (!responseReceived) {
						this.loginErrorTxt = "서버 응답이 지연되는 중입니다. 잠시 후 다시 시도해주세요.";
					}
				}, 5000);
				
				this.$router.replace('/main/dashboard');

				// this.$bizMOB.Network.requestTr({
				// 	"_sTrcode": "LOGIN",
				// 	"_oHeader": {
				// 		"result": false,
				// 		"info_text": "",
				// 		"login_session_id": "",
				// 		"error_text": "",
				// 		"message_version": "",
				// 		"error_code": "",
				// 		"trcode": "LOGIN"
				// 	},
				// 	"_oBody": {
				// 		"phone_number": "",
				// 		"emulator_flag": true,
				// 		"app_key": "I23ANT03",
				// 		"device_id": "1",
				// 		"user_id": "userIdForPortal",
				// 		"password": "",
				// 		"manual_phone_number": true,
				// 		"os_type": "Web",
				// 		"auth_no": "unknown",
				// 		"legacy_message": {
				// 			"header": {
				// 				"is_cryption": false,
				// 				"error_code": "",
				// 				"error_text": "",
				// 				"info_text": "",
				// 				"login_session_id": "",
				// 				"message_version": "",
				// 				"result": false,
				// 				"trcode": "AGY0100"
				// 			},
				// 			"body": {
				// 				"loginId": this.userId,
				// 				"hashedPwd": this.hashedPw
				// 			}
				// 		},
				// 		"legacy_trcode": "AGY0100"
				// 	},
				// 	"_fCallback": (resAGY0100) => {
				// 		try 
				// 		{
				// 			// 로그인 성공하면 session 정보를 localStorage에 저장하기
				// 			if (resAGY0100.header.result == true) 
				// 			{
				// 				responseReceived = true; // 서버로부터 응답 받았으면 true

				// 				if (resAGY0100.body.legacy_message.body.hasPerm == true) 
				// 				{
				// 					this.userPerm = resAGY0100.body.legacy_message.body.hasPerm;
				// 				}

				// 				// 체크박스 선택 여부에 따라 아이디 값 저장 및 불러오기
				// 				// if (this.chkSaveId) 
				// 				// {
				// 				// 	window.bizMOB.Storage.set({ "_sKey": "saveId", "_vValue": this.userId });
				// 				// }
				// 				// else 
				// 				// {
				// 				// 	window.bizMOB.Storage.remove({ "_sKey": "saveId" });
				// 				// 	console.log("체크 박스 선택 해제");
				// 				// }

				// 				// 통신 성공 시 sessionStroage에 사용자 정보 저장
				// 				this.userInfo = { "userId": this.userId, "userPw": this.userPw, "userPerm": this.userPerm }; // userInfo 안에 userId 및 userPw 저장
				// 				sessionStorage.setItem("userList", JSON.stringify(this.userInfo));

				// 				//메인화면으로 router 변경
				// 				this.$router.replace('/main/dashboard');
				// 				console.log("로그인 되었습니다.");

				// 				// 로그인 시도 시 설정된 css 초기화
				// 				this.bt_loading = !this.bt_loading;
				// 				this.loginFailed = false;
				// 				this.loginErrorTxt = "";
				// 			}
				// 			else 
				// 			{
				// 				// 오류 코드 처리하는 부분
				// 				this.bt_loading = !this.bt_loading;

				// 				// 1. 등록된 회원정보가 없는 경우
				// 				if (resAGY0100.header.error_code == "ERR1001") 
				// 				{
				// 					this.loginFailed = true;
				// 					this.loginErrorTxt = "등록된 회원정보가 없습니다. 다시 확인해주세요.";
				// 				}

				// 				// 2. 아이디 또는 비밀번호가 틀린 경우
				// 				if (resAGY0100.header.error_code == "ERR1000") 
				// 				{
				// 					this.loginFailed = true;
				// 					this.loginErrorTxt = "아이디 또는 비밀번호가 일치하지 않습니다.";
				// 				}
				// 			}

				// 			// 서버 통신 오류 처리하는 부분
				// 			this.$http.post(address, resAGY0100)
				// 				.then(response => {
				// 					// 성공적인 응답 처리
				// 					console.log(response.data);
				// 				})
				// 				.catch(error => {
				// 					console.error('Internal Server Error 발생');
				// 				});
				// 		}
				// 		finally {
				// 			clearTimeout(timeoutId); // 통신이 될 경우 timeout 없애기
				// 		}
				// 	}
				// });
			}
		},
	}
});
</script>