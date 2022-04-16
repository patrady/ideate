import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { useField } from "formik";
import styles from "./rds.module.scss";

export type FormFieldProps = {
  className?: string;
  name: string;
  label?: string;
  help?: string;
  fullWidth?: boolean;
  children?: React.ReactNode;
};

export default function FormField(props: FormFieldProps) {
  const { className, name, label, help, fullWidth = false, children } = props;
  const [, { touched, error }] = useField<string>(name);
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
        {children}
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
