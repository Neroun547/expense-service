<template>
  <div class="wrapper__main">
    <draw-svg-diagram :countIntervalForSvgLine="countIntervalForSvgLine" :intervalForSvgLine="intervalForSvgLine" :spendingDataForSvg="spendingDataForSvg" :maxValueSpending="maxValueSpending" class="mt-100"/>
    <div class="wrapper__date">
      <div>
        <label for="date-from">Date from: </label>
        <input type="date" id="date-from" v-model="svgDateFrom">
      </div>
      <div>
        <label for="date-to">Date to: </label>
        <input type="date" id="date-to" v-model="svgDateTo">
      </div>
    </div>
    <div class="wrapper__total-sum">
      <h2>Total: {{totalSpending}}</h2>
    </div>
    <div class="wrapper__main-modal mt-50" v-if="addSpendShowModalState">
      <button class="wrapper__modal-close-btn" @click="addSpendHideModal">Close</button>
      <form @submit="addSpend">
        <input type="date" v-model="addSpendState.date">
        <input type="text" placeholder="Description" v-model="addSpendState.description">
        <input type="number" v-model="addSpendState.value">
        <button type="submit">Save spend</button>
      </form>
    </div>
    <button @click="addSpendShowModal" v-if="!addSpendShowModalState" class="add-spend-btn">Add spend</button>

    <div class="wrapper__main-spending mt-100 mb-100">
      <div class="wrapper__main-spending-item" v-for="item in spending">
        <h3>Sum: {{item.value}}</h3>
        <h3>Created at: {{item.date}}</h3>
        <button @click="deleteSpendingById(item.id)" class="wrapper__main-spending-item-del-btn">Delete</button>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .svg {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
  .wrapper__main {
    display: block;
    margin: 0 auto;
    width: 80%;
  }

  .wrapper__main-modal form {
    display: flex;
    flex-direction: column;
  }
  .wrapper__main-modal form input {
    margin-top: 10px;
    background-color: transparent;
  }

  .wrapper__main-modal form button {
    margin-top: 30px;
    cursor: pointer;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .add-spend-btn {
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    background-color: rgba(60,106,215,0.98);
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
  }
  .wrapper__modal-close-btn {
    display: block;
    margin-left: auto;
    cursor: pointer;
  }
  .wrapper__main-spending-item {
    display: flex;
    justify-content: space-between;
    background-color: rgba(240,240,240,0.98);
    margin: 0 auto;
    margin-top: 10px;
    padding: 10px;
    max-width: 1200px;
  }
  .wrapper__main-spending-item-del-btn {
    background-color: darkred;
    color: #fff;
    padding: 0px 20px;
    font-size: 18px;
    border: none;
    cursor: pointer;
  }
  .wrapper__date {
    display: flex;
    justify-content: space-between;
    width: 1210px;
    margin: 0 auto;
    margin-top: 55px;
  }
  .wrapper__total-sum h2 {
    text-align: center;
  }
</style>
<script>
  import moment from "moment";
  import DrawSvgDiagram from "./DrawSvgDiagram.vue";

  export default {
    components: {
      "draw-svg-diagram": DrawSvgDiagram
    },
    data() {
      return {
        addSpendState: {
          description: "",
          value: 0,
          date: ""
        },
        addSpendShowModalState: false,
        totalSpending: 0,
        spending: [],
        spendingDataForSvg: [],
        svgDateFrom: moment().subtract(7, "days").format("YYYY-MM-DD"),
        svgDateTo: moment().format("YYYY-MM-DD"),
        intervalForSvgLine: 0,
        countIntervalForSvgLine: 0,
        maxValueSpending: null,
      }
    },
    watch: {
      async svgDateFrom (val) {
        this.svgDateFrom = val;

        await this.getDataForSvgAndDraw();
      },
      async svgDateTo (val) {
        this.svgDateTo = val;

        await this.getDataForSvgAndDraw();
      }
    },
    methods: {
      async addSpend(e) {
        e.preventDefault();

        await this.axios.post("/spending", {
          categoryId: Number(this.$route.params.id),
          description: this.addSpendState.description,
          value: Number(this.addSpendState.value),
          date: this.addSpendState.date
        });

        window.location.reload();
      },
      addSpendShowModal() {
        this.addSpendShowModalState = true;
      },
      addSpendHideModal() {
        this.addSpendShowModalState = false;
      },
      deleteSpendingById(id) {
        this.spending = this.spending.filter(el => el.id !== id);

        this.axios.delete("/spending/" + id);
      },
      async getDataForSvgAndDraw() {
        this.spendingDataForSvg = [];
        this.spending = (await this.axios.get("/spending/by-category-id/" + this.$route.params.id + "/?date_from=" + this.svgDateFrom + "&date_to=" + this.svgDateTo)).data;

        let sortedSpendingArr = this.spending.sort((a, b) => moment(a.date).isAfter(moment(b.date)));
        this.totalSpending = 0;

        for(let i = 0; i < sortedSpendingArr.length; i++) {
          this.totalSpending += sortedSpendingArr[i].value;
        }

        let tmp = {};

        for (let i = 0; i < sortedSpendingArr.length; i++) {
          if (tmp[sortedSpendingArr[i].date]) {
            tmp[sortedSpendingArr[i].date] += sortedSpendingArr[i].value;
          } else {
            tmp[sortedSpendingArr[i].date] = sortedSpendingArr[i].value;
          }
        }
        sortedSpendingArr = [];

        for (let key in tmp) {
          sortedSpendingArr.push({ date: key, value: tmp[key] });
        }

        if(sortedSpendingArr.length >= 5) {
          this.countIntervalForSvgLine = 5;
          this.intervalForSvgLine = 1200 / 5;
          let countInterval = Math.floor(sortedSpendingArr.length / 5);

          if(countInterval === 0) {
            countInterval = 1;
          }
          let tmp = { dateStart: sortedSpendingArr[0].date, value: 0 };

          for(let i = 0; i < sortedSpendingArr.length; i++) {
            if(countInterval > 0) {
              tmp.value += sortedSpendingArr[i].value;
            }

            countInterval -= 1;

            if(countInterval === 0 && this.spendingDataForSvg.length < 5) {
              countInterval = Math.floor(sortedSpendingArr.length / 5);

              if(countInterval === 0) {
                countInterval = 1;
              }
              this.spendingDataForSvg.push({ ...tmp });

              if(i + 1 < sortedSpendingArr.length) {
                tmp = { dateStart: sortedSpendingArr[i + 1].date, value: 0 };
              }
            }
            if(this.spendingDataForSvg.length === 5 && i + 1 < sortedSpendingArr.length) {
              this.spendingDataForSvg[this.spendingDataForSvg.length - 1].value += sortedSpendingArr[i + 1].value;
            }
          }
        } else if(sortedSpendingArr.length < 5) {
          this.countIntervalForSvgLine = sortedSpendingArr.length;
          this.intervalForSvgLine = 1200 / sortedSpendingArr.length;

          let tmp = {  };

          for(let i = 0; i < sortedSpendingArr.length; i++) {
            if(tmp[sortedSpendingArr[i].date]) {
              tmp[sortedSpendingArr[i].date] += sortedSpendingArr[i].value;
            } else {
              tmp[sortedSpendingArr[i].date] = sortedSpendingArr[i].value;
            }
          }
          for(let key in tmp) {
            this.spendingDataForSvg.push({ dateStart: key, value: tmp[key] });
          }
        }
        let greaterValueInSpendingDataForSvg = 0;

        for(let i = 0; i < this.spendingDataForSvg.length; i++) {
          if(this.spendingDataForSvg[i].value > greaterValueInSpendingDataForSvg) {
            greaterValueInSpendingDataForSvg = this.spendingDataForSvg[i].value;
          }
        }
        this.maxValueSpending = greaterValueInSpendingDataForSvg;

        this.spendingDataForSvg = this.spendingDataForSvg.map((el, index) => ({ ...el, valueInPercent: el.value / greaterValueInSpendingDataForSvg * 100, index: index }));
      }
    },
    async mounted() {
     await this.getDataForSvgAndDraw();
    }
  }
</script>
