<script>
import axios from "axios";
export default {
  data: function () {
    return {
      creatures: [],
      newCreatureParams: {},
    };
  },
  created: function () {
    this.indexCreatures();
    // axios.get("https://www.dnd5eapi.co/api/monsters/goblin").then((response) => {
    //   console.log(response.data);
    //   this.creatures = response.data;
    // });
  },
  methods: {
    indexCreatures: function () {
      axios.get("/creatures").then((response) => {
        console.log("creatures index", response);
        this.creatures = response.data;
      });
    },
    createCreature: function () {
      axios
        .post("/creatures", this.newCreatureParams)
        .then((response) => {
          console.log("creature create", response);
          this.creatures.push(response.data);
          this.newCreatureParams = {};
        })
        .catch((error) => {
          console.log("creatures create error", error.response);
        });
    },
  },
};
</script>

<template>
  <div class="creatures-index">
    <h1>New Creature</h1>
    <div>
      Api:
      <input type="text" v-model="newCreatureParams.api_index" />
      Type:
      <input type="text" v-model="newCreatureParams.api_type" />
      Name:
      <input type="text" v-model="newCreatureParams.name" />
      Campaign:
      <input type="text" v-model="newCreatureParams.campaign_id" />
      <button v-on:click="createCreature()">Create Creature</button>
    </div>
    <h1>All Creatures</h1>
    <div v-for="creature in creatures" v-bind:key="creature.id">
      <h2>{{ creature.name }}</h2>
      <p>{{ creature.api_type }}</p>
    </div>
  </div>
</template>
