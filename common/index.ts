import * as fs from 'fs';

export function getFileLines(path: string): string[] {
    const allFileContents = fs.readFileSync(path, 'utf-8');
    allFileContents.split(/\r?\n/).forEach(line => console.log)
    return allFileContents.split(/\r?\n/)
}