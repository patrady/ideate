import Link from "next/link";
import React from "react";
import { ChevronRightIcon } from "..";
import { Organization, Team } from "../../models";
import { LockOutlinedIcon } from "../icons/icons";
import styles from "./teamLink.module.scss";

type Props = {
  organization: Organization;
  team: Team;
};

export default function TeamLink(props: Props) {
  const {
    organization,
    team: { name, slug, isActive },
  } = props;

  return (
    <li className={styles["TeamLink"]}>
      <Link href={`/${organization.slug}/${encodeURIComponent(slug)}`}>
        <a className={styles["TeamLink-content"]}>
          <div>{name}</div>
          <div>
            {!isActive && (
              <LockOutlinedIcon className={styles["TeamLink-inactive"]} />
            )}
            <ChevronRightIcon className={styles["TeamLink-arrow"]} />
          </div>
        </a>
      </Link>
    </li>
  );
}
