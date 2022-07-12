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
    <h1>All Items</h1>
    <div v-for="item in items" v-bind:key="item.id">
      <h2>{{ item.name }}</h2>
      <button v-on:click="getItemInfo(item)">More Info</button>
    </div>
    <dialog id="item-details">
      <form method="dialog">
        <h1>{{ currentItem.name }}</h1>
        <p>Description: {{ currentItem.desc }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
