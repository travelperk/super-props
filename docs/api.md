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

When dealing with boolean flags most of the time you either want to set them as nullable or give them a default value:

```jsx
function HelloMessage(props) {
  const { isAfterNoon } = props;

  return isAfterNoon ? "Good evening" : "Good morning";
}

// Option 1
// We set a default value because `isAfterNoon` can't be `null`
HelloMessage.propTypes = { isAfterNoon: boolean() };
HelloMessage.defaultProps = { isAfterNoon: false };

// Option 2
// We allow `isAfterNoon` to be `null`
HelloMessage.propTypes = { isAfterNoon: boolean({ nullable: true }) };
```

### `options`

| option     | default value | effect                        |
| ---------- | ------------- | ----------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined` |

### `boolean([options]).make()`

Returns `true` or `false`.

## `number([options])`

Returns a validator that checks if the given prop is a number. Numeric strings like `"123"` are not considered valid.

### `options`

| option     | default value | effect                               |
| ---------- | ------------- | ------------------------------------ |
| `nullable` | `false`       | Allows `null` and `undefined`        |
| `min`      | `-Infinity`   | Sets the minimum allowed value       |
| `max`      | `Infinity`    | Sets the maximum allowed value       |
| `integer`  | `false`       | If `true` allows only integer values |

### `number([options]).make()`

Returns a number between `options.min` and `options.max`. If `options.integer` is `true` the number will be an integer.

## `integer([options])`

It's an alias for `number({ integer: true })`. It accepts all the options of `number`.

### `integer([options]).make()`

It's an alias for `number({ integer: true }).make()`.

## `string([options])`

Returns a validator that checks if the given prop is a string. It's possible to test for particular string patterns
passing `options.pattern`.

### `options`

| option     | default value | effect                             |
| ---------- | ------------- | ---------------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined`      |
| `pattern`  | `/.*/`        | RegExp strings are tested against. |

### `string([options]).make()`

Returns a string that matches `options.pattern`. The string is generated with [randexp](https://www.npmjs.com/package/randexp).

## `email([options])`

It's an alias for `` string({ pattern: /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i; }) ``. It accepts all the options of `string`.

### `email([options]).make()`

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

### `literal(literalValue).make()`

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

### `oneOf(choices, [options]).make()`

Returns a random element from the list of `choices`. If one of the `choices` is a type it will call its `make()` method
to generate the value.

## `array(shape, [options])`

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

### `array(shape, [options]).make()`

Returns an array of length between `options.min` and `options.max` where each element is of the type defined by `shape.

---

## `object(shape, [options])`

Returns a validator that checks if the given prop is an object matching the `shape`.
It tests each property calling their validator.

By default `object` checks for an exact match, that is if you pass extra props it will fail:

```jsx
const User = object({ id: integer() })

{ id: 1, name: 'John' } // Will fail because of the extra `name`
```

If you want some props to be optinal set them as `nullable`:

```jsx
const User = objet({
  id: integer(),
  name: string({ nullable: true })
})

// Will match all these
{ id: 1 }
{ id: 1, name: null }
{ id: 1, name: undefined }
```

You can nest objects if you want:

```jsx
const Id = integer({ min: 0 });
const Company = object({ id: Id });
const User = object({ id: Id, company: Company, email: email() });
```

### `options`

| option     | default value | effect                                                                      |
| ---------- | ------------- | --------------------------------------------------------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined`                                               |
| `exact`    | `true`        | If `true` errors out when a property is missing or is `undefined` or `null` |

### `object(shape, [options]).make()`

Returns a random object matching the `shape`. Each element is generated calling their `make` method.

### `object(shape, [options]).extend(shape)`

Takes the first shape and extends it with additional properties. Useful when you want to create specialized types
from more generic ones:

```jsx
const Person = object({ name: string() });
const User = Person.extend({ isAdmin: boolean(), email: email() });
const Admin = User.extend({ isAdmin: literal(true) });
```

## `fn([options])`

Returns a validator that checks if the given prop is a function. It's not possible to verify the received parameters
or the return value.

### `options`

| option     | default value | effect                        |
| ---------- | ------------- | ----------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined` |

## `node([options])`

Returns a validator that checks if the given prop is a valid React node. It works by calling `PropTypes.node`.

### `options`

| option     | default value | effect                        |
| ---------- | ------------- | ----------------------------- |
| `nullable` | `false`       | Allows `null` and `undefined` |

---

## `thrower(shouldIntercept)`

The normal behavior of PropTypes—and of Super Props by extension—is to log a `console.error` whenever a validation
error occurs. In most cases this is not the wanted behavior.

`thrower` intercepts all the calls to `console.error` and converts the ones coming from Super Props into JavaScript errors.

It's important to notice that it ignores any other call to `console.error` including the ones coming from PropTypes.

You want to disable `thrower` in production and have it running in development and in your tests. To do so simply pass
`false` as its parameter.

The typical setup you'll want is the following:

```jsx
// Put this in your index.js
import { thrower } from "@travelperksl/super-props";

thrower(process.env.NODE_ENV !== "production");
```
