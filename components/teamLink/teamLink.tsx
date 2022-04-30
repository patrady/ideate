import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "..";
import { Organization, Team } from "../../models";
import styles from "./teamLink.module.scss";

type Props = {
  organization: Organization;
  team: Team;
};

export default function TeamLink(props: Props) {
  const {
    organization,
    team: { name, slug },
  } = props;

  return (
    <li className={styles["TeamLink"]}>
      <Link href={`/${organization.slug}/${encodeURIComponent(slug)}`}>
        <a className={styles["TeamLink-content"]}>
          <div>{name}</div>
          <ChevronRightIcon className={styles["TeamLink-arrow"]} />
        </a>
      </Link>
    </li>
  );
}
