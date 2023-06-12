import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import { DataProvider } from "./context/dataContext"
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <QueryClientProvider client={client}>
      <App/>
    </QueryClientProvider>
  </DataProvider>
);
