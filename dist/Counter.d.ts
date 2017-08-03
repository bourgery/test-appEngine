export declare class Counter {
    path: string;
    constructor(path: string);
    private updateRecentField(date, up);
    update(date: string | null, up: boolean): Promise<any>;
}
