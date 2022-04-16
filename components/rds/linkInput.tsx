import Button from "@ramsey-design-system/button";
import clsx from "clsx";
import { useMemo } from "react";
import { DeleteIcon, DocumentOutlinedIcon, LinkExternalIcon } from "..";
import styles from "./rds.module.scss";

type LinkInputButtons = "copy" | "open" | "delete";
type Actions = {
  [key in LinkInputButtons]: {
    action: (value: string) => any;
    icon: () => JSX.Element;
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
        action: (href: string) => window.open(href, "_blank"),
        icon: LinkExternalIcon,
      },
      copy: {
        action: (value: string) => navigator.clipboard.writeText(value),
        icon: DocumentOutlinedIcon,
      },
      delete: {
        action: (value: string) => onDelete && onDelete(value),
        icon: DeleteIcon,
      },
    }),
    [onDelete]
  );

  function ActionButton({ type }: { type: LinkInputButtons }) {
    const { icon, action } = actionCallbacks[type];

    return (
      <Button
        className={styles["rds-LinkInput-action"]}
        type="button"
        appearance="subtle"
        iconOnly
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
