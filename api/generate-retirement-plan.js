import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    currentAge,
    retirementAge,
    currentPortfolio,
    annualExpenses,
    expectedReturn,
    inflationRate,
    lifeExpectancy,
    additionalNotes = "none"
  } = req.body;

  const prompt = `You are an expert retirement financial planner. Create a detailed, realistic early retirement plan (FIRE-style analysis).

User details:
- Current age: ${currentAge}
- Desired retirement age: ${retirementAge}
- Current portfolio: $${currentPortfolio}
- Annual expenses in retirement: $${annualExpenses}
- Expected portfolio return: ${expectedReturn}%
- Expected inflation: ${inflationRate}%
- Planning to age: ${lifeExpectancy}
- Additional notes: ${additionalNotes}

Include in sections with clear headings:
1. Retirement Feasibility Snapshot
2. Safe Withdrawal Rate & Portfolio Longevity
3. Required Nest Egg Calculation
4. Savings & Growth Timeline
5. Inflation & Sequence of Returns Risk
6. Healthcare & Long-Term Care Considerations
7. 12-Month Action Plan

Be encouraging but realistic. Use bullet points​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
