import React from 'react';
import { render } from 'react-dom';
import { TodoApp } from './components/TodoApp';

import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

render(<TodoApp />, document.getElementById('root'));