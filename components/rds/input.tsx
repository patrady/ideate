import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { useField } from "formik";
import styles from "./rds.module.scss";

type InputProps = {
  className?: string;
  name: string;
  label: string;
  help?: string;
};

export default function Input(props: InputProps) {
  const { className, name, label, help } = props;
  const [{ value, onChange, onBlur }, { touched, error }] = useField(name);
  const hasError = touched && error;

  return (
    <div className={clsx(styles["rds-FormField"], className)}>
      <Text
        element="label"
        className={styles["rds-FormField-label"]}
        htmlFor={name}
      >
        {label}
      </Text>
      <div
        className={clsx(styles["rds-FormField-control"], {
          [styles["rds-FormField-control--error"]]: hasError,
        })}
      >
        <div className={styles["rds-Input"]}>
          <input
            name={name}
            value={value}
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
