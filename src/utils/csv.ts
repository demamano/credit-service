import fs from 'node:fs';
import { json2csv } from 'json-2-csv';

export function toCSV(userData: any) {
    const rnad_name = new Date().getTime();
    const filename = `${rnad_name}-companyEmployee.csv`;
    const path = __dirname + '/' + filename;

    const csv = json2csv(userData);
    fs.writeFile(filename, csv, function (err: any) {
        if (err) throw new Error('error occured while csv file creting');
        console.log('file created');
    });
    return { path, csv };
}
