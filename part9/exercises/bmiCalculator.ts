export const calculateBmi = (weight: number, height: number): string => {
  height = height / 100
  
  const bmi : number = weight / (height * height)

  console.log(bmi)

  if(bmi < 18.5)
    return "underweight";
  
  if(bmi <= 25)
    return "normal weight";

  if(bmi <= 30)
    return "overweight";

  return "fckn overweight";
}

// interface BmiParams {
//   height: number,
//   weight: number
// }

// const parseArguments = (args: Array<string>): BmiParams => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       weight: Number(args[2]),
//       height: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }

// const params = parseArguments(process.argv)

// console.log(calculateBmi(params.weight, params.height))

