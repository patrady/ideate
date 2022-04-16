import { useField } from "formik";
import FormField, { FormFieldProps } from "./formField";
import styles from "./rds.module.scss";

type TextAreaProps = FormFieldProps & {};

export default function TextArea(props: TextAreaProps) {
  const { name, ...rest } = props;
  const [{ value, onChange, onBlur }] = useField<string>(name);

  return (
    <FormField name={name} {...rest}>
      <div className={styles["rds-TextArea"]}>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </FormField>
  );
}
