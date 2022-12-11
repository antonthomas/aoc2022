import * as common from '../common/index'

interface Monkey {
    items: number[],
    operation: (old: number) => number,
    test: (input: number) => boolean,
    trueMonkey: number,
    falseMonkey: number,
    inspections: number
}

const INITIAL_MONKEY: Monkey = {
    items: [],
    operation: (old: number) => old,
    test: (input: number) => true,
    trueMonkey: -1,
    falseMonkey: -1,
    inspections: 0
};

let monkeys: Monkey[] = [];

function challenge1() {
    readInput();
    simulate();
    // console.log(monkeys.map(m => `Monkey had ${m.inspections} inspections`))
    console.log(monkeys.sort((a, b) => b.inspections - a.inspections).slice(0, 2).reduce((acc, val) => acc * val.inspections, 1))
}

function readInput() {
    let monkey: Monkey = {...INITIAL_MONKEY};
    const lines = common.getFileLines('input.txt');
    lines.forEach(line => {
        if (line.includes('Monkey')) return;
        if (line.includes('Starting items:')) {
            line.split('Starting items: ')[1].split(', ').forEach(i => monkey.items.push(parseInt(i)))
        } else if (line.includes('Operation:')) {
            const operationLine = line.split('Operation: new = old ')[1].split(' ');
            if (operationLine[0] == '*' && operationLine[1] == 'old') {
                monkey.operation = (old: number) => Math.pow(old, 2);
            } else {
                const value = parseInt(operationLine[1]);
                switch (operationLine[0]) {
                    case '+': monkey.operation = (old: number) => old + value; break;
                    case '*': monkey.operation = (old: number) => old * value; break;
                    default: monkey.operation = (old: number) => old; break;
                }
            }
        } else if (line.includes('Test:')) {
            const value = parseInt(line.split(' ')[5])
            monkey.test = (input: number) => input % value == 0;
        } else if (line.includes('If true:')) {
            monkey.trueMonkey = parseInt(line.split(' ')[9])
        } else if (line.includes('If false:')) {
            monkey.falseMonkey = parseInt(line.split(' ')[9]);
            monkeys.push({...monkey});
            monkey = {...INITIAL_MONKEY};
            monkey.items = []
        }
    });
}

function simulate() {
    for (let i = 0; i < 20; i++) {  // 20 rounds
        monkeys.forEach(m => {  // x turns    
            m.inspections += m.items.length;
            m.items.forEach(i => {  // x items
                const value = Math.floor(m.operation(i) / 3);
                const throwToMonkey = m.test(value) ? m.trueMonkey : m.falseMonkey;
                monkeys[throwToMonkey].items.push(value);   
            })
            m.items = [];
        })
    }
}

function challenge2() {
    readInput();
    simulate2();
    console.log(monkeys.map(m => `Monkey had ${m.inspections} inspections`))
    console.log(monkeys.sort((a, b) => b.inspections - a.inspections).slice(0, 2).reduce((acc, val) => acc * val.inspections, 1))
}

function simulate2() {
    for (let i = 0; i < 10000; i++) {  // 10'000 rounds
        monkeys.forEach(m => {  // x turns    
            m.inspections += m.items.length;
            m.items.forEach(i => {  // x items
                // const lcm = 96577;  // Least Common Multiple of test divisions for test.txt
                const lcm = 9699690;  // Least Common Multiple of test divisions for input.txt
                const value = m.operation(i) % lcm;
                const throwToMonkey = m.test(value) ? m.trueMonkey : m.falseMonkey;
                monkeys[throwToMonkey].items.push(value);   
            })
            m.items = [];
        })
    }
}

// challenge1();
challenge2();