/* ---------------------------------------------------------------------------- */
/*! --- Implementation Examples Scripts --------------------------------------- *
 * Copyright (c) 2023 Mootly Obviate -- See /LICENSE.md
 * ---------------------------------------------------------------------------- *
 * Example of implementing the scripts in the layout library.
 * --- Revision History ------------------------------------------------------- *
 * 2021-11-17 | Started
 * ---------------------------------------------------------------------------- */
                    // Table of contents variables                              *
                    // All are optional if you want to use the defaults         *
                    const toc_container = 'page-body';
const toc_location  = 'toc-links';
const toc_tier1     = 'h2';
const toc_tier2     = 'h3, dt';
const toc_exclude   = '';
const toc_auto      = true;
                    // Top link variables                                       *
                    // All are optional if you want to use the defaults         *
const top_container = 'page-body';
const top_addTags   = 'h2';
const top_topID     = 'top';
const top_skipFirst = true;
const top_auto      = true;
                    // All scripts in the mp namespace to avoid collisions.     *
                    // Page redraws come first: contents, toplinks              *
                    // Sticky last since it gathers page positions.             *
let mp = {
  contents: new mpc_tocgenerator(toc_location, toc_container, toc_tier1, toc_tier2, toc_exclude, toc_auto),
  toplinks: new mpf_toplink(top_addTags, top_container, top_topID, top_skipFirst, top_auto),
  sticky: new mpc_sticky(true, 'sticky', 'layer'),
};
                    // only invoke these manually if auto=false                 *
// window.addEventListener('load', (e) => { mpl.contents.create(); });
// window.addEventListener('load', (e) => { mpl.toplinks.create(); });
// window.addEventListener('load',     (e) => { mp.sticky.stickybox(); });
// window.addEventListener('scroll',   (e) => { mp.sticky.stickybox(); });
/* ---------------------------------------------------------------------------- */
