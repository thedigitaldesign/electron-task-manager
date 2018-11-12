class DatePicker extends HTMLElement {
    constructor(){
        super();
        
        this._date = new Date(), this.selectedDate = {};
        this._dayOfWeekNames = ['d', 'l', 'm', 'm', 'j', 'v', 's'];

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <i class="material-icons" id="date-icon">date_range</i>
            <input type="text" maxlength="10" placeholder="dd/mm/yyyy" id="date-input">
        `;

        let style = document.createElement('style');
        style.textContent = `
            @import url(./components/date-picker/date-picker.css);
        `;
        shadowRoot.appendChild(style);
    }

    get value(){
        return this.getAttribute('value');
    }

    set value(val){
        this.setAttribute('value', val);
        this.shadowRoot.querySelector('#date-input').value = val;
    }

    connectedCallback(){
        let self = this;
        this.shadowRoot.getElementById('date-icon').addEventListener('click', function(){
            this.showCalendarWindow();
        }.bind(this));

        if(this.getAttribute('placeholder')){
            this.shadowRoot.getElementById('date-input').setAttribute('placeholder', this.getAttribute('placeholder'));
        }
        if(this.getAttribute('value')){
            this.shadowRoot.getElementById('date-input').value = this.getAttribute('value');
        }
        this.shadowRoot.getElementById('date-input').addEventListener('input', function(){
             self.value = this.value;
        });

        this.initCalendar();
    }

    showCalendarWindow(){
        let calendar = this.shadowRoot.getElementById('calendar');
        calendar.classList.add('shown');
        calendar.tabIndex = 0;
        calendar.focus();
    }

    initCalendar(){
        if(!this.shadowRoot.getElementById('calendar')){
            let calendar = document.createElement('div');
            calendar.id = 'calendar';
            this.generateCalendar(calendar);
            this.shadowRoot.appendChild(calendar);

            calendar.onblur = function(){
                this.removeCalendar();
            }.bind(this);
        }
    }

    generateCalendar(calendar){
        let header = document.createElement('div');
        header.id = 'calendar-header';
        let monthAndYear = document.createElement('h2');
        monthAndYear.innerHTML = this._date.toLocaleDateString('es-mx', { month: 'short' }) + ' ' + this._date.getFullYear();

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
            this._date.setMonth(this._date.getMonth() - 1);
        }else{
            this._date.setMonth(this._date.getMonth() + 1);
        }
        table.remove();
        calendar.appendChild(this.buildDayBlocks());

        this.updateCalendarDate();
    }

    updateCalendarDate(){
        let headerDate = this.shadowRoot.getElementById('calendar-header');
        let h2 = headerDate.getElementsByTagName('h2')[0];
        h2.innerHTML = this._date.toLocaleDateString('es-mx', { month: 'short' }) + ' ' + this._date.getFullYear();
    }

    buildDayBlocks(){
        let table = document.createElement('table');
        table.id = 'calendar-table';
        let separator = document.createElement('div');
        separator.classList.add('calendar-name-separator');
        table.appendChild(separator);

        table.appendChild(this.buildNameOfDays());

        let flag = true, date = new Date(this._date.getFullYear(), this._date.getMonth(), 1);
        while(flag){
            let tr = document.createElement('tr');
            tr.classList.add('week-row');

            for(let j=0; j < 7; j++){
                let dayBlock = document.createElement('td');
                dayBlock.classList.add('day-block');
                if(date.getDay() === j){ // When they are equals set date info
                    let content = document.createElement('div');
                    content.classList.add('day-cell-content');
                    content.innerHTML = date.getDate().toString();
                    dayBlock.setAttribute('day-value', date.getDay().toString());
                    dayBlock.setAttribute('date-value', date.getDate().toString());

                    content.addEventListener('click', function(){
                        this.setCalendarDate(this._date.getFullYear(), this._date.getMonth(), content.parentNode.getAttribute('date-value'));
                    }.bind(this));

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
        for(let i in this._dayOfWeekNames){
            let cell = document.createElement('td');
            cell.innerHTML = this._dayOfWeekNames[i];
            nameRow.appendChild(cell);
        }

        return nameRow;
    }

    setCalendarDate(year, month, date){
        let newDate = new Date(parseInt(year), parseInt(month), parseInt(date));
        this.selectedDate.date = newDate.getDate();
        this.selectedDate.month = newDate.getMonth();
        this.selectedDate.year = newDate.getFullYear();
        let input = this.shadowRoot.getElementById('date-input');
        const fullDate = this.datePadding(date) + '/' + this.datePadding((month + 1)) + '/' + year;
        input.value = fullDate;
        this.value = fullDate;

        this.triggerChange();

        let calendar = this.shadowRoot.getElementById('calendar');
        calendar.blur();
    }

    removeCalendar(){
        let calendar = this.shadowRoot.getElementById('calendar');
        calendar.removeAttribute('tabindex');
        calendar.classList.remove('shown');
    }

    datePadding(el){
        return ('0' + el).slice(-2)
    }

    // Trigger 'change' event on this web component
    triggerChange(){
        const e = document.createEvent('HTMLEvents');
        e.initEvent('change', false, true);
        this.dispatchEvent(e);
    }
}

window.customElements.define('date-picker', DatePicker);