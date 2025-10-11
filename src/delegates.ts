export type FindLastCharDelegate = (text: string, char: string) => number;

export const anonymousMethod: FindLastCharDelegate = function (text, char) {
    return text.lastIndexOf(char);
};

export const lambdaExpression: FindLastCharDelegate = (text, char) => text.lastIndexOf(char);