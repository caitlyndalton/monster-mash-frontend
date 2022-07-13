<template>
  <div id="app">
    <!-- Responsive navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container px-lg-5">
        <a class="navbar-brand" href="/">Monster Mash</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/campaigns">Campaigns</a></li>
            <li class="nav-item"><a class="nav-link" href="/creatures">Monsters</a></li>
            <li class="nav-item"><a class="nav-link" href="/items">Items</a></li>
            <li class="nav-item"><a class="nav-link" href="/npcs">Npcs</a></li>
            <li class="nav-item"><a class="nav-link" href="/signup">Signup</a></li>
            <li class="nav-item"><a class="nav-link" href="/login">Login</a></li>
            <li class="nav-item"><a class="nav-link" href="/logout">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="container">
    <router-view />
  </div>
  <footer class="py-5 bg-dark">
    <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Your Website 2022</p></div>
  </footer>
</template>

<style>
#app {
  font-family: Futura, Arial, sans-serif;
  background-image: url("./assets/floor-tile.png");
}
</style>
