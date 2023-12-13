import ageDisplay from "@/utils/ageDisplay";

describe("ageDisplay", () => {
  describe("get a number that represent month and return a string that say how old cat is", () => {
    describe("when cat is younger then 12 months", () => {
      it("return 'month' ih cat age is 1", () => {
        const month = 1;
        const result = ageDisplay(month);
        expect(result).toBe("1 month");
      });

      it("return 'months' ih cat age bigger than 1 and smaller than 12", () => {
        const month = 9;
        const result = ageDisplay(month);
        expect(result).toBe("9 months");
      });
    });

    describe("when cat is older then 12 months", () => {
      it("return 'year' ih cat age is 12", () => {
        const month = 12;
        const result = ageDisplay(month);
        expect(result).toBe("1 year");
      });

      it("return 'year and month' ih cat age is 13 ", () => {
        const month = 13;
        const result = ageDisplay(month);
        expect(result).toBe("1 year and 1 month");
      });

      it("return 'year and months' ih cat age is between 13 and 24 ", () => {
        const month = 16;
        const result = ageDisplay(month);
        expect(result).toBe("1 year and 4 months");
      });

      it("return 'years' ih cat age is bigger than 24", () => {
        const month = 25;
        const result = ageDisplay(month);
        expect(result).toBe("2 years and 1 month");
      });
    });
  });
});