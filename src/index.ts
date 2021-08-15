import Ajv from 'ajv';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { BadRequestError } from '@valbo/http-errors';

export type JSONSchemaWithId = JSONSchema & { $id: string };

export type Validate = <Schema extends JSONSchemaWithId>(schema: Schema, data: unknown) => FromSchema<Schema>;

export function createValidate(ajv: Ajv): Validate {
  return function validate<Schema extends JSONSchemaWithId>(schema: Schema, data: unknown) {
    ajv.validate(schema.$id, data);
    if (ajv.errors === undefined || ajv.errors === null) {
      return data as FromSchema<Schema>;
    }
    throw new BadRequestError(ajv.errorsText(ajv.errors, { dataVar: '' }));
  };
}
