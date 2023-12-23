<template>
  <div class="wrapper__main">
    <form class="wrapper__form mt-200 m-auto" @submit="changeCategoryParams">
      <input type="text" placeholder="Category name" v-model="categoryName">
      <button>Change category name</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryName: ""
    }
  },
  methods: {
    async changeCategoryParams(e) {
      e.preventDefault();

      await this.axios.patch("/categories/" + this.$route.params.id, { name: this.categoryName });
    }
  },
  async mounted() {
    this.categoryName = (await this.axios.get("/categories/" + this.$route.params.id)).data.name;
  }
}
</script>

