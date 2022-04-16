import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { useField } from "formik";
import { HTMLInputTypeAttribute } from "react";
import styles from "./rds.module.scss";

type LinkInputButtons = "copy" | "open";

const ActionButtonCommands: {
  [key in LinkInputButtons]: (value: string) => any;
} = {
  open: (href: string) => window.open(href, "_blank"),
  copy: (value: string) => navigator.clipboard.writeText(value),
};

type InputProps = {
  className?: string;
  name: string;
  label?: string;
  help?: string;
  fullWidth?: boolean;
  actions?: LinkInputButtons[];
};

export default function Input(props: InputProps) {
  const {
    className,
    name,
    label,
    help,
    fullWidth = false,
    actions = [],
  } = props;
  const [{ value, onChange, onBlur }, { touched, error }] =
    useField<string>(name);
  const hasError = touched && error;

  function ActionButton({ type }: { type: LinkInputButtons }) {
    const onClick = () => ActionButtonCommands[type](value);

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
    <div
      className={clsx(
        styles["rds-FormField"],
        { [styles["rds-FormField--fullWidth"]]: fullWidth },
        className
      )}
    >
      {label && (
        <Text
          element="label"
          className={styles["rds-FormField-label"]}
          htmlFor={name}
        >
          {label}
        </Text>
      )}
      <div
        className={clsx(styles["rds-FormField-control"], {
          [styles["rds-FormField-control--error"]]: hasError,
        })}
      >
        <div className="flex">
          <div className={clsx(styles["rds-Input"], styles["rds-LinkInput"])}>
            <input
              name={name}
              value={value}
              type="url"
              onChange={onChange}
              onBlur={onBlur}
            />
          </div>
          {actions.length > 0 && (
            <div className={styles["rds-LinkInput-actions"]}>
              {actions.map((action) => (
                <ActionButton key={action} type={action} />
              ))}
            </div>
          )}
        </div>
      </div>
      {hasError && (
        <Text element="span" className={styles["rds-FormField-errorMessage"]}>
          {error}
        </Text>
      )}
      {help && (
        <Text className={styles["rds-FormField-help"]} color="subdued">
          {help}
        </Text>
      )}
    </div>
  );
}
