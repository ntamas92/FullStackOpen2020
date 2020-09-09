const isString = (text: any): text is string => {
  return text && typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): date is Date => {
  return isString(date) && Boolean(Date.parse(date));
};

export const parseString = (text: any): string => {
  if (!isString(text))
    throw new Error("string is missing or is not a string");

  return text;
};

export const parseDate = (date: any): Date => {
  if (!isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

export const parseEnum = <T>(enumeration: { [key: string]: any }, value: any): T => {
  if (!Object.values(enumeration).includes(Number(value)))
    throw new Error("value provided does not correspond to the specified enum parameter");

  return value as T;
};

export const parseArray = <T>(arr: any, convertToType:(elem:any) => T ) : T[] => {
  if(!Array.isArray(arr))
    throw new Error("the provided object is not an array.");

  return arr.map(x => convertToType(x));
};

export default { parseString, parseDate, parseEnum };