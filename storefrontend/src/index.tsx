import "./index.css";
import React from "react";
import App from "./app";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./utils/store/configureStore";
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from "react-redux";
const MOUNT_NODE = document.getElementById("root") as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <>
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <React.StrictMode>
      <Component />
    </React.StrictMode>
    </PersistGate>
    </Provider>
  </>
);

const render = (Component: typeof App) => {
  const root = createRoot(MOUNT_NODE);
  root.render(<ConnectedApp Component={Component} />);
};

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// serviceWorker.unregister();
reportWebVitals();
