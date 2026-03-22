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
    id: "tech-1",
    title: "OpenAI Announces Next-Gen Reasoning Models for Enterprise",
    summary: "The AI giant unveils a new suite of models optimized for multi-step reasoning, aiming to automate complex corporate workflows.",
    source: "The Economic Times",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    tags: ["AI", "Startups", "Tech"],
    content: `In a major shift toward enterprise automation, OpenAI has announced its next generation of "Reasoning Models" designed specifically to handle complex, multi-step workflows. Unlike previous iterations that focused primarily on conversational capabilities and generation, these new models are structured to act as autonomous agentic systems.

The models reportedly use an internal "thought process" before outputting an answer, allowing them to verify their own logic, browse corporate databases securely, and execute sequential tasks. OpenAI claims this reduces hallucination rates by over 40% in structured data tasks.

Major Fortune 500 companies have already signed on for early access, signaling a rapid shift in how corporate IT departments view LLM integration. Analysts predict this could disrupt the Robotic Process Automation (RPA) market significantly over the next two years.`
  },
  {
    id: "finance-1",
    title: "Sensex Hits Record High on Easing Inflation Data",
    summary: "Indian stock markets rally to unprecedented levels as new data shows consumer inflation dropping faster than anticipated.",
    source: "Mint",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
    tags: ["Stocks", "Economy", "Finance"],
    content: `The BSE Sensex surged past the crucial 75,000 mark for the first time in history today, driven by a wave of optimistic buying following the release of the latest retail inflation data. The Consumer Price Index (CPI) inflation eased to a 14-month low of 4.2%, bringing widespread hope for eventual rate cuts by the Reserve Bank of India.

Banking and auto sectors led the rally, with major players seeing stock jumps of 3-5% in early trading. Foreign Institutional Investors (FIIs) also turned net buyers, injecting over ₹2,500 crore into the market in a single session.

Market experts suggest that if the RBI signals a dovish stance in its upcoming monetary policy committee meeting, the current bull run could sustain through the quarter. However, some caution remains regarding global macroeconomic headwinds and rising crude oil prices.`
  },
  {
    id: "startup-1",
    title: "Indian EV Battery Startup Secures $50M Series B Funding",
    summary: "Bengaluru-based VoltCore raises significant capital to scale domestic production of solid-state batteries.",
    source: "TechCrunch",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000",
    tags: ["Startups", "EV", "Green Tech"],
    content: `VoltCore, a Bengaluru-based electric vehicle (EV) battery startup, announced today that it has raised $50 million in a Series B funding round led by global venture capital firm Sequoia and joined by several strategic automotive investors.

The startup specializes in proprietary solid-state battery technology, which promises higher energy density and significantly reduced fire risks compared to traditional lithium-ion cells. With this fresh injection of capital, VoltCore plans to transition from pilot manufacturing to mass production within the next 18 months.

"India's EV transition is bottlenecked by battery dependency," said the CEO of VoltCore. "Our mission is to build highly durable, locally manufactured cells that can withstand Indian climatic conditions while offering 30% more range." The company is currently in late-stage talks with two major Indian two-wheeler manufacturers for integration testing.`
  },
  {
    id: "economy-1",
    title: "Global Supply Chains Brace for Copper Shortages",
    summary: "A looming deficit in refined copper threatens to delay aggressive renewable energy and data center expansion plans.",
    source: "Bloomberg",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    urlToImage: "https://images.unsplash.com/photo-1582298651811-042a983b6319?auto=format&fit=crop&q=80&w=1000",
    tags: ["Economy", "Commodities", "Global"],
    content: `The global push towards electrification and the rapid expansion of AI data centers are creating an unprecedented demand for copper. However, industry analysts are warning of a severe supply shortage emerging by the end of the year.

Mining output has struggled to keep pace due to declining ore grades, water scarcity in key mining regions like Chile, and delayed approvals for new projects. Copper, an essential component for power grids, electric vehicles, and server racks, could see price volatility that cascades through the tech and energy sectors.

Several major tech companies are reportedly stockpiling copper reserves. "The mismatch between the political ambition for green energy and the geophysics of mining is becoming painfully obvious," noted a senior commodities analyst. Without a breakthrough in extraction efficiency or widespread substitution, the shortage could artificially inflate the costs of green infrastructure.`
  }
];
