class DateUtility {
    static getSeparator(date){
        if(date.match(/\//g).length === 2){
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
                return null;
            }
        }else{
            return null;
        }
    }
}

module.exports = DateUtility;