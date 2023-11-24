<template>
  <div v-if="auth">
    <div class="wrapper__modal" v-if="showCreateCategoryModal">
      <button class="wrapper__modal-close-btn" @click="createCategoryCloseModal">Close</button>
      <form @submit="createCategory">
        <input type="text" placeholder="Category name" v-model="createCategoryState.name">
        <button>Create category</button>
      </form>
    </div>
    <div class="wrapper__main">
      <button @click="createCategoryOpenModal" class="add-category-btn" v-if="!showCreateCategoryModal">Add category</button>
      <h2 class="categories-logo">Categories:</h2>

      <div class="wrapper__main-categories">
        <div class="wrapper__main-categories-item" v-for="item in categories">
          <div>
            <h3>Name: {{item.name}}</h3>
          </div>
          <div>
            <h3 v-if="item.value">Total spending: {{item.value}}</h3>
            <h3 v-if="!item.value">Total spending: 0</h3>
          </div>
          <div>
            <h3>Created at: {{item.created_at}}</h3>
          </div>
          <div class="wrapper__main-categories-item-wrapper-btn">
            <button class="wrapper__main-categories-item-delete-btn" @click="deleteCategoryById(item.id)">Delete</button>
            <RouterLink :to="'/category/edit-category/' + item.id">
              <button class="wrapper__main-categories-item-edit-btn">Edit</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="!auth">
    <div class="wrapper__main mt-100">
      <h2>This is expense-tracker service</h2>
      <RouterLink to="/auth">Auth and start using this service</RouterLink>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        categories: [],
        showCreateCategoryModal: false,
        createCategoryState: {
          name: ""
        },
        auth: false
      }
    },
    methods: {
      deleteCategoryById(id) {
        this.axios.delete("/categories/" + id);

        this.categories = this.categories.filter(el => el.id !== id);
      },
      createCategoryOpenModal() {
        this.showCreateCategoryModal = true;
      },
      createCategoryCloseModal() {
        this.showCreateCategoryModal = false;
      },
      async createCategory(e) {
        e.preventDefault();

        const createdDate = new Date().toISOString().substr(0, 19).replace('T', ' ');

        await this.axios.post("/categories", {
          name: this.createCategoryState.name,
          createdAt: createdDate
        });

        window.location.reload();
      }
    },
    async mounted () {
      this.categories = (await this.axios.get("/categories")).data;

      if(localStorage.getItem("token")) {

        try {
          await this.axios.get("auth");

          this.auth = true;
        } catch(e) {
          console.log(e)
          this.auth = false;
        }
      } else {
        this.auth = false;
      }
    }
  }
</script>
<style scoped>
  .wrapper__main {
    display: block;
    margin: 0 auto;
    width: 80%;
  }
  .wrapper__main h2 {
    text-align: center;
  }
  .wrapper__main a {
    display: block;
    text-align: center;
  }
  .wrapper__modal {
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    max-width: 1000px;
    width: 100%;
  }
  .wrapper__modal input {
    width: 99%;
    margin-top: 10px;
  }
  .wrapper__modal form button {
    display: block;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .categories-logo {
    margin-top: 50px;
  }
  .add-category-btn {
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
  .wrapper__main-categories-item {
    background-color: rgba(240,240,240,0.98);
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  .wrapper__main-categories-item-edit-btn {
    padding: 5px 20px;
    cursor: pointer;
  }
  .wrapper__main-categories-item-delete-btn {
    background-color: darkred;
    color: #fff;
    cursor: pointer;
    padding: 5px 20px;
    border-radius: 5px;
  }
  .wrapper__main-categories-item-wrapper-btn {
    width: 13%;
    display: flex;
    justify-content: space-between;
  }
</style>
