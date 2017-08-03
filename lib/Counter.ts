import * as admin from 'firebase-admin';
import * as Utils from './utils';

export class Counter {
    path: string;

    constructor(path: string){
        this.path = path;
    }

    private updateRecentField(date: string, up: boolean): Promise<any> {
        let newDate: number = new Date(date).getTime();
        let allPromise: Promise<any>[] = [];
        let dateToday = new Date(Date.now());
        dateToday.setUTCHours(0);
        dateToday.setUTCMilliseconds(0);
        dateToday.setUTCMinutes(0);
        dateToday.setUTCSeconds(0);
        const dateTodayTimestamp: number = dateToday.getTime();
        while(dateTodayTimestamp >= newDate){
            allPromise.push(admin.database().ref(`${this.path}/${Utils.transformTimestampToDate(newDate)}/ToDate`).transaction(current => {
                return Utils.getCount(current, up);
            }));
            newDate += 24 * 3600 * 1000;
        }
        return Promise.all(allPromise);
    }

    public update(date: string | null, up: boolean): Promise<any>{
        if(date !== null) {
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