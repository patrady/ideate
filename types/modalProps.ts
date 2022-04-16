export type AddModalProps<AddType> = {
  isOpen: boolean;
  onAdd(value: AddType): Promise<void> | void;
  onClose(): void;
};

export type UpdateModalProps<UpdateType, DeleteType> = {
  isOpen: boolean;
  onUpdate(value: UpdateType): Promise<void>;
  onClose(): void;
  onDelete(value: DeleteType): Promise<void>;
};
