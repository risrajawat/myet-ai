# 🚀 MyET AI – AI-Native News Experience

### 🏆 ET GenAI Hackathon 2026

**Problem Statement:** AI-Native News Experience

---

## 📖 About the Project

**MyET AI** is an AI-powered platform that transforms how users consume news.
Instead of reading multiple static articles, users get a **personalized, interactive, and intelligent news experience** powered by AI.

The goal is to make news:

* Easier to understand
* Faster to consume
* More engaging and interactive

---

## 🎯 Problem We Are Solving

* News is **generic and one-size-fits-all**
* Users read multiple articles to understand one topic
* No **interaction or personalization**
* Complex topics are hard to understand
* Language barriers for Indian users

---

## 💡 Our Solution

MyET AI uses an **AI-driven multi-step system** to improve news consumption:

1. **Personalized Feed** – News based on user interests
2. **AI Briefings** – Summarized + structured insights
3. **Chat with News** – Ask questions and get explanations
4. **Story Timeline** – Track how news evolves
5. **Video Generation** – Convert news into short explanations
6. **Language Support** – Read news in regional languages

---

## 🤖 AI Architecture (Agent-Based)

We designed the system as modular AI components:

* **News Fetch Agent** – Retrieves articles from APIs
* **Context Aggregation (Lite RAG)** – Combines multiple sources
* **Summarizer Agent** – Generates structured summaries
* **Personalization Agent** – Filters content
* **Chat Agent** – Handles Q&A
* **Timeline Agent** – Builds story flow
* **Translation Agent** – Language support
* **Video Agent** – Generates script-based visuals

---

## 🔄 System Workflow

1. User selects interests
2. System fetches multiple articles
3. Articles are combined (Lite RAG approach)
4. AI processes and generates insights
5. Output includes:

   * Summary
   * Chat
   * Timeline
   * Translated content

---

## 🔥 Current Status (MVP)

✅ UI + core flow built
✅ AI summary working
✅ Chat feature
✅ Timeline generation
🔜 Next:
* Full RAG pipeline
* Video generation

---

## 🛠️ Tech Stack

| Component      | Tech Used                        |
| -------------- | -------------------------------- |
| Frontend       | Next.js, Tailwind CSS            |
| Backend/API    | Next.js API Routes               |
| AI Integration | Groq API                         |
| Data Source    | NewsAPI                          |
| Logic Layer    | Lite RAG (multi-article context) |
| Hosting        | Vercel                           |

---

---

## 📂 Project Structure

```
/app
├── page.tsx                 # Home / dashboard
├── article/[id]/page.tsx    # Article detail page
├── api/
│   └── chat/route.ts        # Chat API

/lib
├── agents/
│   ├── index.ts             # Agent entry
│   ├── ai.ts                # AI logic
│   ├── xai.ts               # Explainability / reasoning
│   ├── mock-data.ts         # Mock data
│   └── utils.ts             # Helper functions

/public                      # Static assets

# Config files
.env.local
next.config.ts
package.json
tsconfig.json

```

---

## 📌 Roadmap

* [x] Build UI + News Feed
* [x] AI Summary Integration
* [x] Chat with News
* [x] Timeline Feature
* [x] Language Support
* [ ] Video Generation
* [ ] Full RAG Pipeline (Future)

---

## 🎯 Why MyET AI Stands Out

* **Agent-based system design (not just chatbot)**
* **Combines multiple articles for better understanding**
* **Interactive + personalized news experience**
* **Scalable to enterprise-level AI system**

---

## 🚀 How to Run Locally

### 1️⃣ Clone Repo

```bash
git clone https://github.com/risrajawat/myet-ai.git
cd myet-ai
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

Create `.env.local`:

```bash
GROQ_API_KEY=your_key
```

### 4️⃣ Run Project

```bash
npm run dev
```

---

## 👨‍💻 Developer

Built by **Rishabh Singh**
(ET GenAI Hackathon Participant)

---
