interface TimePlural {
  one: string;
  other: string;
}

const ageDisplay = (month: number) => {
  const getPlural = (number: number, word: TimePlural) => {
    return (number === 1 && word.one) || word.other;
  };

  const months = { one: "month", other: "months" },
    years = { one: "year", other: "years" },
    m = month % 12,
    y = Math.floor(month / 12),
    result = [];

  y && result.push(y + " " + getPlural(y, years));
  m && result.push(m + " " + getPlural(m, months));
  return result.join(" and ");
};

export default ageDisplay;