import {
  Document,
  DocumentDefinition,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions,
} from 'mongoose';

export type Reference<D extends Document> = Schema.Types.ObjectId | D;

export function isDocument<D extends Document>(
  document: Reference<D>
): document is D {
  return (document as Document)?._id;
}

export function subdocGuard<
  T extends Document,
  // F extends keyof T,
  D extends Document
>(
  this: T,
  // field: F,
  value: Reference<D>
): value is D {
  const field = fieldName(this, value);
  if (!field) return false;
  return this.populated(field as string);
}
export function subdocArrayGuard<
  T extends Document,
  // F extends keyof T,
  D extends Document
>(
  this: T,
  // field: F,
  value: Reference<D>[]
): value is D[] {
  const field = fieldName(this, value);
  if (!field) return false;
  return this.populated(field as string);
}

export function guardPopulate<
  T extends Document & IGuarded,
  P extends DocumentKeys<T>
>(this: T, path: P | P[]): Promise<T> {
  if (typeof path == 'string') {
    return this.populate(path).execPopulate();
  } else {
    return path
      .reduce<T>((acc: T, cur: P) => acc.populate(cur), this)
      .execPopulate();
  }
}

export interface IGuarded {
  guard: <T extends Document & IGuarded, D extends Document>(
    this: T,
    value: Reference<D>
  ) => value is D;
  guardArray: <T extends Document & IGuarded, D extends Document>(
    this: T,
    value: Reference<D>[]
  ) => value is D[];
  guardPopulate: <T extends Document & IGuarded, P extends DocumentKeys<T>>(
    this: T,
    path: P | P[]
  ) => T;
}

export class GuardSchema<
  DocType extends Document & IGuarded,
  M extends Model<DocType, any> = Model<any, any>,
  SchemaDefinitionType = undefined
> extends Schema {
  constructor(
    definition?: SchemaDefinition<DocumentDefinition<SchemaDefinitionType>>,
    options?: SchemaOptions
  ) {
    super(definition, options);
    this.method('guard', subdocGuard).method('guardPopulate', guardPopulate);
  }

  plugin(
    fn: (
      schema: GuardSchema<DocType, M, SchemaDefinitionType>,
      opts?: any
    ) => void,
    opts?: any
  ): this {
    return super.plugin(fn, opts);
  }
}

function fieldName<D extends Document>(
  object: D,
  field: unknown
): keyof D | undefined {
  let k: keyof D;
  for (let key in object) {
    k = key as keyof D;
    if (object[k] == field) return k;
  }
  return;
}

export function reference(name: string, required?: boolean): Object {
  return {
    type: Schema.Types.ObjectId,
    ref: name,
    required,
  };
}

type TypeKeys<T, F> = string &
  keyof Omit<T, { [K in keyof T]-?: T[K] extends F ? never : K }[keyof T]>;

type DocumentKeys<Model> = TypeKeys<
  Model,
  Reference<Document>[] | Reference<Document>
>;
