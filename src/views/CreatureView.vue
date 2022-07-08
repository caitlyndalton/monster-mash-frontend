<script>
import axios from "axios";
export default {
  data: function () {
    return {
      creatures: [],
    };
  },
  created: function () {
    this.indexCreatures();
  },
  methods: {
    indexCreatures: function () {
      axios.get("/creatures").then((response) => {
        console.log("creatures index", response);
        this.creatures = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="creatures-index">
    <h1>All Creatures</h1>
    <div v-for="creature in creatures" v-bind:key="creature.id">
      <h2>{{ creature.name }}</h2>
      <p>Type: {{ creature.api_type }}</p>
    </div>
  </div>
</template>
