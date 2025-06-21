import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.layer.css";
import { App } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider forceColorScheme="light">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MantineProvider>
);
