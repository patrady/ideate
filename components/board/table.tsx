import { TableHTMLAttributes } from "react";
import styles from './board.module.scss';

export default function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  const { children } = props;

  return <table className={styles.Board}>{children}</table>;
}
