let _date = new Date();
let _dayOfWeekNames = ['d', 'l', 'm', 'm', 'j', 'v', 's'];
let _selectedDate = {};

class DatePicker extends HTMLElement {
    constructor(){
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <i class="material-icons">date_range</i>
            <input type="text" placeholder="Escoge una fecha">
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/date-picker/date-picker.css);
        `;
        shadowRoot.appendChild(style);
    }

    connectedCallback(){
        // Show calendar modal
        this.addEventListener('click', function(){
            this.showCalendarWindow();
        }.bind(this), false);

        this.removeCalendar();

        // Bus events
        Bus.listen('/update-date-header', function(){
            let headerDate = this.shadowRoot.querySelector('#calendar-header h2');
            headerDate.innerHTML = _date.toLocaleDateString('es-mx', { month: 'short' }) + ' ' + _date.getFullYear();
        }.bind(this));
    }

    showCalendarWindow(){
        if(!this.shadowRoot.getElementById('calendar')){
            let overlay = document.getElementsByClassName('overlay')[0];
            overlay.classList.add('date-picker-overlay');

            let calendar = document.createElement('div');
            calendar.id = 'calendar';
            this.generateCalendar(calendar);
            this.shadowRoot.appendChild(calendar);
        }
    }

    generateCalendar(calendar){
        let header = document.createElement('div');
        header.id = 'calendar-header';
        let monthAndYear = document.createElement('h2');
        monthAndYear.innerHTML = _date.toLocaleDateString('es-mx', { month: 'short' }) + ' ' + _date.getFullYear();

        header.appendChild(monthAndYear);
        header.appendChild(this.buildMonthArrows());
        calendar.appendChild(header);

        calendar.appendChild(this.buildDayBlocks());
    }

    buildMonthArrows() {
        let arrowContainer = document.createElement('div');
        arrowContainer.id = 'arrow-container';
        let leftArrow = document.createElement('i');
        leftArrow.innerHTML = 'chevron_left';
        leftArrow.classList.add('material-icons', 'arrow');
        leftArrow.id = 'calendar-left-arrow';
        let rightArrow = document.createElement('i');
        rightArrow.innerHTML = 'chevron_right';
        rightArrow.classList.add('material-icons', 'arrow');
        rightArrow.id = 'calendar-right-arrow';

        arrowContainer.appendChild(leftArrow);
        arrowContainer.appendChild(rightArrow);

        leftArrow.addEventListener('click', function(){
            this.monthShift('left');
        }.bind(this));

        rightArrow.addEventListener('click', function(){
            this.monthShift('right');
        }.bind(this));

        return arrowContainer;
    }

    monthShift(direction){
        let calendar = this.shadowRoot.getElementById('calendar');
        let table = this.shadowRoot.getElementById('calendar-table');
        if(direction === 'left'){
            _date.setMonth(_date.getMonth() - 1);
        }else{
            _date.setMonth(_date.getMonth() + 1);
        }
        table.remove();
        calendar.appendChild(this.buildDayBlocks());

        // Emit bus event
        Bus.emit('/update-date-header');
    }

    buildDayBlocks(){
        let table = document.createElement('table');
        table.id = 'calendar-table';
        let separator = document.createElement('div');
        separator.classList.add('calendar-name-separator');
        table.appendChild(separator);

        table.appendChild(this.buildNameOfDays());

        let flag = true, date = new Date(_date.getFullYear(), _date.getMonth(), 1);
        while(flag){
            let tr = document.createElement('tr');
            tr.classList.add('week-row');

            for(let j=0; j < 7; j++){
                let dayBlock = document.createElement('td');
                dayBlock.classList.add('day-block');
                if(date.getDay() === j){
                    let content = document.createElement('div');
                    content.classList.add('day-cell-content');
                    content.innerHTML = date.getDate().toString();

                    dayBlock.setAttribute('day-value', date.getDay().toString());
                    dayBlock.setAttribute('date-value', date.toLocaleDateString());
                    dayBlock.appendChild(content);

                    date.setDate(date.getDate() + 1);

                    if(date.getDate() === 1){
                        tr.appendChild(dayBlock);
                        flag = false;
                        break;
                    }
                }
                tr.appendChild(dayBlock);
            }

            table.appendChild(tr);
        }

        return table;
    }

    buildNameOfDays(){
        let nameRow = document.createElement('tr');
        nameRow.id = 'week-header';
        for(let i in _dayOfWeekNames){
            let cell = document.createElement('td');
            cell.innerHTML = _dayOfWeekNames[i];
            nameRow.appendChild(cell);
        }

        return nameRow;
    }

    removeCalendar(){
        // Remove calendar modal
        let overlay = document.getElementsByClassName('overlay')[0];
        overlay.addEventListener('click', function(){
            if(overlay.classList.contains('date-picker-overlay')){
                this.shadowRoot.getElementById('calendar').remove();
                overlay.classList.remove('date-picker-overlay');
            }
        }.bind(this), false);
    }
}

window.customElements.define('date-picker', DatePicker);