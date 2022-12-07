import * as common from '../common/index'

class Dir {
    name: string;
    size: number = 0;
    children: Dir[] = [];
    parent: Dir | null;

    constructor(name: string, parent: Dir | null) {
        this.name = name;
        this.parent = parent;
    }
}

let knownDirs: Dir[] = [];
let currDir: Dir;

function challenge1() {
    currDir = new Dir('/', null);
    knownDirs.push(currDir);

    const lines = common.getFileLines('input.txt');
    lines.forEach(line => {
        if (line.includes('$ cd')) handleCd(line.split(' ')[2]);
        else if (line.includes('$ ls')) return;
        else handleLsLine(line);
    });

    // knownDirs.forEach(d => console.log(`${d.name} = ${d.size}`))
    setActualDirSize();
    // knownDirs.forEach(d => console.log(`${d.name} = ${d.size}`))
    printResult();
}

function handleCd(name: string) {
    switch (name) {
        case '..':
            if (currDir.parent) currDir = currDir.parent!;
            break;
        case '/':
            currDir = knownDirs.filter(d => d.name == name)[0]
            break;
        default:
            if (!knownDirs.map(d => d.name).includes(name)) {
                currDir.children.push(new Dir(name, currDir));
                currDir = currDir.children.filter(d => d.name == name)[0];
                knownDirs.push(currDir);
            }
    }
}

function handleLsLine(line: string) {
    if (line.includes('dir')) return;
    currDir.size += parseInt(line.split(' ')[0]);
}

function setActualDirSize() {
    let addedDirNames: string[] = [];
    knownDirs.filter(d => d.children.length == 0).forEach(d => {
        let parent = d.parent;
        while (parent && !addedDirNames.includes(parent.name)) {
            parent.children.forEach(c => parent!.size += c.size);
            addedDirNames.push(parent!.name)
            parent = parent!.parent;
        }
    })
}

function printResult() {
    let result = 0;
    knownDirs.forEach(d => d.size <= 100000 ? result += d.size : null);
    console.log(result);
}

function challenge2() {
    const lines = common.getFileLines('test.txt');
    lines.forEach(line => { });
}

challenge1();
// challenge2();