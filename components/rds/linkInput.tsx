import Button from "@ramsey-design-system/button";
import clsx from "clsx";
import { useMemo } from "react";
import { DeleteIcon, LinkExternalIcon } from "..";
import styles from "./rds.module.scss";

type LinkInputButtons = "open" | "delete";
type Actions = {
  [key in LinkInputButtons]: {
    label: string;
    action: (value: string) => any;
    icon: (props: any) => JSX.Element;
  };
};

type InputProps = {
  value: string;
  actions?: LinkInputButtons[];
  onDelete?: (value: string) => void;
};

export default function LinkInput(props: InputProps) {
  const { value, actions = [], onDelete } = props;
  const actionCallbacks = useMemo<Actions>(
    () => ({
      open: {
        label: "Open Link",
        action: (href: string) => window.open(href, "_blank"),
        icon: LinkExternalIcon,
      },
      delete: {
        label: "Delete Link",
        action: (value: string) => onDelete && onDelete(value),
        icon: DeleteIcon,
      },
    }),
    [onDelete]
  );

  function ActionButton({ type }: { type: LinkInputButtons }) {
    const { label, icon, action } = actionCallbacks[type];

    return (
      <Button
        iconOnly
        className={styles["rds-LinkInput-action"]}
        type="button"
        appearance="subtle"
        aria-label={label}
        icon={icon}
        onClick={() => action(value)}
      />
    );
  }

  return (
    <div className={styles["rds-LinkInput"]}>
      <div className={clsx(styles["rds-Input"])}>
        <input value={value} type="url" readOnly disabled />
      </div>
      {actions.length > 0 && (
        <div className={styles["rds-LinkInput-actions"]}>
          {actions.map((action) => (
            <ActionButton key={action} type={action} />
          ))}
        </div>
      )}
    </div>
  );
}
