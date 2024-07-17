import TodoList from './components/TodoList';
import {store} from "./store";
import { Provider } from 'react-redux';
function App() {

  return (
    <Provider store={store}>
      <TodoList/>
      </Provider>
  )
}

export default App
