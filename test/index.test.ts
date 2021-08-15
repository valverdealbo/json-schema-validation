import Ajv from 'ajv';
import { createValidate } from '../src';

const personSchema = {
  $id: 'person',
  type: 'object',
  properties: { name: { type: 'string' } },
  required: ['name'],
  additionalProperties: false,
} as const;

const validPerson = { name: 'bob' };

const invalidPerson = { username: 'bob' };

describe('createValidateSchema()', () => {
  test('should throw when the ajv instance does not have the provided schema', () => {
    const ajv = new Ajv();
    const validate = createValidate(ajv);
    expect(() => validate(personSchema, validPerson)).toThrow();
  });

  test('should throw a bad request error when the data is invalid', () => {
    const ajv = new Ajv();
    ajv.addSchema(personSchema);
    const validate = createValidate(ajv);
    expect(() => validate(personSchema, invalidPerson)).toThrow(expect.objectContaining({ status: 400 }));
  });

  test('should return the typed data when it is valid', () => {
    const ajv = new Ajv();
    ajv.addSchema(personSchema);
    const validate = createValidate(ajv);
    const typedPerson = validate(personSchema, validPerson);
    expect(typedPerson.name).toBe(validPerson.name);
  });
});
