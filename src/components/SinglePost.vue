<template>
  <div class="post">
    <div class="post-content">
      <img :src="`https://picsum.photos/seed/${post.id}/300/200`" alt="Post Image">
      <div class="text-content">
        <router-link :to="{ name: 'DetailsView', params: { id: post.id }}">
          <h3>{{ post.title }}</h3>
        </router-link>
        <p>{{ snippet }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['post'],
  setup(props) {
    const snippet = computed(() => {
      return props.post.body.substring(0, 100) + '...'
    })

    return { snippet }
  }
}
</script>

<style>
  .post {
    margin: 0 40px 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #34495E; /* Dark blue border */
  }
  .post-content {
    display: flex;
    align-items: center;
  }
  .post-content img {
    margin-right: 20px;
    width: 300px;
    height: 200px;
    object-fit: cover;
  }
  .text-content {
    flex: 1;
  }
  .post h3 {
    font-size: 26px;
    color: #34495E; /* Dark blue text */
    margin-bottom: 10px;
  }
</style>
