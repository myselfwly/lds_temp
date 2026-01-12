import "./index.css";

import { CefWriteLog } from "@lds/cef-bridge";
import { ThemeProvider } from "components/theme-provider";
import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { App } from "./App.tsx";
import { bridgeInit } from "./bridge";

// 特别注意：主窗口实例化的时候需要传入参数isMain = true, 自创扣不能是main
bridgeInit(true);

class ErrorCatch extends React.Component<PropsWithChildren> {
  componentDidCatch(error: Error): void {
    CefWriteLog(`render error ------> ${error.name} ${error.message}`);
  }
  render() {
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <HashRouter>
        <ErrorCatch>
          <App />
        </ErrorCatch>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
