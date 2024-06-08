export function getRoundedValue(n: number, places: number) : number
{
    return Math.round(n * Math.pow(10, places)) / Math.pow(10, places);
}