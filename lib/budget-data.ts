export const budgetArticles = [
  {
    title: "Finance Minister Unveils ₹45 Lakh Crore Union Budget 2026",
    content: "The Finance Minister today presented a massive ₹45 lakh crore Union Budget for 2026, focusing heavily on digital infrastructure and middle-class tax relief. A significant highlight was the 15% increase in capital expenditure directed towards building AI-ready data centers and expanding the semiconductor manufacturing grid across Tier-2 cities."
  },
  {
    title: "Startups Rejoice as Angel Tax is Officially Abolished",
    content: "In a landmark move hailed by the Indian startup ecosystem, the government has completely abolished the controversial 'Angel Tax'. Tech entrepreneurs and venture capitalists expect this to trigger an immediate $2 Billion influx of seed investments over the next 3 quarters, particularly in early-stage DeepTech and SaaS startups."
  },
  {
    title: "Auto Sector Disappointed by Silence on EV Subsidy Extension",
    content: "While the tech sector celebrated, the automotive industry was left wanting. The Finance Minister made no mention of extending the FAME-III subsidies for electric two-wheelers. Shares of major EV manufacturers like Ola Electric and Ather dipped by 4% immediately following the speech, as analysts predict a short-term slow down in EV adoption."
  },
  {
    title: "New AI Regulation Framework Announced",
    content: "The budget speech also introduced the framework for the 'Digital India AI Act', aiming to set safety standards for generative AI development. While it promises clarity, some industry leaders worry that strict compliance requirements might slow down domestic LLM innovation compared to global competitors."
  },
  {
    title: "Markets Hit Record Highs Despite Capital Gains Tweaks",
    content: "Despite a minor 2% hike in Long Term Capital Gains (LTCG) tax, the Dalal Street indices hit absolute record highs. The BSE Sensex rallied by over 1,200 points, largely driven by the massive infrastructure push and the complete absence of new populist freebies, signaling strong fiscal discipline."
  },
  {
    title: "Retail Inflation Relief Measures Fall Short for Common Man",
    content: "Opposition leaders have criticized the budget, noting that while corporate taxes saw relief, basic consumer inflation measures were largely ignored. Food inflation remains hovering around 6%, and the slight adjustment in income tax slabs may not be enough to offset the rising cost of everyday living for lower-income households."
  }
];

export const combinedBudgetContext = budgetArticles.map((a, i) => `--- SOURCE ${i + 1}: ${a.title} ---\n${a.content}`).join('\n\n');
