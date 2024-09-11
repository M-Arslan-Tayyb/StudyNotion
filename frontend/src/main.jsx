import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducers/index.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from'react-hot-toast';
const store = configureStore({
  reducer: rootReducer, // Corrected this line
});

//tanStack:
const queryClient=new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
      <Toaster/>

    </Provider>
    
  </QueryClientProvider>
);
