import * as common from '../common/index'

let last4: string[] = [];

function challenge1() {
    const line = common.getFileLines('test.txt')[0];
    let chars = [...line];
    // last4 = chars.slice(0,2);
    // chars = chars.slice(2);
    for (const {c, i} of chars.map((c,i) => ({c,i}))) {
        if (check(c)) {
            console.log(i);
            break;
        };
        // console.log(c, last4)
    }
}

function check(char: string): boolean {
    if (last4.length == 4) {
        let different = true;
        for (let i = 0; i < 3; i++) {
            if (last4[i] == last4[3]) return false;
        }
        last4 = last4.slice(-1)
        last4.push(char)
        console.log(last4)
        return different;
    } else {
        last4.push(char);
        return false;
    }
}

function challenge2() {
    const line = common.getFileLines('test.txt')[0];
}

challenge1();
// challenge2();