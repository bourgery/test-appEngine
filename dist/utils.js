"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function transformTimestampToDate(time) {
    let dateString = '';
    let date = new Date(time);
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    dateString += date.getUTCFullYear() + "-";
    if ((date.getUTCMonth() + 1) / 10 < 1)
        dateString += '0' + (date.getUTCMonth() + 1) + "-";
    else
        dateString += (date.getUTCMonth() + 1) + "-";
    if ((date.getUTCDate()) / 10 < 1)
        dateString += '0' + date.getUTCDate();
    else
        dateString += date.getUTCDate();
    return dateString;
}
exports.transformTimestampToDate = transformTimestampToDate;
function getCount(current, up) {
    if (up)
        return (current || 0) + 1;
    else
        return (current || 0) - 1;
}
exports.getCount = getCount;
