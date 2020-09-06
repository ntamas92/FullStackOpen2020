export const isString = (text: any): text is string => {
  return text && typeof text === 'string' || text instanceof String;
}

export const isDate = (date: any): date is Date => {
  return isString(date) && Boolean(Date.parse(date));
};

export const parseDate = (date: any): Date => {
  if (!isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


export const parseEnum = <T>(enumeration: { [key: string]: any }, value: any) : T => {
  if(!Object.values(enumeration).includes(value))
    throw new Error("value provided does not correspond to the specified enum parameter")

  return value as T
}