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

  return (
    <div className={clsx(className, styles["rds-FormField"])}>
      <Text element="label" className={styles["rds-FormField-label"]} htmlFor={name}>
        {label}
      </Text>
      <div className={styles["rds-FormField-control"]}>
        <div className={styles["rds-Input"]}>
          <input name={name} value={value} onChange={onChange} onBlur={onBlur} />
        </div>
      </div>
      {help && <Text className={styles["rds-FormField-help"]} color="subdued">{help}</Text>}
      {touched && error && (
        <Text element="span" className={styles["rds-FormField-error"]}>{error}</Text>
      )}
    </div>
  );
}
