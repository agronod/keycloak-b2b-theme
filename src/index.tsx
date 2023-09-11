import "./index.css";
import { createRoot } from "react-dom/client";
import { StrictMode, lazy, Suspense } from "react";
import { kcContext } from "./KcApp/kcContext";
import { ThemeProvider, agronodTheme } from "@agronod/mui-components";

const App = lazy(() => import("./App"));
const KcApp = lazy(() => import("./KcApp"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <ThemeProvider options={agronodTheme}>
        {kcContext === undefined ? <App /> : <KcApp kcContext={kcContext} />}
      </ThemeProvider>
    </Suspense>
  </StrictMode>
);
