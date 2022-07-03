<script>
import axios from "axios";

export default {
  data: function () {
    return {
      campaigns: [],
      newCampaignParams: {},
      currentCampaign: {},
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
    showCampaign: function (campaign) {
      this.currentCampaign = campaign;
      document.querySelector("#campaign-details").showModal();
    },
  },
};
</script>

<template>
  <div class="campaign-index">
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
      <button v-on:click="showCampaign(campaign)">More info</button>
    </div>
    <dialog id="campaign-details">
      <form method="dialog">
        <h1>Campaign Info</h1>
        <p>Name: {{ currentCampaign.name }}</p>
        <p>Description: {{ currentCampaign.description }}</p>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
