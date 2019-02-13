---
id: api
title: API
---

All the API methods can be imported from the main package in this way:

```jsx
import { apiName } from "@travelperksl/super-props";
```

## `boolean([options])`

Returns a validator that checks if the given prop is `true` or `false`. Truthy or falsy values are not considered valid.

### `options`

| option     | default value | effect                        |
| ---------- | ------------- | ----------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined` |

### `boolean().make()`

Returns `true` or `false`.

## number([options])

Returns a validator that checks if the given prop is a number. Numeric strings like `"123"` are not considered valid.

### `options`

| option     | default value | effect                               |
| ---------- | ------------- | ------------------------------------ |
| `nullable` | `false`       | Allows `null` and `undefined`        |
| `min`      | `-Infinity`   | Sets the minimum allowed value       |
| `max`      | `Infinity`    | Sets the maximum allowed value       |
| `integer`  | `false`       | If `true` allows only integer values |

### number().make()

Returns a number between `options.min` and `options.max`. If `options.integer` is `true` the number will be an integer.

## integer

It's an alias for `number({ integer: true })`. It accepts all the options of `number`.

### integer().make()

It's an alias for `number({ integer: true }).make()`.

## `string([options])`

Returns a validator that checks if the given prop is a string. It's possible to test for particular string patterns
passing `options.pattern`.

### `options`

| option     | default value | effect                             |
| ---------- | ------------- | ---------------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined`      |
| `pattern`  | `/.*/`        | RegExp strings are tested against. |

### `options.make()`

Returns a string that matches `options.pattern`. The string is generated with [randexp](https://www.npmjs.com/package/randexp).

## `email([options])`

It's an alias for `` string({ pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i; }) ``. It accepts all the options of `string`.

### `email().make()`

It's an alias for `` string({ pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i; }).make() ``.

## `literal(literalValue)`

Returns a validator that checks if the given prop has the same value of `literlValue`. The check is made using
JavaScript's `===` operator. It does not accept functions or objects.

`literal` is useful when you define objects:

```jsx
const Admin = object({ isAdmin: literal(true) });
```

### `options`

| option         | default value | effect                                                                 |
| -------------- | ------------- | ---------------------------------------------------------------------- |
| `literalValue` | `undefined`   | Any value you want to check agains, expect for a function or an object |

### `options().make()`

Returns `literalValue`.

## `oneOf(choices, [options])`

Returns a validator that checks if the given prop is included in the `choices` array.

`choices` can contain a literal value or a type or a mix of both:

```jsx
const StringOrNumber = oneOf([string(), number()]);

const FooOrBarOrOne = oneOf(["foo", "bar", 1]);

const StringOrOne = oneOf([string(), 1]);
```

### `options`

| option     | default value | effect                        |
| ---------- | ------------- | ----------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined` |

### `options().make()`

Returns a random element from the list of `choices`. If one of the `choices` is a type it will call its `make()` method
to generate the value.

## `array(shape, options)`

Returns a validator that checks if the given prop is an array which elements are of the type defined by `shape`.

These are all valid examples:

```jsx
array(integer()); // e.g. [1, 2, 3]

array(string()); // e.g. ['foo', 'bar', 'baz']

array(oneOf([string(), number()])); // e.g. ['foo', 'bar', 1]
```

By default the empty array `[]` is considered valid.

### `options`

| option       | default value | effect                                        |
| ------------ | ------------- | --------------------------------------------- |
| `nullable`   | `false`       | Allows `null` and `undefined`                 |
| `allowEmpty` | `true`        | Allows the empty array `[]`                   |
| `minLength`  | `0`           | The minimum length the array must have        |
| `maxLength`  | `Infinity`    | The maximum length the array must have        |
| `unique`     | `false`       | Checks that the items in the array are unique |

### array().make()

Returns an array of length between `options.min` and `options.max` where each element is of the type defined by `shape.

---

# TBD

## object

## fn

## node

## thrower
