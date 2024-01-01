import LoggerService from './shared/bizMOB/LoggerService';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $bizMOB: Record<any, any>; // this에 포함될 전역 변수 declare (main.ts에서 변수 입력 필요)
        $logger: LoggerService; // this에 포함될 전역 변수 declare (main.ts에서 변수 입력 필요)
    }
}

declare global {
  interface Window {
    bizMOB: Record<any, any>; // window에 포함될 전역 변수 declare
  }
}

export {}  // Important! See note.