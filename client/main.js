import "./client-header.js";

        const handleResponse = async (response, pResponse) => {
            const content = document.querySelector('#content');


            // Switch based on the response status code
            switch (response.status) {
                case 200:
                    content.innerHTML = '<p id = "status"><b>Success!</b></p>';
                    break;
                case 201:
                    content.innerHTML = '<p id = "status"><b>Created</b></p>';
                    break;
                case 204:
                    content.innerHTML = '<p id = "status"><b>Updated!</b></p>';
                    break;
                case 400:
                    content.innerHTML = '<p id = "status"><b>Bad Request ):</b></p>';
                    break;
                case 404:
                    content.innerHTML = '<p id = "status"><b>Resource Not Found</b></p>';
                default:
                    content.innerHTML = '<p id = "status"><b>Something went wrong ):</b></p>';
                    break;
            }

            content.innerHTML += `<img src="/baseballField" alt="Baseball field" style="width:500px; padding: 5px;">`;

            if (pResponse) {
                // parse the JSON
                const obj = await response.json();

                console.log(obj.playerPos);

                //const jsonString = JSON.stringify(obj.playerPos);

                

                //show names for each position respectively
                for (let i = 1; i <= 9; i++) {

                    const section = document.createElement("section");
                    section.id = `pos${i}`;
                    
                    if (obj.playerPos[i]) {
                        //section.innerHTML += `<section id = ${i}>
                        //${obj.playerPos[i]}</section>`;
                        
                        section.innerText = `${obj.playerPos[i]}`;

                    } else {
                        //section.innerHTML += `<section id = ${i}>
                        //N/A </section>`;
                        section.innerText = 'N/A';
                    }
                    
                    content.appendChild(section);

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

