let CalendarProcessor = require('../../processors/CalendarProcessor');

let date = new Date();
let currentDate = {
    day: date.getDay(),
    date: date.getDate(),
    month: date.getMonth(), // month counter starts in 0
    year: date.getFullYear(),
};
let today = Object.assign({}, currentDate);

class Calendar extends HTMLElement {
    constructor(){
        super();

        this.shortNameOfDays = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
        this.nameOfDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        this.nameOfMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <div id="single-day-container">
                <span class="day-number"></span>
                <span class="day-name"></span>
            </div>
            <div id="calendar">
                <div id="calendar-header">
                    <i class="material-icons" id="backward">keyboard_arrow_left</i>
                    <h1></h1>
                    <i class="material-icons" id="forward">keyboard_arrow_right</i>
                </div>
                <div id="days-of-week"></div>
                <div id="calendar-table"></div>
            </div>  
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/calendar/calendar.css);
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback(){
        this.init();

        this.shadowRoot.getElementById('backward').addEventListener('click', function(){
            this.backward();
        }.bind(this));
        this.shadowRoot.getElementById('forward').addEventListener('click', function(){
            this.forward();
        }.bind(this));

        Bus.listen('/update-single-day-data', function(data){
            this.updateSingleDay(data.date, data.day);
        }.bind(this));
    }

    init(){
        this.setMonthAndYear();
        this.setDaysOfWeek();
        this.firstRender();

        this.updateSingleDay();
    }

    setMonthAndYear(){
        let monthAndYear = this.shadowRoot.querySelector('#calendar-header h1');
        monthAndYear.textContent = `${this.nameOfMonths[currentDate.month]} ${currentDate.year}`;
    }

    setDaysOfWeek(){
        let container = this.shadowRoot.getElementById('days-of-week');
        this.shortNameOfDays.forEach(function(el){
            let name = document.createElement('div');
            name.classList.add('week-day');
            name.textContent = el;

            container.appendChild(name);
        });
    }

    setToday(date, day){
        if(date.getFullYear() === today.year &&
        date.getMonth() === today.month &&
        date.getDate() === today.date &&
        currentDate.month === today.month){
            day.classList.add('day-selected');
            day.classList.remove('enabled');
        }
    }

    removeSelectedDay(){
        if(this.shadowRoot.querySelector('.day-selected') != null){
            this.shadowRoot.querySelector('.day-selected').classList.add('enabled');
            this.shadowRoot.querySelector('.day-selected').classList.remove('day-selected');
        }
    }

    firstRender(){
        let table = this.shadowRoot.getElementById('calendar-table');
        let i = 0, idx = 0, thiz = this;
        let date = new Date(currentDate.year, currentDate.month, 1);
        date.setDate(date.getDate() - date.getDay());

        while(i < 6){
            let row = document.createElement('div');
            row.classList.add('week-row');
            for(let j=0; j < 7; j++){
                let block = document.createElement('div');
                block.classList.add('block');
                let day = document.createElement('div');
                day.classList.add('day');
                day.classList.add(`idx-${idx}`);
                day.textContent = date.getDate().toString();
                day.setAttribute('date-value', date.getDate().toString());
                day.setAttribute('day-value', date.getDay().toString());

                if(date.getMonth() === currentDate.month){
                    day.classList.add('enabled');
                    day.addEventListener('click', function(){
                        thiz.selectDay(day);
                    });
                }
                this.setToday(date, day);

                block.appendChild(day);
                row.appendChild(block);

                date.setDate(date.getDate() + 1);

                idx++;
            }
            table.appendChild(row);

            i++;
        }
    }

    selectDay(day){
        this.removeSelectedDay();
        day.classList.remove('enabled');
        day.classList.add('day-selected');
        Bus.emit('/update-single-day-data', {
            date: parseInt(day.getAttribute('date-value')),
            day: parseInt(day.getAttribute('day-value')),
            events: []
        });
    }

    move(date){
        currentDate.month = date.getMonth();
        currentDate.year = date.getFullYear();
        this.setMonthAndYear();
        date.setDate(date.getDate() - date.getDay());
        let idx = 0;

        while(idx < 42){
            let day = this.shadowRoot.querySelector(`.idx-${idx}`);
            if(date.getMonth() === currentDate.month){
                day.classList.add('enabled');
            }else{
                day.classList.remove('enabled');
            }
            this.setToday(date, day);
            day.setAttribute('date-value', date.getDate().toString());
            day.setAttribute('day-value', date.getDay().toString());
            day.textContent = date.getDate().toString();

            date.setDate(date.getDate() + 1);
            idx++;
        }
    }

    backward(){
        let date = new Date(currentDate.year, currentDate.month - 1, 1);
        this.removeSelectedDay();
        this.move(date);
    }

    forward(){
        let date = new Date(currentDate.year, currentDate.month + 1, 1);
        this.removeSelectedDay();
        this.move(date);
    }

    setHasEvent(el){
        el.classList.add('has-event');
    }

    updateSingleDay(date, day, events){
        date = date || today.date;
        day = day || today.day;

        let dayNumber = this.shadowRoot.querySelector('.day-number');
        dayNumber.textContent = date;

        let dayName = this.shadowRoot.querySelector('.day-name');
        dayName.textContent = this.nameOfDays[day];
    }
}

window.customElements.define('j-calendar', Calendar);