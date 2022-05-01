import Button from "@ramsey-design-system/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { ChevronRightIcon } from "..";
import { Team } from "../../models";
import { EditOutlinedIcon, LockOutlinedIcon } from "../icons/icons";
import styles from "./teamLink.module.scss";

type Props = {
  team: Team;
  onEdit(team: Team): void;
};

export default function TeamLink(props: Props) {
  const {
    query: { organizationId },
  } = useRouter();
  const { team, onEdit } = props;
  const { name, slug, isActive } = team;

  function handleEdit(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.preventDefault();
    onEdit(team);
  }

  return (
    <li className={styles["TeamLink"]}>
      <Link href={`/${organizationId}/${encodeURIComponent(slug)}`}>
        <a className={styles["TeamLink-content"]}>
          <div>{name}</div>
          <div className={styles["TeamLink-actions"]}>
            <Button
              iconOnly
              appearance="subtle"
              aria-label="Edit Team"
              icon={EditOutlinedIcon}
              onClick={handleEdit}
            />
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
