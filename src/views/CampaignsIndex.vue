<script>
import axios from "axios";

export default {
  data: function () {
    return {
      campaigns: [],
      newCampaignParams: {},
      editCampaignParams: {},
      currentCampaign: {},
      monsterInfo: {},
      itemInfo: {},
      npcInfo: {},
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
        .patch("/campaigns/" + campaign.id + ".json", this.editCampaignParams)
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
    getCreatureInfo: function (creature) {
      console.log(creature);
      axios.get("https://www.dnd5eapi.co/api/monsters/" + creature.api_index).then((response) => {
        console.log(response.data);
        this.monsterInfo = response.data;
        document.querySelector("#monster-info").showModal();
      });
    },
    getItemInfo: function (item) {
      console.log(item);
      axios.get("https://www.dnd5eapi.co/api/magic-items/" + item.api_index).then((response) => {
        console.log(response.data);
        this.itemInfo = response.data;
        document.querySelector("#item-info").showModal();
      });
    },
    getNpcInfo: function (npc) {
      console.log(npc);
      axios.get("/npcs/" + npc.id).then((response) => {
        console.log(response.data);
        this.npcInfo = response.data;
        document.querySelector("#npc-info").showModal();
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
      <input class="form-control" type="text" v-model="newCampaignParams.name" />
      Description:
      <input class="form-control" type="text" v-model="newCampaignParams.description" />
      <button class="btn btn-primary mt-2" v-on:click="createCampaign()">Create Campaign</button>
    </div>
  </div>
  <h1>All Campaigns</h1>
  <div class="row">
    <div v-for="campaign in campaigns" v-bind:key="campaign.id" class="col-4 campaign">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ campaign.name }}</h5>
          <p class="card-text">{{ campaign.description }}</p>
          <h3>Monsters:</h3>
          <div v-for="creature in campaign.creatures" v-bind:key="creature.id">
            <button class="btn btn-link" v-on:click="getCreatureInfo(creature)">{{ creature.name }}</button>
          </div>
          <h3>Items:</h3>
          <div v-for="item in campaign.items" v-bind:key="item.id">
            <button class="btn btn-link" v-on:click="getItemInfo(item)">{{ item.name }}</button>
          </div>
          <h3>Npcs:</h3>
          <div v-for="npc in campaign.npcs" v-bind:key="npc.id">
            <button class="btn btn-link" v-on:click="getNpcInfo(npc)">{{ npc.name }}</button>
          </div>
          <p></p>
          <button v-on:click="showCampaign(campaign)">More info</button>
          <p></p>
        </div>
      </div>
    </div>
    <dialog id="monster-info">
      <form method="dialog">
        <h1>Monster info</h1>
        <h4>Name:</h4>
        <p>{{ monsterInfo.name }}</p>
        <h4>Type:</h4>
        <p>{{ monsterInfo.type }}</p>
        <h4>Size:</h4>
        <p>{{ monsterInfo.size }}</p>
        <h4>Armor Class:</h4>
        <p>{{ monsterInfo.armor_class }}</p>
        <h4>Ability Scores:</h4>

        <p>
          STR: {{ monsterInfo.strength }} | DEX: {{ monsterInfo.dexterity }} | INT: {{ monsterInfo.intelligence }} |
          WIS: {{ monsterInfo.wisdom }} | CHA: {{ monsterInfo.charisma }}
        </p>
        <button>Close</button>
      </form>
    </dialog>
    <dialog id="item-info">
      <form method="dialog">
        <h1>{{ itemInfo.name }}</h1>
        <h4>Equipment Category:</h4>
        <p>{{ itemInfo.equipment_category }}</p>
        <h4>Description:</h4>
        <p>{{ itemInfo.desc }}</p>
        <button>Close</button>
      </form>
    </dialog>
    <dialog id="npc-info">
      <form method="dialog">
        <h1>{{ npcInfo.name }}</h1>
        <h5>Race:</h5>
        <p>{{ npcInfo.race }}</p>
        <h5>Class:</h5>
        <p>{{ npcInfo.api_class }}</p>
        <h5>Alignment:</h5>
        <p>{{ npcInfo.alignment }}</p>
        <button>Close</button>
      </form>
    </dialog>
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

<style>
.campaign .card {
  min-height: 700px;
}
</style>
