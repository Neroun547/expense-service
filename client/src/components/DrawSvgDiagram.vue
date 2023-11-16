<template>
  <div class="wrapper__svg">
    <div class="wrapper__modal" v-if="showModal">
      <div>Date from: {{modalState.dateStart}}</div>
      <div>Value: {{modalState.value}}</div>
    </div>
    <svg width="1250" height="630" class="svg">
      <line y1="0" y2="0" x1="50" x2="1250" stroke="black" stroke-width="1"></line>
      <line y1="120" y2="120" x1="50" x2="1250" stroke="black" stroke-width="1"></line>
      <line y1="240" y2="240" x1="50" x2="1250" stroke="black" stroke-width="1"></line>
      <line y1="360" y2="360" x1="50" x2="1250" stroke="black" stroke-width="1"></line>
      <line y1="480" y2="480" x1="50" x2="1250" stroke="black" stroke-width="1"></line>

      <line v-for="item in this.$props.countIntervalForSvgLine" :x1="(this.$props.intervalForSvgLine * item) + 50" :x2="(this.$props.intervalForSvgLine * item) + 50" y1="0" y2="600" stroke="black" stroke-width="1"></line>
      <rect
          v-for="item in this.$props.spendingDataForSvg"
          :x="(this.$props.intervalForSvgLine * (item.index)) + 50"
          :y="600 - item.valueInPercent * 600 / 100"
          :width="this.$props.intervalForSvgLine"
          :height="item.valueInPercent * 600 / 100"
          class="rect-color rect"
          :data-id="item.index"
          @mousemove="mousemoveToRect"
      ></rect>

      <line x1="50" x2="50" y1="0" y2="600" stroke="black" stroke-width="1"></line>
      <line x1="50" x2="1250" y1="600" y2="600" stroke="black" stroke-width="1"></line>

      <text x="0" y="600">0</text>
      <text x="0" y="480">{{(this.$props.maxValueSpending * 20) / 100}}</text>
      <text x="0" y="360">{{(this.$props.maxValueSpending * 40) / 100}}</text>
      <text x="0" y="240">{{(this.$props.maxValueSpending * 60) / 100}}</text>
      <text x="0" y="120">{{(this.$props.maxValueSpending * 80) / 100}}</text>
      <text x="0" y="12">{{this.$props.maxValueSpending}}</text>

      <text v-for="item in this.$props.spendingDataForSvg" :x="(item.index * (1200 / this.$props.countIntervalForSvgLine)) + 50" y="620" font-size="14px">{{item.dateStart}}</text>
    </svg>
  </div>
</template>
<style>

</style>
<script>
  export default {
    props: ["countIntervalForSvgLine", "intervalForSvgLine", "spendingDataForSvg", "maxValueSpending"],
    data() {
      return {
        countIntervalForSvgLine: 0,
        intervalForSvgLine: 0,
        spendingDataForSvg: [],
        showModal: false,
        modalState: {
          dateFrom: "",
          value: null
        },
        prevRect: null
      }
    },
    methods: {
      mousemoveToRect(e) {
        if(this.prevRect) {
          this.prevRect.classList.remove("active-rect");
        }
        const indexElement = Number(e.target.getAttribute("data-id"));
        const element = this.$props.spendingDataForSvg.find((el) => el.index === indexElement);

        this.modalState.value = element.value;
        this.modalState.dateStart = element.dateStart;
        this.showModal = true;

        const wrapperModal = document.querySelector(".wrapper__modal");

        wrapperModal.style.bottom = Math.floor(e.target.height.baseVal.value / 2) + "px";
        wrapperModal.style.left = (this.$props.intervalForSvgLine * (element.index)) + 60 + "px";

        e.target.classList.add("active-rect");

        this.prevRect = e.target;
      }
    }
  }
</script>

<style>
  .rect-color {
    fill: #3C6AD7E3;
  }
  .wrapper__svg {
    position: relative;
    left: 48%;
    width: 1250px;
    transform: translateX(-50%);
  }
  .wrapper__modal {
    background-color: #ececec;
    max-width: 200px;
    position: absolute;
    border-radius: 5px;
  }
  .wrapper__modal div {
    padding: 10px;
  }
  .active-rect {
    fill: rgba(88, 103, 143, 0.89);
  }
</style>


