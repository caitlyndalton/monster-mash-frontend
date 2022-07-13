<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newCampaignParams: {},
      errors: [],
    };
  },
  created: function () {},
  methods: {
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
  },
};
</script>

<template>
  <div class="campaign-create">
    <h1>New Campaign</h1>
    <div>
      Name:
      <input type="text" v-model="newCampaignParams.name" />
      Description:
      <input type="text" v-model="newCampaignParams.description" />
      <button v-on:click="createCampaign()">Create Campaign</button>
    </div>
  </div>
</template>
