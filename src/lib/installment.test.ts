import { describe, expect, it } from "vitest";
import { calcInstallment, formatMonthly, formatTotal, type Term } from "./installment";

const cases: [Term, number, string, string][] = [
  [3, 0, "168.20", "504.6"],
  [3, 100, "129.54", "488.6"],
  [3, 200, "90.87", "472.6"],
  [3, 300, "52.20", "456.6"],
  [3, 400, "13.54", "440.6"],
  [6, 0, "94.25", "565.5"],
  [6, 100, "72.59", "535.5"],
  [12, 0, "54.02", "648.15"],
  [12, 100, "41.60", "599.15"],
];

describe("calcInstallment for a $435 product", () => {
  for (const [m, down, monthly, total] of cases) {
    it(`${m} oy, $${down} down → ${monthly}/oy, total ${total}`, () => {
      const r = calcInstallment(435, m, down);
      if (r.mode !== "installment") throw new Error("expected installment");
      expect(formatMonthly(r.monthly)).toBe(monthly);
      expect(formatTotal(r.total)).toBe(total);
    });
  }

  it("down payment >= price switches to cash mode", () => {
    expect(calcInstallment(435, 3, 435).mode).toBe("cash");
    expect(calcInstallment(435, 6, 900).mode).toBe("cash");
  });

  it("negative down is clamped to 0", () => {
    const r = calcInstallment(435, 3, -50);
    expect(r.down).toBe(0);
  });
});
