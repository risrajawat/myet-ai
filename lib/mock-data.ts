import { combinedBudgetContext } from './budget-data';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  urlToImage: string;
  tags: string[];
  content: string; // The full text we'll simulate feeding to the Agents
}

export const mockArticles: NewsArticle[] = [
  {
    id: "budget-1",
    title: "Union Budget 2026: The Complete ET Analysis",
    summary: "Interact with our AI Deep Briefing synthesizing 6 live ET coverage reports on the Finance Minister's ₹45 Lakh Crore budget, tax cuts, and market reactions.",
    source: "MyET AI Deep Synthesis",
    publishedAt: new Date().toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000",
    tags: ["Economy", "Finance", "Stock Market", "Deep Dive"],
    content: combinedBudgetContext
  },
  {
    id: "tech-1",
    title: "OpenAI Announces Next-Gen Reasoning Models for Enterprise",
    summary: "The AI giant unveils a new suite of models optimized for multi-step reasoning, aiming to automate complex corporate workflows.",
    source: "The Economic Times",
    publishedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    tags: ["Artifical Intelligence", "Startups", "Technology"],
    content: `In a major shift toward enterprise automation, OpenAI has announced its next generation of "Reasoning Models" designed specifically to handle complex, multi-step workflows. Unlike previous iterations that focused primarily on conversational capabilities and generation, these new models are structured to act as autonomous agentic systems.\n\nThe models reportedly use an internal "thought process" before outputting an answer, allowing them to verify their own logic, browse corporate databases securely, and execute sequential tasks. OpenAI claims this reduces hallucination rates by over 40% in structured data tasks.\n\nMajor Fortune 500 companies have already signed on for early access, signaling a rapid shift in how corporate IT departments view LLM integration. Analysts predict this could disrupt the Robotic Process Automation (RPA) market significantly over the next two years.`
  },
  {
    id: "finance-1",
    title: "Sensex Hits Record High on Easing Inflation Data",
    summary: "Indian stock markets rally to unprecedented levels as new data shows consumer inflation dropping faster than anticipated.",
    source: "Mint",
    publishedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
    tags: ["Stock Market", "Economy", "Finance"],
    content: `The BSE Sensex surged past the crucial 75,000 mark for the first time in history today, driven by a wave of optimistic buying following the release of the latest retail inflation data. The Consumer Price Index (CPI) inflation eased to a 14-month low of 4.2%, bringing widespread hope for eventual rate cuts by the Reserve Bank of India.\n\nBanking and auto sectors led the rally, with major players seeing stock jumps of 3-5% in early trading. Foreign Institutional Investors (FIIs) also turned net buyers, injecting over ₹2,500 crore into the market in a single session.\n\nMarket experts suggest that if the RBI signals a dovish stance in its upcoming monetary policy committee meeting, the current bull run could sustain through the quarter. However, some caution remains regarding global macroeconomic headwinds and rising crude oil prices.`
  },
  {
    id: "startup-1",
    title: "Indian EV Battery Startup Secures $50M Series B Funding",
    summary: "Bengaluru-based VoltCore raises significant capital to scale domestic production of solid-state batteries.",
    source: "TechCrunch",
    publishedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000",
    tags: ["Startups", "Technology", "Economy"],
    content: `VoltCore, a Bengaluru-based electric vehicle (EV) battery startup, announced today that it has raised $50 million in a Series B funding round led by global venture capital firm Sequoia and joined by several strategic automotive investors.\n\nThe startup specializes in proprietary solid-state battery technology, which promises higher energy density and significantly reduced fire risks compared to traditional lithium-ion cells. With this fresh injection of capital, VoltCore plans to transition from pilot manufacturing to mass production within the next 18 months.\n\n"India's EV transition is bottlenecked by battery dependency," said the CEO of VoltCore. "Our mission is to build highly durable, locally manufactured cells that can withstand Indian climatic conditions while offering 30% more range." The company is currently in late-stage talks with two major Indian two-wheeler manufacturers for integration testing.`
  },
  {
    id: "global-1",
    title: "Global Supply Chains Brace for Copper Shortages",
    summary: "A looming deficit in refined copper threatens to delay aggressive renewable energy and data center expansion plans.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1582298651811-042a983b6319?auto=format&fit=crop&q=80&w=1000",
    tags: ["Economy", "Global", "Technology"],
    content: `The global push towards electrification and the rapid expansion of AI data centers are creating an unprecedented demand for copper. However, industry analysts are warning of a severe supply shortage emerging by the end of the year.\n\nMining output has struggled to keep pace due to declining ore grades, water scarcity in key mining regions like Chile, and delayed approvals for new projects. Copper, an essential component for power grids, electric vehicles, and server racks, could see price volatility that cascades through the tech and energy sectors.\n\nSeveral major tech companies are reportedly stockpiling copper reserves. "The mismatch between the political ambition for green energy and the geophysics of mining is becoming painfully obvious," noted a senior commodities analyst. Without a breakthrough in extraction efficiency or widespread substitution, the shortage could artificially inflate the costs of green infrastructure.`
  },
  {
    id: "ai-2",
    title: "Healthcare Tech Giant Integrates Generative AI for Diagnostics",
    summary: "Apollo Tech announces a groundbreaking partnership with Google to deploy AI models specifically trained on patient radiograph data.",
    source: "The Economic Times",
    publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000",
    tags: ["Artifical Intelligence", "Technology", "Global"],
    content: `Apollo Tech has revealed a multi-million dollar partnership with Google to deploy highly specialized Generative AI models across its hospital network. These models are exclusively trained to assist radiologists in detecting early-stage anomalies in X-rays and MRI scans.\n\nPreliminary tests show the AI reduces diagnostic time by nearly 40% while maintaining an accuracy rate that rivals senior consultants. The system acts as a "second pair of eyes," prioritizing high-risk scans for immediate human review.\n\nCritics highlight the urgent need for strict data privacy guardrails. However, the move establishes a new baseline for how machine learning can be practically implemented to alleviate the immense pressure on legacy healthcare systems globally.`
  },
  {
    id: "fintech-1",
    title: "Fintech Unicorn 'PayBharat' Files for ₹8,000 Crore IPO",
    summary: "One of India's largest digital payments startups prepares for a blockbuster public listing amidst massive retail hype.",
    source: "Reuters",
    publishedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1616077168079-7e09a1a3f14e?auto=format&fit=crop&q=80&w=1000",
    tags: ["Startups", "Stock Market", "Economy"],
    content: `Digital payments giant PayBharat has officially filed its Draft Red Herring Prospectus (DRHP) with SEBI, aiming to raise ₹8,000 crore in one of the most anticipated IPOs of the year. The company plans to use the proceeds to expand its merchant lending portfolio and acquire strategic deep-tech assets.\n\nThe filing detailed impressive metrics, showing a 140% year-on-year revenue growth and dramatically reduced customer acquisition costs. Market enthusiasts compare the excitement to previous legendary tech listings, though institutional investors warn of aggressive valuations.\n\nIf successful, this IPO could trigger a flurry of public market listings from other late-stage Indian startups that have stayed private during the recent funding winter.`
  },
  {
    id: "cyber-1",
    title: "Major Cloud Provider Hit by Sophisticated Cybersecurity Breach",
    summary: "Global latency issues and disrupted pipelines plague enterprise clients following a complex ransomware attack on European servers.",
    source: "Wired",
    publishedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    tags: ["Technology", "Global"],
    content: `Thousands of enterprise clients woke up to extensive latency issues and broken deployment pipelines today after a major cloud hosting provider detected a sophisticated ransomware breach originating in their European data centers.\n\nThe cyberattack bypassed traditional firewall perimeters using a novel "zero-day" exploit targeting Kubernetes administration panels. While the host provider claims no raw customer data was exfiltrated, entirely localized server farms were forced offline in an emergency quarantine measure.\n\nThis incident has reignited global conversations regarding the massive systemic risk of relying on a highly centralized web infrastructure. Cybersecurity stocks rallied slightly on the news as corporations scramble to audit their digital defense boundaries.`
  },
  {
    id: "semi-1",
    title: "India Allocates $10 Billion Subsidy for Semiconductor Fab",
    summary: "A colossal government push aims to position India alongside Taiwan as a global powerhouse in chip manufacturing.",
    source: "Financial Express",
    publishedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000",
    tags: ["Economy", "Technology", "Global"],
    content: `In a bid to achieve total silicon sovereignty, the Indian government has formally approved a groundbreaking $10 billion subsidy framework for setting up domestic semiconductor fabrication plants. Three global tech consortiums have already submitted detailed proposals.\n\nThe initiative is designed to drastically reduce the nation's reliance on imported microchips, which power everything from smartphones to highly advanced AI servers. By absorbing nearly 50% of the capital expenditure for approved fabs, the government hopes to attract leading global silicon experts.\n\nWhile highly ambitious, analysts caution that fab construction requires extreme precision, massive investments in clean water infrastructure, and a highly specialized workforce—challenges that take years, not months, to overcome.`
  },
  {
    id: "ai-3",
    title: "Regulators Propose Strict Guidelines on Generative AI Copyright",
    summary: "A global coalition of lawmakers aims to standardize how AI companies compensate original content creators.",
    source: "The Verge",
    publishedAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=1000",
    tags: ["Artifical Intelligence", "Global"],
    content: `A new whitepaper published by an international coalition of lawmakers promises a severe shake-up for the Generative AI industry. The proposed guidelines insist that AI models must implement an automated licensing layer that cryptographically tracks and compensates the original creators of any text, image, or video used in its training subset.\n\nHistorically, foundational models have scraped the public internet unconditionally under subjective "fair use" doctrines. This new framework effectively classifies AI output as derivative works, demanding immense structural changes to how AI labs pipeline their data streams.\n\nOpen-source advocates warn this could monopolize the AI landscape, as only mega-corporations with billion-dollar legal funds could afford the licensing fees. Conversely, publishing houses and independent creators are largely championing the motion as a critical digital rights victory.`
  }
];
