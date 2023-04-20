<script>
export default {
  data: function () {
    return {};
  },
  created: function () {},
  methods: {},
};
</script>

<template>
  <div class="home">
    <!-- Header-->
    <header class="py-5">
      <div class="container px-lg-5">
        <div class="p-4 p-lg-5 bg-light rounded-3 text-center">
          <div class="m-4 m-lg-5">
            <h1 class="display-5 fw-bold">Welcome to Monster Mash</h1>
            <p class="fs-5">
              Howdy UMA! This is my pride and joy (so far), Monster Mash. Made entirely by myself, front and back end,
              API integration, JWT/Secure signup/login, postgresql database. I would love to tell you more about this
              myself, as there's some fun features that might not be obvious!
            </p>
            <p class="fs-5">
              This is a Dungeons and Dragons web app that allows a user to create/update/view DnD campaigns using real
              time data pulled from dnd5eapi. As of now, items, creatures, and npc info is available and able to be
              pulled from the API and then added to any campaigns.
            </p>
            <p class="fs-5">
              I have a login with mock data as an example. All is working on my end as of this afternoon (4/20)! The
              email address for this is [disconerds@gmail.com] and the very secure password is [password]. I hope you
              enjoy my little project. Let me know if you have any questions. I look forward to being able to talk and
              share more with you in an interview setting. Thank you so much for your time!
            </p>
            <a class="btn btn-primary btn-lg" href="/login">Get Started</a>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<style></style>
