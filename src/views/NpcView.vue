<script>
import axios from "axios";
export default {
  data: function () {
    return {
      npcs: [],
      newNpcParams: {},
      currentNpc: {},
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
    createNpc: function () {
      axios
        .post("/npcs", this.newNpcParams)
        .then((response) => {
          console.log("npc create", response);
          this.npc.push(response.data);
          this.newNpcParams = {};
        })
        .catch((error) => {
          console.log("npc create error", error.response);
        });
    },
  },
};
</script>

<template>
  <div class="npcs-index">
    <h1>New Npc</h1>
    <div>
      Name:
      <input class="form-control" type="text" v-model="newNpcParams.name" />
      Race:
      <input class="form-control" type="text" v-model="newNpcParams.race" />
      Class:
      <input class="form-control" type="text" v-model="newNpcParams.api_class" />
      Alignment:
      <input class="form-control" type="text" v-model="newNpcParams.alignment" />
      Level:
      <input class="form-control" type="text" v-model="newNpcParams.level" />
      Campaign:
      <input class="form-control" type="text" v-model="newNpcParams.campaign_id" />
      <button class="btn btn-primary mt-3" v-on:click="createNpc()">Create Npc</button>
    </div>
    <h1>All Npcs</h1>
    <div class="row">
      <div class="col-6 mb-4" v-for="npc in npcs" v-bind:key="npc.id">
        <h2>{{ npc.name }}</h2>
        <p>Race: {{ npc.race }}</p>
        <p>Class: {{ npc.api_class }}</p>
        <p>Alignment: {{ npc.alignment }}</p>
        <p>Level: {{ npc.level }}</p>
      </div>
    </div>
  </div>
</template>
