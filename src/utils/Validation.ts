export const isEmail = (email: string) => {
    email = email && email.trim();
    let mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,10})+$/;
    if (email && email.match(mailformat)) {
        return true;
    } else {
        return false;
    }
};

function chunkString(str: string, length: number) {
    return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

export const commaSeperator = (inpText: string | number) => {
    let rawText = String(inpText)
    try {
        const indexOfNeg = rawText.indexOf('-');
        rawText = rawText.replace('-', '');
        const text = String(rawText);
        let arr = text.split('.');
        let integerStr = arr[0];
        let decimalStr = text.indexOf('.') > 0 ? '.' : '';
        if (arr[1]) {
            decimalStr += arr[1];
        }
        const mob = integerStr.length % 3;
        const head = mob > 0 ? integerStr.substring(0, mob) : '';
        const rest = integerStr.substring(mob);
        let body = '';
        if (rest) {
            const chunked = chunkString(rest, 3);
            if (chunked) {
                body = chunked.join(',');
            }
        }
        const result = head + `${mob > 0 && rest ? ',' : ''}` + body + decimalStr;

        return indexOfNeg !== -1 ? `-${result}` : result;
    } catch (e) {
        return rawText;
    }
};

export const numberFormatter = (num: number) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
};
