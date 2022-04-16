import React from "react";
import styles from "./accordian.module.scss";

type AccordianProps = {
  children: React.ReactNode;
};

export default function Accordian(props: AccordianProps) {
  const { children } = props;

  return <ul className={styles["Accordian"]}>{children}</ul>;
}
