/* ---------------------------------------------------------------------------- */
/*! --- Implementation Examples Scripts --------------------------------------- *
 * Copyright (c) 2023 Mootly Obviate -- See /LICENSE.md
 * ---------------------------------------------------------------------------- */
                    // Sticky variables                                         *
                    // All are optional if you want to use the defaults         *
const sticky_class  = '.sticky';
const sticky_method = 'stack';
const sticky_auto   = true;
                    // All scripts in the mp namespace to avoid collisions.     *
 let mp = {
  sticky: new mpc_sticky(sticky_auto, sticky_class, sticky_method),
// ...
};
                    // only invoke these manually if auto=false                 *
// window.addEventListener('load',     (e) => { mp.sticky.stickybox(); });
// window.addEventListener('scroll',   (e) => { mp.sticky.stickybox(); });
/* ---------------------------------------------------------------------------- */
