import { ref } from 'vue';
import { ITEMS_PER_LOAD } from './../constants';

export const useLoadMore = (array) => {
  const data = ref(array.slice(0, ITEMS_PER_LOAD));
  const currentIndex = ref(ITEMS_PER_LOAD);

  const loadMore = () => {
    const newData = array.slice(currentIndex.value, currentIndex.value + ITEMS_PER_LOAD);
    data.value = [...data.value, ...newData];
    currentIndex.value += ITEMS_PER_LOAD;
  };

  return {
    data,
    loadMore,
  };
}
