/*! --- Sticky Elements ------------------------------------------------------- *
 * mpc_sticky 1.0.0
 * Copyright (c) 2023 Mootly Obviate -- See /LICENSE.md
 * ---------------------------------------------------------------------------- *
 * Lock selected elements to the top of the page on scroll.
 * ---------------------------------------------------------------------------- *
 * To use, create listeners for: load, scroll
 * Constructor arguments:
 *   pAuto    : boolean : Whether to add listeners automatically
 *   pBox     : class   : Element(s) to lock
 *   pMethod  : string  : Way in which to deal with multiple sticky elements
 *
 * Possible values for pMethod:
 *   stack    : Stack fixed elements down the page (default)
 *   layer    : Layer fixed elements, so each one is on top of the previous
 *              This requires fixed elements be more or less uniform in size.
 *   push     : Push prior fixed elements off the top of the screen
 *              (Not implemented, just an idea for some fancy.)
 *
 * Notes:
 *   Layout is CSS driven,
 *   Script generates
 *   - a class for our fixed elements: .fixed-top
 *   - a style for elements to clear them: margin-top: offset.
 *   Sticky elements should have opaque background since things run under them.
 *
 * *** Initialize - Example --------------------------------------------------- *
 * Need both load and scroll listeners
 * let mp = {
 *   sticky: new mpc_sticky(className, 'stack|layer', auto),
 *   ...
 * };
 * window.addEventListener('load', (e) => { mp.sticky.stickybox(););
 * window.addEventListener('scroll', (e) => { mp.sticky.stickybox(););
 * --- Revision History ------------------------------------------------------- *
 * 2023-11-27 | New TypeScript-compliant version
 * ---------------------------------------------------------------------------- */
class mpc_sticky {
  box               : NodeListOf<HTMLElement>;
  next              : HTMLElement[] | boolean;
  nextTop           : number[];
  position          : number[];
  offset            : number[];
  elTop             : number[];
  totOffset         : number[];
  method            : string;
  allowedMethods    : string[];
  constructor(
    pAuto           : boolean = true,
    pBox            : string  = 'sticky',
    pMethod         : string  = 'layer'
  ) {
                    // Make sure we have a class and not just a string          *
    if (!pBox[0].startsWith('.')) { pBox = '.'+pBox; }
    this.box        = document.querySelectorAll(pBox);
    this.allowedMethods = ['stack', 'layer' /*, 'push'*/];
    this.method     = this.allowedMethods.includes(pMethod) ? pMethod : 'stack';
                    // Init our arrays                                          *
    this.next       = [];
    this.nextTop    = [];
    this.position   = [];
    this.offset     = [];
    this.totOffset  = [];
    this.elTop      = [];
                    // Iterator is nodelist of stickies.                        *
    this.box.forEach ((el : HTMLElement, key : number) => {
      this.offset[key] = el.offsetHeight;
                    // Stack needs sum of all previous sticky element heights.  *
      if (this.method == 'stack') {
        this.totOffset[key] = (this.offset[key-1])
                    ? this.offset[key-1] + this.totOffset[key-1]
                    : 0;
      } else {
        this.totOffset[key] = 0;
      }
      this.position[key]  = el.getBoundingClientRect().top + window.scrollY - this.totOffset[key];
      this.next[key]      = el.nextElementSibling as HTMLElement || false;
      this.nextTop[key]   = (this.next[key])
                    ? parseFloat(window.getComputedStyle(this.next[key]).marginTop)
                    : 0;
      this.nextTop[key]   = this.nextTop[key]+this.offset[key];
    });
    if (pAuto) {
      window.addEventListener('load',   (el) => { this.stickybox(); });
      window.addEventListener('scroll', (el) => { this.stickybox(); });
    }
  }
                    // Stickybox method used by event listeners.                *
                    // Iterator is element position array.                      *
  stickybox() {
    this.position.forEach ((curr_pos : number, key : number) => {
      this.elTop[key]     = Math.round(curr_pos - window.scrollY);
      if (this.offset[key-1]) {this.elTop[key] -= this.offset[key-1]; }
    if (this.elTop[key] < 1) {          // lock position                        *
        this.box[key].classList.add('locked');
        if (this.method == 'stack') {
          this.box[key].style.top = (this.totOffset[key])+'px';
        } else {
          this.box[key].style.top = '0';
        }
        if (this.next[key]) {
          this.next[key].style.marginTop = this.nextTop[key]+'px';
        }
      } else {                          // unlock position                      *
        this.box[key].classList.remove('locked');
        if (this.next[key]) {
          this.next[key].style.marginTop = null;
          this.box[key].style.top = '0';
         }
      }
     });
  }
}
/* ---------------------------------------------------------------------------- */
