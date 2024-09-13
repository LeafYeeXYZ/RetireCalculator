export type RetirementParams = {
  gender: 'male' | 'female'
  role: 'worker' | 'cadre' // 仅女性需要，男性可以为 'worker' 或 'cadre'
  birthDate: Date
}

export type RetirementResult = {
  retirementYear: number
  retirementMonth: number
  retirementAgeYear: number
  retirementAgeMonth: number
  delayYears: number
  delayMonths: number
}

/**
 * 计算退休年龄
 * @param {RetirementParams} params - 计算退休年龄所需的参数
 * @returns {RetirementResult} - 退休年龄的结果
 * @author GPT-4o & LeafYeeXYZ
 */
export function calculator({ gender, role, birthDate }: RetirementParams): RetirementResult {
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth() + 1;
  let retirementYear: number = 0;
  let retirementMonth: number = 0;
  let delayMonths: number = 0;
  let delayYears: number = 0;
  let retirementAgeYear: number = 0;
  let retirementAgeMonth: number = 0;

  // 改革开始日期
  const reformYear = 2025;
  const monthsPerYear = 12;

  if (gender === 'male') {
    // 男性从60岁开始延迟退休，到63岁，延迟幅度为每4个月延迟1个月
    const baseRetirementAge = 60;
    const finalRetirementAge = 63;
    const monthsDelayPerPeriod = 1;
    const delayIntervalMonths = 4;
    const initialDelayStartYear = 2025;

    // 计算初始退休年龄
    const initialRetirementYear = birthYear + baseRetirementAge;
    let totalMonthsDelayed = 0;

    // 如果初始退休年龄在改革后
    if (initialRetirementYear >= initialDelayStartYear) {
      const monthsSinceReform = (initialRetirementYear - initialDelayStartYear) * monthsPerYear + birthMonth;
      totalMonthsDelayed = Math.ceil(monthsSinceReform / delayIntervalMonths) * monthsDelayPerPeriod;
      const maxDelayMonths = (finalRetirementAge - baseRetirementAge) * monthsPerYear;
      totalMonthsDelayed = Math.min(totalMonthsDelayed, maxDelayMonths);
    }

    // 计算最终退休时间
    retirementYear = initialRetirementYear + Math.floor(totalMonthsDelayed / monthsPerYear);
    retirementMonth = birthMonth + (totalMonthsDelayed % monthsPerYear);

    if (retirementMonth > monthsPerYear) {
      retirementMonth -= monthsPerYear;
      retirementYear += 1;
    }

    delayYears = Math.floor(totalMonthsDelayed / monthsPerYear);
    delayMonths = totalMonthsDelayed % monthsPerYear;
    retirementAgeYear = baseRetirementAge + delayYears;
    retirementAgeMonth = delayMonths;
  } else if (gender === 'female') {
    // 女性的退休年龄根据角色不同有所差异
    let baseRetirementAge: number;
    let finalRetirementAge: number;
    let delayIntervalMonths: number;
    let monthsDelayPerPeriod: number;

    if (role === 'worker') {
      baseRetirementAge = 50;
      finalRetirementAge = 55;
      monthsDelayPerPeriod = 1;
      delayIntervalMonths = 2;
    } else {
      baseRetirementAge = 55;
      finalRetirementAge = 58;
      monthsDelayPerPeriod = 1;
      delayIntervalMonths = 4;
    }

    const initialRetirementYear = birthYear + baseRetirementAge;
    let totalMonthsDelayed = 0;

    if (initialRetirementYear >= reformYear) {
      const monthsSinceReform = (initialRetirementYear - reformYear) * monthsPerYear + birthMonth;
      totalMonthsDelayed = Math.ceil(monthsSinceReform / delayIntervalMonths) * monthsDelayPerPeriod;
      const maxDelayMonths = (finalRetirementAge - baseRetirementAge) * monthsPerYear;
      totalMonthsDelayed = Math.min(totalMonthsDelayed, maxDelayMonths);
    }

    retirementYear = initialRetirementYear + Math.floor(totalMonthsDelayed / monthsPerYear);
    retirementMonth = birthMonth + (totalMonthsDelayed % monthsPerYear);

    if (retirementMonth > monthsPerYear) {
      retirementMonth -= monthsPerYear;
      retirementYear += 1;
    }

    delayYears = Math.floor(totalMonthsDelayed / monthsPerYear);
    delayMonths = totalMonthsDelayed % monthsPerYear;
    retirementAgeYear = baseRetirementAge + delayYears;
    retirementAgeMonth = delayMonths;
  }

  return {
    retirementAgeYear,
    retirementAgeMonth,
    retirementYear,
    retirementMonth,
    delayYears,
    delayMonths,
  };
}