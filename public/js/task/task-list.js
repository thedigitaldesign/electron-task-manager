let TaskProcessor = require('../../../processors/TaskProcessor');
const DateUtility = require('../../../utilities/DateUtility');
const ResponseCodes = require('../../../utilities/ResponseCodes');

async function getAllTask(container){
    let processor = new TaskProcessor();
    let response = await processor.getTasksByUser();
    container.innerHTML = '';

    console.log('response: ', response);

    if(response.rc === ResponseCodes.PROCESS_OK){
        // Append list inside container
        let list = document.createElement('ul');
        list.id = '#task-list';

        response.bean.forEach(function(el){
            let li = document.createElement('li');
            li.classList.add('task-element');
            li.innerHTML = `
                <span>${el.title}</span>
            `;

            list.appendChild(li);
        });

        container.appendChild(list);
    }else{
        // Show message inside container
        let span = document.createElement('span');
        span.textContent = 'No hay tareas para mostrar';

        container.appendChild(span);
    }
}

module.exports = {
    getAllTask
};