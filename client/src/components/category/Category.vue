<template>
  <div class="wrapper__main">
    <div class="wrapper__nav-edit-category">
      <nav>
        <button @click="showSpendingPage" class="wrapper__nav-edit-category-btn-active" v-if="showSpendingPageState">Spending</button>
        <button @click="showSpendingPage" class="wrapper__nav-edit-category-btn" v-if="!showSpendingPageState">Spending</button>

        <button @click="showEarningsPage" class="wrapper__nav-edit-category-btn-active" v-if="showEarningsPageState">Earnings</button>
        <button @click="showEarningsPage" class="wrapper__nav-edit-category-btn" v-if="!showEarningsPageState">Earnings</button>

        <button class="wrapper__nav-edit-category-btn-active" @click="showProfitPage" v-if="showProfitPageState">Profit</button>
        <button class="wrapper__nav-edit-category-btn" @click="showProfitPage" v-if="!showProfitPageState">Profit</button>
      </nav>
    </div>

    <div class="wrapper__spending-page" v-if="showSpendingPageState">
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
        <div v-for="item in spending">
          <div class="wrapper__main-spending-item">
            <h3>Sum: {{item.value}}</h3>
            <h3>Created at: {{item.date}}</h3>
            <button @click="deleteSpendingById(item.id)" class="wrapper__main-spending-item-del-btn" v-if="!item.description">Delete</button>

            <div class="wrapper__main-spending-item-buttons" v-if="item.description">
              <button class="wrapper__main-spending-item-show-desc-btn" @click="showSpendingItemInfo(item.id)">Show info</button>
              <button @click="deleteSpendingById(item.id)" class="wrapper__main-spending-item-del-btn">Delete</button>
            </div>
          </div>
          <div v-if="item.showInfo && item.description" class="wrapper__main-spending-item-description">
            <strong>{{item.description}}</strong>
          </div>
        </div>
      </div>
    </div>

    <div class="wrapper__earnings-page" v-if="showEarningsPageState">
      <draw-svg-diagram :countIntervalForSvgLine="countIntervalForSvgLine" :intervalForSvgLine="intervalForSvgLine" :spendingDataForSvg="earningsDataForSvg" :maxValueSpending="maxValueEarnings" class="mt-100"/>
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
        <h2>Total: {{totalEarnings}}</h2>
      </div>
      <div class="wrapper__main-modal mt-50" v-if="addEarningShowModalState">
        <button class="wrapper__modal-close-btn" @click="addEarningHideModal">Close</button>
        <form @submit="addEarning">
          <input type="date" v-model="addEarningState.date">
          <input type="text" placeholder="Description" v-model="addEarningState.description">
          <input type="number" v-model="addEarningState.value">
          <button type="submit">Save earning</button>
        </form>
      </div>

      <button @click="addEarningShowModal" v-if="!addEarningShowModalState" class="add-spend-btn">Add earning</button>

      <div class="wrapper__main-spending mt-100 mb-100">
        <div class="wrapper__main-spending-item" v-for="item in earnings">
          <h3>Sum: {{item.value}}</h3>
          <h3>Created at: {{item.date}}</h3>
          <button @click="deleteEarningsById(item.id)" class="wrapper__main-spending-item-del-btn">Delete</button>
        </div>
      </div>
    </div>

    <div class="wrapper__profit-page" v-if="showProfitPageState">
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
        <h2>Total: {{totalProfit}}</h2>
      </div>
    </div>

  </div>
</template>
<style scoped>
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
    height: 50px;
  }
  .wrapper__main-spending-item-show-desc-btn {
    background-color: rgba(60,106,215,0.98);
    color: #fff;
    padding: 0px 20px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    height: 50px;
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
  .wrapper__nav-edit-category {
    width: 80%;
    margin: 0 auto;
  }
  .wrapper__nav-edit-category nav {
    display: flex;
    justify-content: space-between;
    width: 23%;
    margin-top: 50px;
  }
  .wrapper__nav-edit-category-btn {
    background-color: rgba(226,226,226,0.98);
    border: none;
    padding: 10px 15px;
    cursor: pointer;
  }
  .wrapper__nav-edit-category-btn-active {
    border: none;
    padding: 10px 15px;
    background-color: #000;
    color: #fff;
  }
  .wrapper__main-spending-item-buttons {
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wrapper__main-spending-item-description {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f1f1f1;
    margin-top: 10px;
    padding: 10px 0;
  }
  .wrapper__main-spending-item-description strong {
    padding-left: 15px;
  }
</style>
<script>
  import moment from "moment";
  import DrawSvgDiagram from "../DrawSvgDiagram.vue";
  import { parseDataForSvg, calculateProfit } from "../../common/common.js";

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
        addEarningState: {
          description: "",
          value: 0,
          date: ""
        },
        addSpendShowModalState: false,
        addEarningShowModalState: false,
        totalSpending: 0,
        totalEarnings: 0,
        totalProfit: 0,
        spending: [],
        spendingDataForSvg: [],
        earningsDataForSvg: [],
        profitDataForSvg: [],
        earnings: [],
        svgDateFrom: moment().subtract(7, "days").format("YYYY-MM-DD"),
        svgDateTo: moment().format("YYYY-MM-DD"),
        intervalForSvgLine: 0,
        countIntervalForSvgLine: 0,
        maxValueSpending: null,
        maxValueEarnings: null,
        showSpendingPageState: true,
        showEarningsPageState: false,
        showProfitPageState: false
      }
    },
    watch: {
      async svgDateFrom (val) {
        this.svgDateFrom = val;

        await this.getDataForSvg();
      },
      async svgDateTo (val) {
        this.svgDateTo = val;

        await this.getDataForSvg();
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
      async addEarning(e) {
        e.preventDefault();

        await this.axios.post("/earnings", {
          categoryId: Number(this.$route.params.id),
          description: this.addEarningState.description,
          value: Number(this.addEarningState.value),
          date: this.addEarningState.date
        });

        window.location.reload();
      },
      addSpendShowModal() {
        this.addSpendShowModalState = true;
      },
      addSpendHideModal() {
        this.addSpendShowModalState = false;
      },
      addEarningShowModal() {
        this.addEarningShowModalState = true;
      },
      addEarningHideModal() {
        this.addEarningShowModalState = false;
      },
      deleteSpendingById(id) {
        this.spending = this.spending.filter(el => el.id !== id);

        this.axios.delete("/spending/" + id);
      },
      deleteEarningsById(id) {
        this.earnings = this.earnings.filter(el => el.id !== id);

        this.axios.delete("/earnings/" + id);
      },
      showSpendingItemInfo(id) {
        const indexEl = this.spending.findIndex(el => el.id === id);
        this.spending[indexEl].showInfo = !this.spending[indexEl].showInfo;
      },
      async showProfitPage() {
        this.showSpendingPageState = false;
        this.showEarningsPageState = false;
        this.showProfitPageState = true;

        await this.getDataForSvg();
      },
      async showEarningsPage() {
        this.showProfitPageState = false;
        this.showSpendingPageState = false;
        this.showEarningsPageState = true;

        await this.getDataForSvg();
      },
      async showSpendingPage() {
        this.showProfitPageState = false;
        this.showEarningsPageState = false;
        this.showSpendingPageState = true;

        await this.getDataForSvg();
      },
      async getDataForSvg() {
        this.spendingDataForSvg = [];
        this.earningsDataForSvg = [];
        this.profitDataForSvg = [];

        this.earnings = (await this.axios.get("/earnings/by-category-id/" + this.$route.params.id + "/?date_from=" + this.svgDateFrom + "&date_to=" + this.svgDateTo)).data;

        this.spending = (await this.axios.get("/spending/by-category-id/" + this.$route.params.id + "/?date_from=" + this.svgDateFrom + "&date_to=" + this.svgDateTo)).data;

        this.totalSpending = 0;
        this.totalEarnings = 0;

        if(this.showSpendingPageState) {
          const { countIntervalForSvgLine, intervalForSvgLine, dataForSvg, maxValue, totalSum } = parseDataForSvg(this.spending);

          this.countIntervalForSvgLine = countIntervalForSvgLine;
          this.intervalForSvgLine = intervalForSvgLine;
          this.spendingDataForSvg = dataForSvg;
          this.maxValueSpending = maxValue;
          this.totalSpending = totalSum;
        }
        if(this.showEarningsPageState) {
          const { countIntervalForSvgLine, intervalForSvgLine, dataForSvg, maxValue, totalSum } = parseDataForSvg(this.earnings);

          this.countIntervalForSvgLine = countIntervalForSvgLine;
          this.intervalForSvgLine = intervalForSvgLine;
          this.earningsDataForSvg = dataForSvg;
          this.maxValueEarnings = maxValue;
          this.totalEarnings = totalSum;
        }
        if(this.showProfitPageState) {
          // TODO
          /*
          this.earnings = (await this.axios.get("/earnings/by-category-id/" + this.$route.params.id + "/?date_from=" + this.svgDateFrom + "&date_to=" + this.svgDateTo)).data;
          this.spending = (await this.axios.get("/spending/by-category-id/" + this.$route.params.id + "/?date_from=" + this.svgDateFrom + "&date_to=" + this.svgDateTo)).data;

          const earningsDataForSvg = parseDataForSvg(this.earnings);
          const spendingDataForSvg = parseDataForSvg(this.spending);

          this.profitDataForSvg = calculateProfit([...earningsDataForSvg.dataForSvg], [...spendingDataForSvg.dataForSvg], earningsDataForSvg.maxValue);

          console.log(this.profitDataForSvg)

           */
        }
      },
    },
    async mounted() {
     await this.getDataForSvg();
    }
  }
</script>
