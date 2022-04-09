import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout } from "../components";
import "../styles/global.css";
import "../styles/utils.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DndProvider>
  );
}

export default MyApp;
