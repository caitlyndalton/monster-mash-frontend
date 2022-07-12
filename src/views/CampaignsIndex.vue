<script>
import axios from "axios";

export default {
  data: function () {
    return {
      campaigns: [],
      newCampaignParams: {},
      editCampaignParams: {},
      currentCampaign: {},
    };
  },
  created: function () {
    this.indexCampaigns();
  },
  methods: {
    indexCampaigns: function () {
      axios.get("/campaigns.json").then((response) => {
        console.log("campaigns index", response);
        this.campaigns = response.data;
      });
    },
    createCampaign: function () {
      axios
        .post("/campaigns.json", this.newCampaignParams)
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
      this.editCampaignParams = campaign;
      document.querySelector("#campaign-details").showModal();
    },
    updateCampaign: function (campaign) {
      axios
        .patch("/campaigns/" + campaign.id, this.editCampaignParams)
        .then((response) => {
          console.log("campaigns update", response);
          this.currentCampaign = {};
        })
        .catch((error) => {
          console.log("campaign update error", error.response);
        });
    },
    destroyCampaign: function (campaign) {
      axios.delete("/campaigns/" + campaign.id).then((response) => {
        console.log("campaigns destroy", response);
        var index = this.campaigns.indexOf(campaign);
        this.campaigns.splice(index, 1);
      });
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
      <p>{{ campaign.description }}</p>
      <div v-for="creature in campaign.creatures" v-bind:key="creature.id">{{ creature }}</div>
      <button v-on:click="showCampaign(campaign)">More info</button>
    </div>
    <dialog id="campaign-details">
      <form method="dialog">
        <h1>Campaign info</h1>
        <p>
          Name:
          <input type="text" v-model="editCampaignParams.name" />
        </p>
        <p>
          Description:
          <input type="text" v-model="editCampaignParams.description" />
        </p>
        <button v-on:click="updateCampaign(currentCampaign)">Update</button>
        <button v-on:click="destroyCampaign(currentCampaign)">Destroy Campaign</button>
        <button>Close</button>
      </form>
    </dialog>
  </div>
</template>

<style></style>
