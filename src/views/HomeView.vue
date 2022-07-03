<script>
import axios from "axios";

export default {
  data: function () {
    return {
      campaigns: [],
      newCampaignParams: {},
    };
  },
  created: function () {
    this.indexCampaigns();
  },
  methods: {
    indexCampaigns: function () {
      axios.get("/campaigns").then((response) => {
        console.log("campaigns index", response);
        this.campaigns = response.data;
      });
    },
    createCampaign: function () {
      axios
        .post("/campaigns", this.newCampaignParams)
        .then((response) => {
          console.log("campaigns create", response);
          this.campaigns.push(response.data);
          this.newCampaignParams = {};
        })
        .catch((error) => {
          console.log("campaigns create error", error.response);
        });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>New Campaign</h1>
    <div>
      Name:
      <input type="text" v-model="newCampaignParams.name" />
      Description:
      <input type="text" v-model="newCampaignParams.description" />
      <button v-on:click="createCampaign()">Create Campaign</button>
    </div>
    <h1>All Campaigns</h1>
    <div v-for="campaign in campaigns" v-bind:key="campaign.id">
      <h2>{{ campaign.name }}</h2>
      <p>Description: {{ campaign.description }}</p>
    </div>
  </div>
</template>

<style></style>
