# Questions

## 1. What is the difference between Component and PureComponent? give an example where it might break my app.

PureComponent does shallow comparison on state change while standard Component does by object reference.

## 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

ShouldComponentUpdate will stop prop update propagation to its children on Context state changes if used incorrectly, so the children component will remain unchanged and will not re-render.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1. Passing a callback function prop to the child component, when called inside the child component it will be handled at the parent;
2. Using ContextAPI, dispatch a change in the child and the parent will receive the change;
3. Using Redux, same way as above;

## 4. Give 2 ways to prevent components from re-rendering.

1. Memoization (useMemo, useCallback)
2. PureComponent

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Is React a component designed to return muplite elements at the same level, e.g.:

```jsx
  return (
    <React.Fragment>
      <div />
      <p />
    </React.Fragment>
  );
```

I don't know where it can break an app, maybe on styles if implemented unproperly.

## 6. Give 3 examples of the HOC pattern.

As far as I know there is only one:

```jsx
const HOC = Component => props => <Component {...props}>;

const AnotherComponent = { ... }

const MyComponent = HOC(AnotherComponent)
```

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

1. Promise: you need to use `catch` or `finally` to handle the exception
2. Callback: you need to receive the `error`,usually as 1st argument, and handle it
3. Async/Await: use standard `try/catch/finally` block to handle the error

## 8. How many arguments does setState take and why is it async.

Two arguments, updater and a optional callback function which will be called after updater call gets done.
It's async because it enqueus the state changes to the component state which will be handled by React and might not be done immediataly due to other internal rendering controls and state changes.

## 9. List the steps needed to migrate a Class to Function Component.

1. change class to function or const + arrow function
2. replace constructor, props and state initialization with default props, useState and useEffect
3. remove all class lifecycle methods (componentDidMount, componentDidUpdate)
4. convert all class methods to arrow function or normal functions
5. replace all this.setState calls with the right state dispatch function
6. replace all this.state calls with the right state value
7. fix all this references inside the component
8. remove the render method but keep the result
9. move componentWillUnmount logic as a return function to useEffect call

## 10. List a few ways styles can be used with components.

1. CSS + Libraries
2. SASS
3. StyledComponents / Emotion CSS

## 11. How to render an HTML string coming from the server.

```jsx
<div dangerouslySetInnerHTML={{__html: SERVER_RESPONSE_HTML }} />
```

--- 

romajs @ 2022
