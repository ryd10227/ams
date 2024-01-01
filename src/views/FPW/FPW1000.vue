<template src="./FPW1000.html"></template>
<script lang="ts">
import { defineComponent, ref } from "vue";


export default defineComponent({
	name: "FPW1000",
	components: {},
	data() {
		return {
			mailSent: true,
			userEmail: '', // email 정보 저장
			countingDown: false,
			countdown: 10,
			mailSendError: null, // 에러 메시지
			pageUrl: '' // server에 전달할 loading page url
		};
	},
	computed: {
		buttonText() {
			return this.countingDown ? `${this.countdown}초` : '보내기';
		},
	},
	methods: {
		// 메일 중복 전송 방지를 위해 버튼을 10초간 비활성화
		startCountdown() {
			this.countingDown = true;
			let count = 10;

			const intervalId = setInterval(() => {
				this.countdown = count;
				count--;

				if (count < 0) {
					clearInterval(intervalId);
					this.countingDown = false;
					this.countdown = 10; // 초기값으로 리셋
				}
			}, 1000);
		},

		isValidEmail(email) {
			// 이메일 정규식 표현 -> 예외 처리(. 중복 허용 x, 도메인 중복 허용 x)
			var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+([a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

			if (email.search(/\s/) !== -1) {
				// 공백 포함할 경우 예외 처리
				return -1;
			}
			else {
				// test 결과 return -> true or false
				return pattern.test(email);
			}
		},

		// 메일 전송 버튼 클릭 이벤트
		findClick() {
			// 서버에 전문 요청
			console.log("userEmail = ", this.userEmail);

			if (!this.userEmail) {
				// 이메일 입력 확인
				this.mailSent = false;
				this.mailSendError = "이메일을 입력해주세요.";
			}
			else {
				if (!this.isValidEmail(this.userEmail)) {
					// 이메일 형식에 맞지 않을 경우
					this.mailSent = false;
					this.mailSendError = "이메일 형식에 알맞게 입력해주세요.";
				}
				else if (this.isValidEmail(this.userEmail) == -1) {
					// 입력된 이메일 주소에 공백이 포함되어있을 경우
					this.mailSent = false;
					this.mailSendError = "이메일 주소에 공백이 포함되어있습니다. 다시 입력해주세요.";
				}
				else {
					// 서버로부터 응답 받았는지 확인하는 변수
					let isResponseReceived = false;

					// timeout 5초로 설정
					const timeoutId = setTimeout(() => {
						if (!isResponseReceived) {
							this.mailSendError = "서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.";
						}
					}, 5000);

					var mailSendError = "";
					var address = window.location.href; // 현재 접속한 ip 및 port 포함된 url 가져오기
					var networkPath = address.replace('/fpw', '/'); // ip 및 port 번호만 남도록 처리하기

					this.pageUrl = networkPath + "loading";
					// this.$bizMOB.Network.requestTr({
					// 	"_sTrcode": "AGY0200",
					// 	"_oHeader": {
					// 		"is_cryption": false,
					// 		"error_code": "",
					// 		"error_text": "",
					// 		"info_text": "",
					// 		"login_session_id": "",
					// 		"message_version": "",
					// 		"result": false,
					// 		"trcode": "AGY0200"
					// 	},
					// 	"_oBody": {
					// 		"mailAddress": this.userEmail,
					// 		"domainUrl": this.pageUrl
					// 	},
					// 	"_fCallback": (resAGY0200) => {
					// 		try {
					// 			isResponseReceived = true; // 서버로부터 응답 받았으면 true

					// 			if (resAGY0200.header.result == true) {
					// 				// 통신 성공
					// 				console.log('메일발송성공')
					// 				this.mailSendError = "메일을 발송했습니다. 확인해주세요.";
					// 				this.mailSent = true;
					// 			}
					// 			else {
					// 				this.mailSent = false;
					// 				// 통신 오류 시 오류 코드 처리하는 부분
					// 				switch (resAGY0200.header.error_code) {
					// 					case "ERR2000":
					// 						alert("어댑터 처리 중 오류가 발생했습니다. 관리자에게 문의하세요.")
					// 						this.mailSendError = "메일 전송에 실패했습니다. 메일주소를 다시 확인해주세요.";
					// 						break;
					// 					case "ERR2001":
					// 						this.mailSendError = "토큰 설정에 실패했습니다. 관리자에게 문의하세요";
					// 						break;
					// 					case "ERR2002":
					// 						this.mailSendError = "유효하지 않은 메일 주소입니다. 확인 후 다시 입력해주세요.";
					// 						break;
					// 					default:
					// 						this.mailSendError = "서버와의 통신 중 오류가 발생했습니다. 다시 시도해주세요.";
					// 						break;
					// 				}
					// 			}
					// 			this.$http.post(address, resAGY0200)
					// 				.then(response => {
					// 					// 성공적인 응답 처리
					// 					console.log(response.data);
					// 				})
					// 				.catch(error => {
					// 					console.error('Internal Server Error 발생');
					// 				});

					// 			clearTimeout(timeoutId); // 통신이 될 경우 timeout 없애기
					// 		}
					// 		catch (error) {
					// 			// 서버 통신 오류 처리
					// 			this.mailSendError = "서버와의 통신에 실패하였습니다. 관리자에게 문의하세요.";
					// 		}
					// 	}
					// });
				}
			}
		},
	},
});
</script>