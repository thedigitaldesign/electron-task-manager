const monthNamesArray = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

class DateUtility {
    static getSeparator(date){
        if(!date){
            return null;
        }else if(date.match(/\//g).length === 2){
            return '/';
        }else if(date.match(/\-/g).length === 2){
            return '-';
        }else{
            return null;
        }
    }

    // Validate date format and value
    // format: set the format to the returned date
    static validate(date){
        const separator = this.getSeparator(date);
        if(separator){
            const dateSplit = date.split(separator);
            if(dateSplit[0].length === 2 && dateSplit[1].length === 2 && dateSplit[2].length === 4 ||
                dateSplit[0].length === 4 && dateSplit[1].length === 2 && dateSplit[2].length === 2) {
                return true
            }else{
                console.log(dateSplit);
                return false;
            }
        }else{
            return false;
        }
    }

    static setFormat(dateString, format){
        if(!this.validate(dateString)){
            return '';
        }else{
            let date = dateString;
            const separator = this.getSeparator(date);
            switch(format){
                case 'dd Month yyyy':
                    date = dateString.split(separator);

                    date = date[0] + ' ' + monthNamesArray[parseInt(date[1])] + ' ' + date[2];
                    break;
            }

            return date;
        }
    }
}

module.exports = DateUtility;