import { LitElement, html } from "lit";

class MyElement extends LitElement {
    render() {
        return html`
        <div>
            <slot></slot>
        </div>
        <button @click=${this._getSlottedChildren}>Get Element</button>

        `;
    }

    _getSlottedChildren() {
        const slot=this.shadowRoot.querySelector('slot');
        console.log(slot.assignedElements());
      }
}

customElements.define('my-dom', MyElement);