"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const Utils = require("./utils");
class Counter {
    constructor(path) {
        this.path = path;
    }
    updateRecentField(date, up) {
        let newDate = new Date(date).getTime();
        let allPromise = [];
        let dateToday = new Date(Date.now());
        dateToday.setUTCHours(0);
        dateToday.setUTCMilliseconds(0);
        dateToday.setUTCMinutes(0);
        dateToday.setUTCSeconds(0);
        const dateTodayTimestamp = dateToday.getTime();
        while (dateTodayTimestamp >= newDate) {
            allPromise.push(admin.database().ref(`${this.path}/${Utils.transformTimestampToDate(newDate)}/ToDate`).transaction(current => {
                return Utils.getCount(current, up);
            }));
            newDate += 24 * 3600 * 1000;
        }
        return Promise.all(allPromise);
    }
    update(date, up) {
        if (date !== null) {
            return this.updateRecentField(date, up)
                .then(() => {
                return admin.database().ref(`${this.path}/${date}/ThisDay`).transaction(current => {
                    return Utils.getCount(current, up);
                });
            });
        }
        else
            return admin.database().ref(`${this.path}`).transaction(current => {
                return Utils.getCount(current, up);
            });
    }
}
exports.Counter = Counter;
