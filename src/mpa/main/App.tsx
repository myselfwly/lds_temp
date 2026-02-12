/**
 * App 根组件 - 哈希路由
 */

import "./styles/index.css";

import { FC, useEffect, useState } from "react";

import HomePage from "./pages/Home";
import PreviewPage from "./pages/Preview";
import { getHashPath } from "./utils/url";

interface AppProps {}

/**
 * App根组件
 */
export const App: FC<AppProps> = () => {
  const [currentPath, setCurrentPath] = useState(getHashPath());

  useEffect(() => {
    // 监听哈希变化
    const handleHashChange = () => {
      setCurrentPath(getHashPath());
    };

    window.addEventListener("hashchange", handleHashChange);

    // 初始化路由
    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // 路由渲染
  const renderPage = () => {
    switch (currentPath) {
      case "/":
      case "":
        return <HomePage />;
      case "/preview":
        return <PreviewPage />;
      default:
        return <HomePage />;
    }
  };

  return <div className="app min-h-screen w-full">{renderPage()}</div>;
};
