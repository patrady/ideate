import clsx from "clsx";
import { useMemo } from "react";
import styles from "./rds.module.scss";

type LinkInputButtons = "copy" | "open" | "delete";
type Actions = { [key in LinkInputButtons]: (value: string) => any };

type InputProps = {
  value: string;
  actions?: LinkInputButtons[];
  onDelete?: (value: string) => void;
};

export default function LinkInput(props: InputProps) {
  const { value, actions = [], onDelete } = props;
  const actionCallbacks = useMemo<Actions>(
    () => ({
      open: (href: string) => window.open(href, "_blank"),
      copy: (value: string) => navigator.clipboard.writeText(value),
      delete: (value: string) => onDelete && onDelete(value),
    }),
    [onDelete]
  );

  function ActionButton({ type }: { type: LinkInputButtons }) {
    const onClick = () => actionCallbacks[type](value);

    return (
      <button
        className={styles["rds-LinkInput-action"]}
        type="button"
        onClick={onClick}
      >
        {type.toString()}
      </button>
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
