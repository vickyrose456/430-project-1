const template = document.createElement("template");
        template.innerHTML = `
    <style>
header{
    color: white;
    background-color: green;
    padding: 1em;
    user-select: none;
    margin-bottom: .5rem;
  }
  header h1{
    font-family: "Merriweather";
    letter-spacing: 1px;
  }
  
  header span{
    font-variant: small-caps;
    font-weight: bolder;
    font-family: sans-serif;
    font-style: italic;
  }
    </style>
<header>
    <h1>Starting Basball Lineup</h1>
    <span>Set your starting team!</span>
</header>
`;

//class to display the header on the top of the page 
class ClientHeader extends HTMLElement {
    constructor() {
        super();

        //attach shadow DOM
        this.attachShadow({ mode: "open" });

        //clone template
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.h1 = this.shadowRoot.querySelector("h1");
        this.span = this.shadowRoot.querySelector("span");

    }//end constructor


    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        //cleanup
        this.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal) {
        ///console.log(attributeName, oldVal, newVal);
        this.render();
    }

    static get observedAttributes() {
        return ["data-title"];
    }

    render() {
        //grab attribute vals and assign default val if needed
        const title = this.dataset.title ? this.dataset.title : "Baseball API";
        this.h1.innerHTML = `${title}`;
        this.span.innerHTML = `Set your starting team!`;
    }

}//ends SWHeader element

customElements.define('client-header', ClientHeader);

//end of header code 