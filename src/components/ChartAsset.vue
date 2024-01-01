 <!-- 대시보드 페이지 중 top5 hw,sw 자산 차트 컴포넌트 -->
<template src="./ChartAsset.html"></template>
<script lang="ts">
import { defineComponent } from "vue";
import { Chart, LegendItem, registerables } from 'chart.js';
import store from "@/store";
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default defineComponent({
    components: {
        Swiper, SwiperSlide,
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
    computed: {
        // 총 자산 개수 계산
        totalAssets() {
            return store.state.dataList.length;
        },

        // 하드웨어 자산 개수 계산
        hwAssetsCount() {
            return store.state.dataList.filter(item => item.assetType === 'isHW').length;
        },

        // 소프트웨어 자산 개수 계산
        swAssetsCount() {
            return store.state.dataList.filter(item => item.assetType === 'isSW').length;
        },
    },
    methods: {
        createChart(chartId, assetType) {
            // item.assetType이 'isHW'인지 'isSW'인지 필터
            const dataByAssetType = store.state.dataList.filter(item => item.assetType === assetType);

            // inputDeviceType을 기준으로 각 유형이 몇 번 나타났는지를 저장하는 객체 생성 
            const arrayFiltered: Record<string, number> = dataByAssetType
                .filter(item => item.inputDeviceType)
                .reduce((acc, item) => {
                    acc[item.inputDeviceType] = (acc[item.inputDeviceType] || 0) + 1;
                    return acc;
                }, {});

            // 빈도수가 높은 순서대로 배열에 저장, 상위 5개
            const sortedArrayFiltered: [string, number][] = Object.entries(arrayFiltered)
                .sort((a, b) => b[1] - a[1]).slice(0, 5);

            // sortedArrayFiltered 배열의 각 항목에서 첫 번째 요소(자산종류)를 labels 배열에, 두 번째 요소(개수)를 data 배열에 매핑하여 저장
            this.labels = sortedArrayFiltered.map(entry => entry[0]);
            this.data = sortedArrayFiltered.map(entry => entry[1]);

            const ctx = document.getElementById(chartId) as HTMLCanvasElement;
            new Chart(ctx, {
                type: 'pie', // 그래프 종류 선택
                data: {
                    labels: this.labels,
                    datasets: [{
                        label: ' ', // 따로 함수로 커스텀해서 사용할 것
                        data: this.data, // 각 자산의 개수(입고)
                        borderWidth: 5,
                        backgroundColor: ["#FF5675", "#FF7493", "#FF9CBB", "#FFC1CC", "#FBE6E6"], // 차트 배경 색상
                        hoverBackgroundColor: ["#FF5675", "#FF7493", "#FF9CBB", "#FFC1CC", "#FBE6E6"], // 마우스 호버 시 배경 색상
                        hoverBorderColor: ["#FF5675", "#FF7493", "#FF9CBB", "#FFC1CC", "#FBE6E6"], // 마우스 호버 시 테두리 색상
                    }]
                },
                options: {
                    responsive: false, // 화면에 크기 고정
                    plugins: {
                        tooltip: {
                            // 호버 시 나타나는 tooltip 속성
                            backgroundColor: "#fff",
                            titleColor: "#000",
                            bodyColor: "#000",
                            titleAlign: "center",
                            titleFont: {
                                // tooltip 제목 글씨 사이즈
                                size: 18,
                            },
                            bodyFont: {
                                // tooltip 내용 글씨 사이즈
                                size: 14,
                            },
                            callbacks: {
                                // 호버 시 나타나는 tooltip 내용을 '10개'와 같이 변경하는 함수
                                label: function (context) {
                                    let label = context.dataset.label || '';
                                    label += (arrayFiltered[context.label] + "개");
                                    return label;
                                }
                            }
                        },
                        legend: {
                            // 범례 속성
                            display: true,
                            position: 'right', // 오른쪽 배치
                            labels: {
                                // 범례의 항목명 속성
                                boxWidth: 12,
                                padding: 15,
                                generateLabels: function (chart: Chart): LegendItem[] {
                                    // 범례에 표시되는 각 항목에 대한 색상 커스텀
                                    var data = chart.data;
                                    if (data.labels && data.labels.length && data.datasets?.length) 
                                    {
                                        return (data.labels as string[]).map((label: string, i: number) => {
                                            const labelColor = (data.datasets[0].backgroundColor as string[])[i];
                                            return {
                                                text: label,
                                                fillStyle: labelColor,
                                            };
                                        });
                                    }
                                    return [];
                                }
                            }
                        }
                    }
                }
            });
        },
        createHwChart() {
            this.createChart('hwChart', 'isHW');
        },
        createSwChart() {
            this.createChart('swChart', 'isSW');
        },
    },

    // 컴포넌트가 마운트 된 후 차트 생성
    mounted() {
        this.createHwChart(); // hw 차트 그리기
        this.createSwChart(); // sw 차트 그리기
    },
});

Chart.register(...registerables); // 모든 차트를 간편하게 불러오기
</script>