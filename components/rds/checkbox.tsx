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
    <div className={clsx(className, styles["rds-FormField"])}>
      <input type="checkbox" name={name} value={value} onChange={onChange} />
      <label className={styles["rds-FormField-label"]} htmlFor={name}>
        {label}
      </label>
      {help && <div className={styles["rds-FormField-help"]}>{help}</div>}
      {touched && error && (
        <span className={styles["rds-FormField-error"]}>{label}</span>
      )}
    </div>
  );
}
