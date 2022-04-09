import type { AppProps } from "next/app";
import { Layout } from "../components";
import "../styles/global.css";
import "../styles/utils.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
