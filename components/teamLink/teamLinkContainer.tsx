import { ReactNode } from "react";
import styles from "./teamLink.module.scss";

type Props = {
  children: ReactNode;
};

export default function TeamLinkContainer({ children }: Props) {
  return <ul className={styles["TeamLinkContainer"]}>{children}</ul>;
}
