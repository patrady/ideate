import Footer from "./footer";
import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
