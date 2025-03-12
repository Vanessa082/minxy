export type BaseDocumentRead<T extends object> = T & {
  updatedAt?: Date;
  createdAt?: Date;
};
