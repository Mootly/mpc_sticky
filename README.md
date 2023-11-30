# MoosePlum Date-Time Operations

This is a really simple sticky header script. All it does, **ALL** it does, is stop an element when it reaches the top of the page and sticks it there.

It does give you the option to stack them one below the next or to layer them all at the top, so that is something.

## Dependencies

Written for ES6.

This was written in TypeScript and exported to ES6 to allow support for browsers not yet up to the most recent ECMAScript standards.

## Contents

The files in this set are as follows:

| path                | description
| ------------        | ------------
| LICENSE.md          | License notice ( [MIT](https://mit-license.org) ).
| README.md           | This document.
| mpc_sticky.ts       | The class definition in TypeScript.
| mpc_sticky.js       | The class definition in ES6.
| mpc_sticky.min.js   | Minified version.
| _invoke.js          | Example implementation code.

## Recommended HTML Code

Use a &lt;div /&gt; element, since it is easier to manage margins on without messing up the contents.

Add a class to mark the next immediate element, just so you know what it is.

```html
<div class="sticky"><h2>Some Header</h2></div>
<p class="post-sticky">Some post sticky content.</p>
```

## Implementation

To use you must have you CSS set up to deal with z-indexing with a class of `locked` being placed above other elements.

### Parameters

| name        | type        | default     | description
| ----------  | ----------  | ----------  | ----------
| pBox        | string      | sticky      | Class of sticky slements.
| pMethod     | string      | stack       | Whether to stack or layer.
| pAuto       | boolean     | true        | Whether to auto-create listeners.

### Coding Example

Use the `mp` namespace to help avoid collisions.

```js
const sticky_class  = 'sticky';
const sticky_method = 'stack';
const sticky_auto   = true;

let mp = {
  sticky: new constructor(sticky_class, sticky_method, sticky_auto),
  ⋮
};
```

If auto is set to false, manually invoke the listeners.

```js
window.addEventListener('load', (e) => { mp.sticky.stickybox(););
window.addEventListener('scroll', (e) => { mp.sticky.stickybox(););
```
