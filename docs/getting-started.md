---
id: getting-started
title: Getting Started
---

Super Props is a library that allows you to define advanced `propTypes` for your React components. At the same time
it makes easy to generate fake data for testing.

## Installation

To install Super Props simply run:

```bash
npm install @travelperksl/super-props
```

## Define Types

Super Props comes with a set of pre-built types you can use.

Suppose you have a React component like this one:

```jsx
function HotelStars(props) {
  const { count } = props;

  if (count === 1) return "This hotel has only 1 star";
  if (count < 5) return `This hotel has ${count} stars`;
  return "Hey, this is a FIVE stars hotel!";
}
```

We want `HotelStars` to accept a `count` prop which is a number. We can do that with PropTypes:

```jsx
import PropType from "prop-types";

HotelStars.propTypes = { count: PropTypes.number.isRequired };
```

This works but we have other requirements. `count` can't be just any number, it must be an integer between 1 and 5.
We could write a custom PropType, or we could check the value in the component's body. These methods both work
but Super Props has an easier solution:

```jsx
import { integer } from "prop-types";

HotelStars.propTypes = { count: integer({ min: 1, max: 5 }) };
```

Here we're checking that `count` is an integer between 1 and 5 and that it's defined. If a some point we pass to
`HotelStars` something that doesn't comply to these requirements an error will be thrown (more on this later).

## Reusing Types

In some cases you might want to use a type more than once. Consider this example:

```jsx
function Avatar(props) {
  return <img src={props.user.image} alt="" />;
}

function Salutation(props) {
  return (
    <div>
      Welcome back {props.user.fullName}, you have {props.messagesCount}{" "}
      messages.
    </div>
  );
}
```

Both `Avatar` and `Salutation` need to receive a `user` prop. It doesn't make sense to define it twice.
We can instead create it once and reuse it:

```jsx
import { object, string, integer, email } from "@travelperksl/super-props";

const User = object({
  image: string(),
  fullName: string(),
  email: email()
});

Avatar.propTypes = { user: User };

Salutation.propTypes = {
  user: User,
  messagesCount: integer({ min: 0 })
};
```

Of course, `User` can then be used as a normal type, for example to define a `Company`:

```jsx
const Company = object({
  name: string(),
  adminUser: User
});
```

## Generate Test Data

Since we have our types defined it makes sense to use them to generate some fake data for our tests:

```jsx
render(<Avatar user={User.make()} />);
```

Most types support the `.make()` method to generate some fake data.

## Throw On Validation Errors

When you pass a prop that doesn't pass the validation the default behavior is to log it in the console.
This behavior is not good most of the time, what you really want is for the application to throw an error both
in your local environment and in your tests.

You can do that using `thrower`:

```jsx
// Put this in your index.js
import { thrower } from "@travelperksl/super-props";

thrower(process.env.NODE_ENV !== "production");
```

`thrower` will intercept any error sent to `console.error` and if it comes from Super Props it will throw an error.
It accepts one boolean parameter to know when to activate. PropTypes don't run in production already but just
to be safe you should disable `thrower` too.
