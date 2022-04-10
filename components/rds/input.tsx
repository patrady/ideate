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
  const [{ onChange, onBlur }, { touched, error }] = useField(name);

  return (
    <div className={clsx(className, styles["rds-FormField"])}>
      <label className={styles["rds-FormField-label"]} htmlFor={name}>
        {label}
      </label>
      <div className={styles["rds-FormField-control"]}>
        <div className={styles["rds-Input"]}>
          <input name={name} onChange={onChange} onBlur={onBlur} />
        </div>
      </div>
      {help && <div className={styles["rds-FormField-help"]}>{help}</div>}
      {touched && error && (
        <span className={styles["rds-FormField-error"]}>{error}</span>
      )}
    </div>
  );
}
