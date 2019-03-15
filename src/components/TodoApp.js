import React from 'react';
import { useModel } from 'mota';
import { TodoItem } from './TodoItem';
import * as todoList from '../models/list';

window.todoList = todoList;

export function Header() {
  console.log('render header');
  const { addItem } = useModel(todoList);
  function onTextBoxKeyDown(event) {
    const text = event.target.value;
    if (text.trim() && event.keyCode === 13) {
      event.preventDefault();
      addItem(text);
      event.target.value = '';
    }
  }
  return <header className="header">
    <h1>todos</h1><input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={onTextBoxKeyDown}
      autoFocus={true} />
  </header>;
}


export function List() {
  console.log('render list');
  const { toggleAll, state, getFilterItems } = useModel(todoList,
    p => state.showType != 'All' && p.endsWith('.completed'));
  function onToggleAll(event) {
    toggleAll(event.target.checked);
  }
  const filterItems = getFilterItems();
  if (!filterItems || filterItems.length < 1) return '';
  return <section className="main">
    <input id="toggle-all" className="toggle-all"
      type="checkbox" onChange={onToggleAll} />
    <label htmlFor="toggle-all"></label>
    <ul className="todo-list">
      {filterItems.map(item =>
        <TodoItem key={item.id} list={todoList} item={item} />)}
    </ul>
  </section>;
}

export function Filters() {
  console.log('render filters');
  const { state, setShowType } = useModel(todoList);
  const { showTypes, showType } = state;
  return <ul className="filters">
    {showTypes.map(type => (
      <li key={type}>
        <a className={showType == type ? 'selected' : null}
          href="javascript:;" onClick={() => setShowType(type)} >
          {type}
        </a>
      </li>
    ))}
  </ul>;
}

export function Footer() {
  console.log('render footer');
  const {
    state, getCompletedItems, getActiveItems, clearCompleted
  } = useModel(todoList, p => p.endsWith('.completed'));
  if (!state.items || state.items.length < 1) return '';
  const completedItems = getCompletedItems(),
    activeItems = getActiveItems();
  return <footer className="footer">
    <span className="todo-count">
      <strong> {activeItems.length} </strong>
      <span> items </span>
      <span> left </span>
    </span>
    <Filters />
    {completedItems.length > 0 ? <button className="clear-completed"
      onClick={clearCompleted}> Clear completed </button> : null}
  </footer>;
}

export function TodoApp() {
  console.log('render app');
  return <section className="todoapp">
    <Header />
    <List />
    <Footer />
  </section>;
}
