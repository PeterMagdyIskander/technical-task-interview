export function validateDate(dateFrom,dateTo){
    let dFrom = new Date(dateFrom);
    let dTo = new Date(dateTo);
    let dToday=new Date();
    //date to cant be less than or equal date from, and date from cant be less than the date of today
    
    if(dTo.getTime()<=dFrom.getTime()&&dFrom.getTime()<dToday){
        return false
    }
    return true;
}