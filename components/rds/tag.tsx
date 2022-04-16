import RDSTag, { TagProps as RDSTagProps } from "@ramsey-design-system/tag";

interface TagProps extends RDSTagProps {
  onDelete?(): void;
}

export default function Tag(props: TagProps) {
  const { onDelete, text, ...rest } = props;

  if (!onDelete) {
    return <RDSTag text={text} {...rest} />;
  }

  return (
    <RDSTag {...rest}>
      {text}
      <button type="button" onClick={onDelete}>
        X
      </button>
    </RDSTag>
  );
}
