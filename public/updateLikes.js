/* async function updateLikes(postId) {
    // URL base de Firebase para ese post específico
    const BASE_URL = 'https://astrobloggastro-default-rtdb.europe-west1.firebasedatabase.app';
    const url = `${BASE_URL}/posts/${postId}/likes.json`;
  
    try {
      // Obtener el número actual de likes
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Error al obtener los likes');
      const currentLikesRaw = await resp.json();
      const currentLikes = Number(currentLikesRaw) || 0; // Asegura un número válido
      
  
      // Incrementar en 1
      const newLikes = (currentLikes || 0) + 1;
  
      // Actualizar en Firebase
      const updateResp = await fetch(url, {
        method: 'PUT', // O PATCH si prefieres actualizar parcialmente
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newLikes)
      });
  
      if (!updateResp.ok) throw new Error('Error al actualizar los likes');
  
      return newLikes;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  // Escuchar clics en botones de likes
  document.addEventListener('click', async (e) => {
    const target = e.target.closest('button[id^="like-btn-"]');
    if (!target) return;
  
    const postId = target.dataset.postId;
    if (!postId) return;
  
    // Actualizar likes en Firebase
    const updatedLikes = await updateLikes(postId);
  
    if (updatedLikes !== null) {
      // Actualizar el contador en la interfaz
      const likeCountSpan = document.getElementById(`like-count-${postId}`);
      if (likeCountSpan) {
        likeCountSpan.textContent = updatedLikes;
      }
    }
  }); */
/* 
  async function updateLikes(postId){
    const BASE_URL = 'https://astrobloggastro-default-rtdb.europe-west1.firebasedatabase.app';
  
    // Convertir postId a índice (asumiendo que postId comienza en "1")
    const index = Number(postId) - 1;
    if (isNaN(index) || index < 0) {
      console.error(`postId inválido: ${postId}`);
      return null;
    }
  
    const url = `${BASE_URL}/posts/${index}/likes.json`;
  
    try {
      // Obtener el número actual de likes
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Error al obtener los likes');
      const currentLikesRaw = await resp.json();
      console.log(`Likes actuales para el post ${postId}:`, currentLikesRaw);
  
      // Manejar casos donde currentLikesRaw es null o undefined
      const currentLikes = Number(currentLikesRaw ?? 0);
      const newLikes = currentLikes + 1;
      console.log(`Actualizando likes a: ${newLikes}`);
  
      // Actualizar en Firebase usando PUT
      const updateResp = await fetch(url, {
        method: 'PUT', // Usar PUT para establecer el valor directamente
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLikes) // Enviar el número directamente
      });
  
      if (!updateResp.ok) throw new Error('Error al actualizar los likes');
  
      console.log(`Likes actualizados para el post ${postId}:`, newLikes);
      return newLikes;
    } catch (error) {
      console.error(`Error al actualizar los likes para el post ${postId}:`, error);
      return null;
    }
  } */

    
async function updateLikes(postId) {
  const BASE_URL = 'https://astrobloggastro-default-rtdb.europe-west1.firebasedatabase.app';

  if (!postId) {
    console.error(`postId inválido: ${postId}`);
    return null;
  }

  const url = `${BASE_URL}/posts/${postId}/likes.json`;

  try {
    // Obtener el número actual de likes
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Error al obtener los likes');
    const currentLikesRaw = await resp.json();
    console.log(`Likes actuales para el post ${postId}:`, currentLikesRaw);

    // Manejar casos donde currentLikesRaw es null o undefined
    const currentLikes = Number(currentLikesRaw ?? 0);
    const newLikes = currentLikes + 1;
    console.log(`Actualizando likes a: ${newLikes}`);

    // Actualizar en Firebase usando PATCH para mayor flexibilidad
    const updateResp = await fetch(`${BASE_URL}/posts/${postId}.json`, {
      method: 'PATCH', // Usar PATCH para actualizar solo el campo 'likes'
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: newLikes }) // Enviar el objeto con el campo a actualizar
    });

    if (!updateResp.ok) throw new Error('Error al actualizar los likes');

    console.log(`Likes actualizados para el post ${postId}:`, newLikes);
    return newLikes;
  } catch (error) {
    console.error(`Error al actualizar los likes para el post ${postId}:`, error);
    return null;
  }
}

export { updateLikes };