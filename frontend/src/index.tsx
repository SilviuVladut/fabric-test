import React from 'react';
import ReactDOM from 'react-dom/client';
import {MantineProvider} from "@mantine/core";
import {MainPage} from "./components/MainPage/MainPage";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <MantineProvider>
          <MainPage />
      </MantineProvider>
  </React.StrictMode>
);
