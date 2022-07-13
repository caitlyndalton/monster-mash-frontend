<script>
import axios from "axios";
export default {
  data: function () {
    return {
      items: [],
      newItemParams: {},
      currentItem: {},
    };
  },
  created: function () {
    axios.get("https://www.dnd5eapi.co/api/magic-items").then((response) => {
      console.log(response.data);
      this.items = response.data.results;
    });
  },
  methods: {
    // indexItems: function () {
    //   axios.get("/items").then((response) => {
    //     console.log("items index", response);
    //     this.items = response.data;
    //   });
    // },
    createItem: function () {
      axios
        .post("/items", this.newItemParams)
        .then((response) => {
          console.log("item create", response);
          this.items.push(response.data);
          this.newItemParams = {};
        })
        .catch((error) => {
          console.log("items create error", error.response);
        });
    },
    getItemInfo: function (item) {
      console.log(item);
      axios.get("https://www.dnd5eapi.co" + item.url).then((response) => {
        console.log(response.data);
        this.currentItem = response.data;
        this.newItemParams = {
          name: response.data.name,
          api_type: response.data.type,
          api_index: response.data.index,
        };
        document.querySelector("#item-details").showModal();
      });
    },
  },
};
</script>

<template>
  <div class="items-index">
    <h1>New Item</h1>
    <div>
      Index:
      <input class="form-control" type="text" v-model="newItemParams.api_index" />
      Category:
      <input class="form-control" type="text" v-model="newItemParams.equipment_category" />
      Name:
      <input class="form-control" type="text" v-model="newItemParams.name" />
      Campaign:
      <input class="form-control" type="text" v-model="newItemParams.campaign_id" />
      <button class="btn btn-primary mt-2" v-on:click="createItem()">Add to Campaign</button>
    </div>
    <h1>All Items</h1>
    <div class="row">
      <div class="col-6 mb-4" v-for="item in items" v-bind:key="item.id">
        <h2>{{ item.name }}</h2>
        <button class="btn btn-primary" v-on:click="getItemInfo(item)">More Info</button>
      </div>
    </div>
    <dialog id="item-details">
      <form method="dialog">
        <h1>{{ currentItem.name }}</h1>
        <p>Category: {{ currentItem.equipment_category }}</p>
        <p>Description: {{ currentItem.desc }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
