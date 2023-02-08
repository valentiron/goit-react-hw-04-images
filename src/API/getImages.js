export default function getImages(searchQuery, page) {
  const KEY = '31529189-e658a57f43e24d6772cd1bf10';

  return fetch(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(
      new Error(`Немає зображення за запитом ${searchQuery}`)
    );
  });
}
