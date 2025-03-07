# MoosePlum Sticky Headers

This is a really simple sticky header script. All it does, **THE ONLY THING** it does is stop an element when it reaches the top of the page and sticks it there.

It does give you the option to stack them one below the next or to layer them all at the top, so that is something.

## Dependencies

This was written in TypeScript and exported to ES2020.

## Assets

The files in this set are as follows:

| path              | description                                        |
| ----------------- | -------------------------------------------------- |
| LICENSE.md        | License notice ( [MIT](https://mit-license.org) ). |
| README.md         | This document.                                     |
| sticky.ts         | The class definition in TypeScript.                |
| sticky.js         | The class definition in ES6.                       |
| sticky.min.js     | Minified version.                                  |
| sticky.min.js.map | Map file.                                          |
| tsconfig.json     | Example TS > ES2020 config setting.                |
| _invoke.js        | Example implementation code.                       |

## Installation

Download this repo, or just the script, and add it to the script library for your site.

This script has no external dependencies.

### Compiling from the TypeScript

To save to ES2020 in the current folder, assuming you have the correct libraries installed, run the following in this folder:

`tsc -p tsconfig.json`

## Configuration

### Assumptions

Fixed and positoned elements have a higher stacking order. If there are other positioned elements on the page, remember to use z-index to keep fixed elements on top of others. Recommended z-index for `fixed` is `sticky`+1.

The script adjusts the top margin on the element following the sticky element to prevent scroll jump. To avoid problems with olders browsers, remember to set a top margin in the CSS for the post-sticky elements.

The sticky element should have a top margin of zero. The script does **NOT** set/unset the position property in CSS. This coded into the CSS for the `fixed` class. If using "stack" instead of layer, the script will set the top position for all subsequent fixed elements to the sum of heights of the previous fixed elements.

Sticky elements should have an opaque background because other content will be passing behind them on scroll.

### Recommended HTML Code

Use a &lt;div /&gt; element to make it easier to manage margins without messing up the contents.

Add a class to mark the next immediate element. The script grabs the next programmatically, but it is nice to have self-documenting page elements.

```html
<div class="sticky"><h2>Some Header</h2></div>
<div class="post-sticky">
  <p>Some post sticky content.</p>
</div>
```

### Recommended CSS

Set appropriate `z-index` and `margin-top` values for the impacted elements.

Set the CSS for the `locked` class to position fixed with a top of zero.

```css
.sticky {
  z-index   : _stickyZidx_;
  margin    : 0;
  ⋮
}
.sticky.locked {
  position  : fixed;
  top       : 0px;
  z-index   : _stickyZidx_ + 1;
  ⋮
}
.post-sticky {
  margin-top: 1.0em;
  ⋮
}
```

### Parameters

| name    | type    | default | description                                |
| ------- | ------- | ------- | ------------------------------------------ |
| pBox    | string  | sticky  | Class of sticky slements.                  |
| pMethod | string  | stack   | Whether to stack or layer.                 |
| pAuto   | boolean | true    | Whether to automatically create listeners. |

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
window.addEventListener('load', (e) => { mp.sticky.stickybox(); });
window.addEventListener('scroll', (e) => { mp.sticky.stickybox(); });
```
