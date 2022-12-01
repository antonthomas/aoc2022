import fs from 'fs';

function main() {
    let calories: number[] = [];
    let currentCalories: number = 0;

    const allFileContents = fs.readFileSync('input.txt', 'utf-8');
    allFileContents.split(/\r?\n/).forEach((line: string) => {
        if (line === '') {
            calories.push(currentCalories);
            currentCalories = 0;
        } else {
            const value = parseInt(line);
            currentCalories += value;
        }
    });

    calories.sort((c1, c2) => c2 - c1);

    console.log('The anwser is', getSumOfTopX(calories, 3));
}

function getSumOfTopX(calories: number[], x: number = 1) {
    calories.splice(x)
    return calories.reduce((prev, curr) => prev + curr, 0)
}

main();