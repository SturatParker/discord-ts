import {
  Document,
  DocumentDefinition,
  Model,
  Schema,
  SchemaDefinition,
  SchemaOptions,
  SchemaType,
} from 'mongoose';

export function guard<
  T extends Document,
  // F extends keyof T,
  D extends Document
>(
  this: T,
  // field: F,
  value: Schema.Types.ObjectId | D
): value is D {
  const field = fieldName(this, value);
  if (!field) return false;
  return this.populated(field as string);
}

export interface IGuarded {
  guard: <
    T extends Document & IGuarded,
    // F extends keyof T,
    D extends Document
  >(
    this: T,
    // field: F,
    value: Schema.Types.ObjectId | D
  ) => value is D;
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
    this.method('guard', guard);
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

export function reference(model: Model<any>, required?: boolean): Object {
  return {
    type: Schema.Types.ObjectId,
    ref: model.modelName,
    required,
  };
}
