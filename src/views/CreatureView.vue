<script>
import axios from "axios";
export default {
  data: function () {
    return {
      creatures: [],
      newCreatureParams: {},
      currentCreature: {},
      selected: "",
    };
  },
  created: function () {
    // this.indexCreatures();
    axios.get("https://www.dnd5eapi.co/api/monsters").then((response) => {
      console.log(response.data);
      this.creatures = response.data.results;
    });
  },
  methods: {
    // indexCreatures: function () {
    //   axios.get("/creatures").then((response) => {
    //     console.log("creatures index", response);
    //     this.creatures = response.data;
    //   });
    // },
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
    getCreatureInfo: function (creature) {
      console.log(creature);
      axios.get("https://www.dnd5eapi.co" + creature.url).then((response) => {
        console.log(response.data);
        this.currentCreature = response.data;
        this.newCreatureParams = {
          name: response.data.name,
          api_type: response.data.type,
          api_index: response.data.index,
        };
        document.querySelector("#creature-details").showModal();
      });
    },
  },
};
</script>

<template>
  <div class="creatures-index">
    <h1>Add to Campaign</h1>
    <div>
      Index:
      <input class="form-control" type="text" v-model="newCreatureParams.api_index" />
      Type:
      <input class="form-control" type="text" v-model="newCreatureParams.api_type" />
      Name:
      <input class="form-control" type="text" v-model="newCreatureParams.name" />
      Campaign:
      <input class="form-control" type="text" v-model.number="newCreatureParams.campaign_id" />
      <button class="btn btn-primary mt-2" v-on:click="createCreature()">Add Monster to Campaign</button>
    </div>
    <h1>All Creatures & Monsters</h1>
    <div class="row">
      <div class="col-3 mb-4" v-for="creature in creatures" v-bind:key="creature.id">
        <h2>{{ creature.name }}</h2>
        <button class="btn btn-primary" v-on:click="getCreatureInfo(creature)">More Info</button>
      </div>
    </div>
    <dialog id="creature-details">
      <form method="dialog">
        <h1>Monster info</h1>
        <p>Info:</p>
        <p>Name: {{ currentCreature.name }}</p>
        <p>Type: {{ currentCreature.type }}</p>
        <p>Size: {{ currentCreature.size }}</p>
        <p>Armor Class: {{ currentCreature.armor_class }}</p>
        <p>Ability Scores: {{ currentCreature.strength }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>
