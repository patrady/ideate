import { ReactNode } from "react";
import styles from "./page.module.scss";

type Props = { children: ReactNode };

export default function Page(props: Props) {
  const { children } = props;

  return <div className={styles["Page"]}>{children}</div>;
}
