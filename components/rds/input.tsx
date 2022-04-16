import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { useField } from "formik";
import { HTMLInputTypeAttribute } from "react";
import styles from "./rds.module.scss";

type InputProps = {
  className?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  help?: string;
  fullWidth?: boolean;
};

export default function Input(props: InputProps) {
  const { className, name, type, label, help, fullWidth = false } = props;
  const [{ value, onChange, onBlur }, { touched, error }] =
    useField<string>(name);
  const hasError = touched && error;

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
        <div className={styles["rds-Input"]}>
          <input
            name={name}
            value={value}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
          />
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
