import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class myElementDom extends DDDSuper(LitElement) {

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,delegatesFocus:true,
  };
  
  static get tag() {
    return "my-element-dom";
  }

  constructor() {
    super();
    this.title = "";
    this.cool = false;
  }

  static get properties() {
    return {
      title: { type: String },
      cool: { type: Boolean, reflect: true },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--my-element-dom-font-size, var(--ddd-font-size-s));
      }
      :host([cool]) {
        font-size: var(--my-element-dom-font-size, var(--ddd-font-size-xl));
        background-color: green;
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  render() {
    return html`
<div class="wrapper">
  <div>${this.title}</div>
  <div>${this.cool ? html`<strong> Really Cool </strong>` : ``}</div>
  <slot name="one"></slot>
  <slot name="two"></slot>
  <slot></slot>

</div>
<slot></slot>
<div>
  <button @click=${this._getSlottedChildren}>Get Element</button>
</div>
`;
}

_getSlottedChildren() {
  const slot=this.shadowRoot.querySelector('slot');
  console.log(slot);
}

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(myElementDom.tag, myElementDom);