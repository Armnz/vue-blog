<template>
  <header>
    <h1>Something about something</h1>
    <nav>
      <router-link :to="{ name: 'HomeView' }">Home</router-link>
      <router-link :to="{ name: 'CreateView' }">Create Post</router-link>
    </nav>
  </header>
</template>

<script>
export default {

}
</script>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px;
    background-color: white;
  }
  header h1 {
    color: #34495E;
    font-size: 48px;
  }
  header a {
    color: #34495E;
    text-decoration: none;
    margin-left: 20px;
  }
  header a.router-link-active {
    color: #34495E;
    font-weight: bold;
  }
</style>
