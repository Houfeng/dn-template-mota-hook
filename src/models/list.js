import { newGuid } from 'ntils';

export const state = {
  items: [],
  showTypes: ['All', 'Active', 'Completed'],
  showType: 'All',
};

export function setShowType(type) {
  state.showType = type;
}

export function getActiveItems() {
  return state.items.filter(item => !item.completed);
}

export function getCompletedItems() {
  return state.items.filter(item => item.completed);
}

export function getFilterItems() {
  switch (state.showType) {
    case 'Active':
      return getActiveItems();
    case 'Completed':
      return getCompletedItems();
    default:
      return state.items;
  }
}

export function addItem(title) {
  const id = newGuid(), completed = false, editing = false;
  state.items.push({ id, title, completed, editing });
}

export function removeItem(item) {
  state.items = state.items.filter(i => i !== item);
}

export function enterEditing(item) {
  item.editing = true;
}

export function exitEditing(item) {
  item.editing = false;
}

export function clearCompleted() {
  state.items = state.items.filter(item => !item.completed);
}

export function toggleAll(status) {
  state.items.forEach(item => item.completed = status);
}
