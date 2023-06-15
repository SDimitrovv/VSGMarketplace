import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import Navigation from './Navigation';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <ToastContainer position='bottom-right' />
    </Provider>
  );
}

export default App;
