import React, { useState } from 'react';
import { BASE_URL } from '../utils/firebase.js';

function LikeButton({ postId, initialLikes }) {
  // Estado local para likes
  const [likes, setLikes] = useState(initialLikes);

  // Función para actualizar likes en Firebase
  async function updateLikes() {
    try {
      const index = Number(postId) - 1;
      if (isNaN(index) || index < 0) {
        console.error(`postId inválido: ${postId}`);
        return;
      }

      //Usamos la url importada de firebase.js
      const url = `${BASE_URL}/posts/${index}/likes.json`;

      //Obtener likes actuales
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Error al obtener los likes');
      const currentLikesRaw = await resp.json();
      const currentLikes = Number(currentLikesRaw ?? 0);

      //Incrementar en 1 y enviar la actualización
      const newLikes = currentLikes + 1;

      const updateResp = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLikes)
      });
      if (!updateResp.ok) throw new Error('Error al actualizar los likes');

      //Actualizamos el estado local para re-renderizar
      setLikes(newLikes);
    } catch (error) {
      console.error(`Error al actualizar los likes para el post ${postId}:`, error);
    }
  }

  return (
    <section className="flex justify-between mt-8">
      <button onClick={updateLikes} className="flex items-center text-gray-600 hover:text-gray-800 font-simplicity font-extrabold text-3xl">
        <img src="img/estrella.png" className="w-10 h-10 inline-block ml-2 mr-4"/>
        Likes: <span className="ml-2">{likes}</span>
      </button>
    </section>
  );
}

export default LikeButton;
