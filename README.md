# @valbo/json-schema-validation

Validate JSON schemas with Typescript support.

![npm (scoped)](https://img.shields.io/npm/v/@valbo/json-schema-validation)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![Build Status](https://img.shields.io/github/workflow/status/valverdealbo/json-schema-validation/CI)
[![Coverage Status](https://coveralls.io/repos/github/valverdealbo/json-schema-validation/badge.svg?branch=main)](https://coveralls.io/github/valverdealbo/json-schema-validation?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/valverdealbo/json-schema-validation/badge.svg?targetFile=package.json)](https://snyk.io/test/github/valverdealbo/json-schema-validation?targetFile=package.json)

## Install

```bash
npm install @valbo/json-schema-validation
```

## Usage

This package creates a function that validates data against JSON Schemas using [Ajv](https://www.npmjs.com/package/ajv).

To create the function you need an Ajv instance configured with any formats and keywords you need. See [ajv-formats](https://www.npmjs.com/package/ajv-formats) and [ajv-keywords](https://www.npmjs.com/package/ajv-keywords).

The Ajv instance should also be loaded with any schemas you are going to use to validate data. Schemas should be defined as const objects. See [json-schema-to-ts](https://www.npmjs.com/package/json-schema-to-ts).

```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addStrictFormats from '@valbo/ajv-strict-formats';
import { createValidate } from '@valbo/json-schema-validation';

const personSchema = {
  $id: 'person',
  type: 'object',
  properties: { name: { type: 'string' } },
  required: ['name'],
  additionalProperties: false,
} as const;

const ajv = new Ajv();
addFormats(ajv);
addStrictFormats(ajv);
ajv.addSchema(personSchema);

const validate = createValidate(ajv);
```

Use the created function to validate data. If the validation succeeds the returned value is the same data with its type inferred from the provided schema. If the validation fails the function throws a **400 BadRequestError**.

```typescript
const bob = { name: 'bob' };

const typedBob = validate(personSchema, bob);
console.log(typedBob.name); // typedBob type is { name: string }.
```
