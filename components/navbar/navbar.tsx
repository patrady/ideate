import Link from "next/link";
import clsx from "clsx";
import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <header className={styles["AppNavigation"]} role="navigation">
      <Link href="/">
        <div
          className={clsx(
            styles["AppNavigation-item"],
            styles["AppNavigation-logo"]
          )}
        />
      </Link>

      <nav>
        <ul className={styles["AppNavigation-list"]}>
          <li className={styles["AppNavigation-item"]}>
            <Link href="/ramsey-solutions/teams">
              <a className={styles["AppNavigation-link"]}>Teams</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
