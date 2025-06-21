import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.layer.css";
import { App } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MantineProvider forceColorScheme="light">
    <ModalsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalsProvider>
  </MantineProvider>
);
