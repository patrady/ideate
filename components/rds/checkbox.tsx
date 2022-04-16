import Text from "@ramsey-design-system/text";
import clsx from "clsx";
import { useField } from "formik";
import styles from "./rds.module.scss";

type CheckboxProps = {
  className?: string;
  name: string;
  label: string;
  help?: string;
};

export default function Checkbox(props: CheckboxProps) {
  const { className, name, label, help } = props;
  const [{ onChange, value }, { touched, error }] = useField(name);

  return (
    <div className={clsx(styles["rds-FormField"], styles["rds-Checkbox"], className)}>
      <input type="checkbox" name={name} value={value} onChange={onChange} />
      <Text
        element="label"
        className={styles["rds-FormField-label"]}
        htmlFor={name}
      >
        {label}
      </Text>
      {help && <Text className={styles["rds-FormField-help"]}>{help}</Text>}
      {touched && error && (
        <Text element="span" className={styles["rds-FormField-error"]}>{label}</Text>
      )}
    </div>
  );
}
