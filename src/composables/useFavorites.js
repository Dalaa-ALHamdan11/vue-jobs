import { ref } from 'vue'

const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

export function useFavorites() {

  const toggleFavorite = (id) => {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter(f => f !== id)
    } else {
      favorites.value.push(id)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const isFavorite = (id) => {
    return favorites.value.includes(id)
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite
  }
}