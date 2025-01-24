const BASE_URL = 'https://astrobloggastro-default-rtdb.europe-west1.firebasedatabase.app';

/**
 * Fetch posts from Firebase Realtime Database
 */
let posts = [];
export const fetchPosts = async () => {
  if (posts.length > 0) {
    return posts;
  }
  try {
    const resp = await fetch(`${BASE_URL}/posts.json`);
    if (!resp.ok) {
      throw new Error('Error al obtener los posts');
    }
    const data = await resp.json();
    console.log(data);
    // Transform Firebase data into an array of articles
    posts = Object.keys(data || {}).map((key) => ({
      id: key,
      ...data[key],
    }));
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Devuelve un arreglo vacío en caso de error
  }
};