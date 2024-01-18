import { ref } from 'vue'

const deletePost = (id) => {
  const error = ref(null)
  const isDeleted = ref(false)

  const remove = async () => {
    try {
      let response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw Error('Failed to delete the post');
      }
      isDeleted.value = true;
    } catch(err) {
      error.value = err.message;
      isDeleted.value = false;
    }
  }

  return { error, isDeleted, remove }
}

export default deletePost
