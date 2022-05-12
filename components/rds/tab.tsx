import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import styles from "./rds.module.scss";

type TabChild = React.ReactElement<TabProps>;

type TabsProps = {
  children: TabChild | TabChild[];
};

export function Tabs(props: TabsProps) {
  const { children, ...rest } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const content = (
    React.Children.toArray(children).at(selectedIndex) as TabChild
  ).props.children;

  return (
    <div className={styles["rds-Tabs"]} {...rest}>
      <ul className={styles["rds-Tabs-list"]}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            ...child.props,
            index,
            isActive: index === selectedIndex,
            onClick: setSelectedIndex,
          })
        )}
      </ul>
      <div className={styles["rds-Tabs-content"]}>{content}</div>
    </div>
  );
}

type TabProps = {
  label: string;
  isCurrentPhase?: boolean;
  children: ReactNode;

  /* Passed by Parent */
  index?: number;
  isActive?: boolean;
  onClick?(index: number): void;
};

export function Tab(props: TabProps) {
  const {
    isActive = false,
    index = 0,
    label,
    isCurrentPhase,
    onClick = () => {},
  } = props;

  return (
    <li
      className={clsx(styles["rds-Tab"], {
        [styles["rds-Tab--active"]]: isActive,
      })}
    >
      <button
        className={styles["rds-Tab-content"]}
        type="button"
        onClick={() => onClick(index)}
      >
        {isCurrentPhase && <div className={styles["rds-Tab--alert"]} />}
        {label}
      </button>
    </li>
  );
}
