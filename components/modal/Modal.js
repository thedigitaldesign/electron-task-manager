class Modal {
    constructor(){
        if(!this.modal){
            this.modal = document.createElement('div');
            this.modal.classList.add('j-modal-container');
            this.modal.innerHTML = `
                <div class="j-modal">
                    <div class="m-header">
                        <h1 class="m-title"></h1>
                        <i class="material-icons">close</i>
                    </div>
                    <div class="m-content"></div>
                </div>  
            `;

            let style = document.createElement('style');
            style.textContent = `
                @import url(./components/modal/modal.css);
            `;
            this.modal.appendChild(style);

            document.body.appendChild(this.modal);
            this.modal.classList.add('is-shown');
        }
    }

    build(title, content){
        console.log(this.modal);
        this.modal.querySelector('.m-title').textContent = title;
        if(content){
            this.modal.querySelector('.m-content').innerHTML = content;
        }
    }

    show(){
        this.modal.querySelector('.j-modal').classList.add('is-shown');
    }

    hide(){}
}

module.exports = Modal;