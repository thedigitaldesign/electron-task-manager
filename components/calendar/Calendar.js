let date = new Date();
let currentDate = {
    day: date.getDay(),
    date: date.getDate(),
    month: date.getMonth(), // month counter starts in 0
    year: date.getFullYear()
};

class Calendar extends HTMLElement {
    constructor(){
        super();

        this.nameOfDays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
        this.nameOfMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <div id="calendar-header">
                <i class="material-icons">keyboard_arrow_left</i>
                <h1></h1>
                <i class="material-icons">keyboard_arrow_right</i>
            </div>
            <div id="days-of-week"></div>
            <div id="calendar-table"></div>
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/calendar/calendar.css);
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback(){
        this.init();
    }

    init(){
        this.setMonthAndYear();
        this.setDaysOfWeek();
        this.buildDays();
    }

    setMonthAndYear(){
        let monthAndYear = this.shadowRoot.querySelector('#calendar-header h1');
        monthAndYear.textContent = `${this.nameOfMonths[currentDate.month]} ${currentDate.year}`;
    }

    setDaysOfWeek(){
        let container = this.shadowRoot.getElementById('days-of-week');
        this.nameOfDays.forEach(function(el){
            let name = document.createElement('div');
            name.classList.add('week-day');
            name.textContent = el;

            container.appendChild(name);
        });
    }

    buildDays(){
        let table = this.shadowRoot.getElementById('calendar-table');
        let flag = 0, date = new Date(currentDate.year, currentDate.month, 1);
        while(flag < 5){
            let row = document.createElement('div');
            row.classList.add('week-row');
            for(let j=0; j < 7; j++){
                let block = document.createElement('div');
                block.classList.add('block');
                let day = document.createElement('div');
                day.classList.add('day');
                day.innerHTML = date.getDate().toString();
                day.setAttribute('date-value', date.getDate().toString());

                if(date.getDate() === currentDate.date){
                    day.classList.add('day-selected');
                }else if(date.getMonth() === currentDate.month){
                    day.classList.add('enabled');
                }

                block.appendChild(day);
                row.appendChild(block);

                date.setDate(date.getDate() + 1);
            }
            table.appendChild(row);

            flag++;
        }
    }
}

window.customElements.define('j-calendar', Calendar);