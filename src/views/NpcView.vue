<script>
import axios from "axios";
export default {
  data: function () {
    return {
      npcs: [],
    };
  },
  created: function () {
    this.indexNpcs();
  },
  methods: {
    indexNpcs: function () {
      axios.get("/npcs").then((response) => {
        console.log("npcs index", response);
        this.npcs = response.data;
      });
    },
  },
};
</script>

<template>
  <div class="npcs-index">
    <h1>All Npcs</h1>
    <div v-for="npc in npcs" v-bind:key="npc.id">
      <h2>{{ npc.name }}</h2>
      <p>Race: {{ npc.race }}</p>
      <p>Class: {{ npc.api_class }}</p>
      <p>Alignment: {{ npc.alignment }}</p>
      <p>Level: {{ npc.level }}</p>
    </div>
  </div>
</template>
