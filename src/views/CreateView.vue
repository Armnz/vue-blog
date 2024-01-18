<template>
  <div class="create">
    <form @submit.prevent="handleSubmit">
      <label>Title:</label>
      <input v-model="title" type="text" required>
      <label>Content:</label>
      <textarea v-model="body" required></textarea>
      <button>{{ isEditing ? 'Edit' : 'Add Post' }}</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import getPost from '@/composables/getPost'

export default {
  setup() {
    const title = ref('')
    const body = ref('')
    const route = useRoute()
    const router = useRouter()
    const isEditing = ref(false)

    const { post, load } = getPost(route.params.id)

    watch(route, async () => {
      if (route.params.id) {
        await load()
        if (post.value) {
          title.value = post.value.title
          body.value = post.value.body
          isEditing.value = true
        }
      } else {
        isEditing.value = false
        title.value = ''
        body.value = ''
      }
    }, { immediate: true })

    const handleSubmit = async () => {
      const post = {
        title: title.value,
        body: body.value,
      }

      const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      }

      if (isEditing.value) {
        requestOptions.method = 'PUT'
        await fetch(`http://localhost:3000/posts/${route.params.id}`, requestOptions)
      } else {
        post.id = Math.floor(Math.random() * 10000)
        requestOptions.method = 'POST'
        await fetch('http://localhost:3000/posts', requestOptions)
      }

      router.push({ name: 'HomeView' })
    }

    return { title, body, handleSubmit, isEditing }
  }
}
</script>

<style scoped>
.post {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #7FB3D5;
  padding: 20px;
  border-radius: 8px;
}

.post p,
.pre {
  color: #34495E;
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

.edit-btn,
.delete-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.create {
  max-width: 480px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

input,
textarea {
  display: block;
  margin: 10px 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #7FB3D5;
  border-radius: 4px;
}

textarea {
  height: 160px;
}

label {
  display: block;
  margin-top: 20px;
  font-size: 18px;
  color: #34495E;
}

button {
  display: block;
  margin-top: 30px;
  background: #34495E;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background: #2C3E50;
}</style>

