<template>
  <div v-if="error">{{ error }}</div>
  <div v-if="post" class="post">
    <h3>{{ post.title }}</h3>
    <img :src="`https://picsum.photos/seed/${post.id}/900/600`" alt="Post Image" class="post-image">
    <p class="pre">{{ post.body }}</p>
    <div class="post-actions">
      <button @click="handleEdit" class="edit-btn">Edit</button>
      <button @click="handleDelete" class="delete-btn">Delete</button>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import getPost from '@/composables/getPost'
import deletePost from '@/composables/deletePost'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const { error, post, load } = getPost(route.params.id)
    const { remove, isDeleted } = deletePost(route.params.id)

    const handleDelete = async () => {
      await remove();
      if (isDeleted.value) {
        router.push({ name: 'HomeView' });
      }
    }

    const handleEdit = () => {
      router.push({ name: 'EditPost', params: { id: post.value.id } });
    }


    load()

    return { error, post, handleDelete, handleEdit }
  },
}
</script>

<style scoped>
.post {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #7FB3D5; /* Light blue background */
  padding: 20px;
  border-radius: 8px;
}

.post p, .pre {
  color: #34495E; /* Dark blue text */
  line-height: 1.5em;
}

.post-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-top: 20px;
}

.post-actions {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
}

.edit-btn, .delete-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn {
  background-color: #4CAF50; /* Keep Edit button green */
  color: white;
}

.delete-btn {
  background-color: #f44336; /* Keep Delete button red */
  color: white;
}
</style>
