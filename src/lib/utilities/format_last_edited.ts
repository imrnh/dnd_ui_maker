export default function format_last_edited(letd: Date) {
    let now = new Date();
    var old = new Date(letd);
    var unit = "min";
    var diff = parseInt((now - old) / (1000 * 60));

    let time_difference_count = 0;
    if (diff < 1440) { //less than 1 day
        if (diff < 60) { //less than an hour
            var min_count = diff; //already in mins
            unit = min_count > 1 ? "mins" : "min";
            time_difference_count = min_count;
        } else {
            var hr_count = parseInt(diff / 60);
            unit = hr_count > 1 ? "hrs" : "hr";
            time_difference_count = hr_count;
        }
    } else {
        var days_count = parseInt(diff / 1440); //converting to days
        unit = days_count > 1 ? "days" : "day";
        time_difference_count = days_count;
    }
    return `${time_difference_count} ${unit}`;
}