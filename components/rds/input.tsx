import { useField } from "formik";
import { HTMLInputTypeAttribute } from "react";
import { FormField } from ".";
import { FormFieldProps } from "./formField";
import styles from "./rds.module.scss";

type InputProps = FormFieldProps & {
  type?: HTMLInputTypeAttribute;
};

export default function Input(props: InputProps) {
  const { name, type, ...rest } = props;
  const [{ value, onChange, onBlur }] = useField<string>(name);

  return (
    <FormField name={name} {...rest}>
      <div className={styles["rds-Input"]}>
        <input
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </FormField>
  );
}
