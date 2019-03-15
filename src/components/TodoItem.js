import React from 'react';
import { useModel, binding } from 'mota';

export function TodoItem(props) {
  console.log('render item');

  const item = useModel(props.item);
  const { title, completed, editing } = item;
  const { enterEditing, exitEditing, removeItem } = useModel(props.list);

  function onEditKeyDown(event) {
    if (event.keyCode !== 13) return;
    exitEditing(item);
  }

  const classNames = [
    completed ? 'completed' : '', editing ? 'editing' : ''
  ].join(' ');

  return binding(<li className={classNames}>
    <div className="view">
      <input className="toggle" type="checkbox" data-bind="completed" />
      <label onDoubleClick={() => enterEditing(item)}>{title}</label>
      <button className="destroy" onClick={() => removeItem(item)} />
    </div>
    {editing ? <input className="edit" data-bind="title"
      autoFocus={editing}
      onBlur={() => exitEditing(item)}
      onKeyDown={onEditKeyDown} /> : null}
  </li>, item);

}