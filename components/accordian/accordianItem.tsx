import Heading from "@ramsey-design-system/heading";
import Stack from "@ramsey-design-system/stack";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useBool } from "../../hooks";
import styles from "./accordian.module.scss";

type AccordianItemProps = {
  title: string;
  tag?: React.ReactNode;
  children: React.ReactNode;
};

function AccordianItem(props: AccordianItemProps) {
  const { title, tag, children } = props;
  const [isOpen, close, open] = useBool();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (!contentRef.current) {
        return;
      }

      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  function handleClick() {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }

  return (
    <li
      className={clsx(styles["AccordianItem"], {
        [styles["AccordianItem--active"]]: isOpen,
      })}
    >
      <button
        type="button"
        className={styles["AccordianItem-toggle"]}
        onClick={handleClick}
      >
        <Stack>
          <Heading level="3" className={styles["AccordianItem-title"]}>
            {title}
          </Heading>
          {tag}
        </Stack>
      </button>
      <div className={styles["AccordianItem-body"]} style={{ height }}>
        <div ref={contentRef} className={styles["AccordianItem-content"]}>
          {children}
        </div>
      </div>
    </li>
  );
}

export default AccordianItem;
