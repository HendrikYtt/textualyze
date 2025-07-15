//REMOTION STUFF BELOW
export const fpsConst = 30;

export const calculateFrame = (timeInSeconds: number) =>  {
    return Math.round(timeInSeconds * fpsConst);
};

export const transformString = (input: string, uppercase: boolean, removeSymbols: boolean) => {
    let transformedText = input;
    if (uppercase) {
        transformedText = transformedText.toUpperCase();
    }
    if (removeSymbols) {
        transformedText = transformedText.replace(/[.,!;?:]/g, '');
    }
    return transformedText;
}
