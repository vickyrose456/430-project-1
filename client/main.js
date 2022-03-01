import "./client-header.js";

const players = [];

        const handleResponse = async (response, pResponse) => {
            const content = document.querySelector('#content');


            // Switch based on the response status code
            switch (response.status) {
                case 200:
                    content.innerHTML = '<b>Success!</b>';
                    break;
                case 201:
                    content.innerHTML = '<b>Created</b>';
                    break;
                case 204:
                    content.innerHTML = '<b>Updated!</b>';
                    break;
                case 400:
                    content.innerHTML = '<b>Bad Request ):</b>';
                    break;
                case 404:
                    content.innerHTML = '<b>Resource Not Found</b>';
                default:
                    content.innerHTML = '<b>Something went wrong ):</b>';
                    break;
            }

            content.innerHTML += `<img src="/baseballField" alt="Baseball field" style="width:400px; padding: 10px;">`;

            if (pResponse) {
                // parse the JSON
                const obj = await response.json();

                console.log(obj.playerPos);

                //const jsonString = JSON.stringify(obj.playerPos);

                //show names for each position respectively
                for (let i = 1; i <= 9; i++) {

                    if (obj.playerPos[i]) {
                        content.innerHTML += `<section id = ${i}>
                        ${obj.playerPos[i]}</section>`;
                    } else {
                        content.innerHTML += `<section id = ${i}>
                        N/A </section>`;
                    }

                }//end for loop

                //const splitJSON = jsonString.split('""');

                //players[1] = jsonString;
                //console.log(splitJSON);

                //content.innerHTML += `<p>${jsonString}</p>`;

            } else {

            }
        };

        // Uses fetch to send a post Request

        const sendPost = async (nameForm) => {
            // Grab info from the form
            const nameAction = nameForm.getAttribute('action');
            const nameMethod = nameForm.getAttribute('method');

            // name and position of the baseball player we want to add
            const nameField = nameForm.querySelector('#nameField');
            const positionField = nameForm.querySelector('#positionField');

            // Build a data string in the FORM-URLENCODED format.
            const formData = `name=${nameField.value}&pos=${positionField.value}`;

            // Make a fetch request
            const response = await fetch(nameAction, {
                method: nameMethod,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json',
                },
                body: formData,
            });

            handleResponse(response);
        };// end send post

        const requestUpdate = async (userForm) => {
            //The Url will automatically be getting the users 
            const url = '/getUsers';

            // Await our fetch response.
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            handleResponse(response, true);
        };

        const init = () => {
            // Grab the form
            const nameForm = document.querySelector('#nameForm');
            const userForm = document.querySelector('#userForm');

            // Create an addUser fns
            const addUser = (e) => {
                e.preventDefault();
                sendPost(nameForm);
                return false;
            };

            // Create getUser fns
            const getUsers = (e) => {
                e.preventDefault();
                requestUpdate(userForm);
                return false;
            };

            // Call addUser when the submit event fires on the name form.
            nameForm.addEventListener('submit', addUser);
            userForm.addEventListener('submit', getUsers);
        };

        window.onload = init;





        //Header styling 

        /* const template = document.createElement("template");
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
     font-family: sans-serif;
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
 
         //end of header code */

