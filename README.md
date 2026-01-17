# Brand Response Hub (SocialOps)

An internal marketing ops application designed to solve the growing social-response problem for brands through AI-powered automation and intelligent workflow management.

---

## 🚨 Problem We Need to Solve

Our current social response process is breaking down:

| Challenge | Description |
|-----------|-------------|
| **Capacity** | Two social media coordinators, only 4 hours/day each |
| **Consistency** | Response quality varies depending on who's on shift |
| **Leakage** | Response rate is only ~67% — comments fall through the cracks |
| **Scalability** | We can't keep up during product launches or crises |
| **Data** | No system to track recurring complaints or issues |
| **Visibility** | No structured reporting for marketing or engineering |

---

## 👥 Stakeholders & Their Needs

- **Marketing Director**: Wants a consistent brand voice and faster turnaround
- **Customer Support Team**: Wants clean, structured integration with support tickets
- **Social Coordinators**: Want relief from comment overload and a clear approval workflow

---

## 🎯 Core Solution Architecture

The app utilizes three coordinated agents to manage the workflow:

### 1. Web Scraper Agent
- Scrapes comments, mentions, replies, and DMs from all integrated social platforms
- Deduplicates, timestamps, and categorizes data by platform and post
- Pushes raw data into the analysis pipeline

### 2. Sentiment & Classification Agent
- **Analysis**: Detects sentiment (positive, neutral, negative) and intent (praise, complaint, bug report, product question, shipping issue, abuse/spam, etc.)
- **Tracking**: Tracks recurring issues by topic in real-time
- **Escalation Logic**: Maintains a real-time counter; if 3+ negative comments refer to the same issue, it triggers an automatic escalation

### 3. Response Generator + Ticketing Agent
- **Positive Comments**: Automatically drafts friendly, on-brand responses for quick coordinator approval
- **Negative Comments**: Identifies root issues and drafts on-brand responses requiring coordinator review before posting
- **Recurring Issues**: Automatically generates engineering support tickets when the 3+ threshold is met, with examples and suggested coordinated response

---

## 🛠 App Requirements & Features

### Coordinator Dashboard
- Queue of comments with auto-generated responses ready for one-click approval
- Filters: platform, sentiment, category, escalation status
- Real-time status tracking and comment management

### Brand-Voice Guardrails
- Ensures all AI-generated drafts match the Marketing Director's approved tone
- Consistent messaging across all platforms and coordinators

### Fail-Safe Rules
- **Nothing auto-posts** without coordinator review
- Escalations require internal approval before sending
- Full audit trail of all actions

### Analytics Reporting
| Metric | Description |
|--------|-------------|
| Response Rate | Target: >90% (up from 67%) |
| Avg. Response Time | Track time-to-respond across shifts |
| Sentiment Shifts | Monitor brand perception trends |
| Top Recurring Issues | Surface product problems automatically |
| Escalation Frequency | Track critical issue patterns |
| Coordinator Performance | Measure individual productivity |

---

## 🚀 Overall Goal

Build a system that:

✅ Delivers consistent, on-brand responses  
✅ Increases response rate above 90%  
✅ Prevents comments from falling through the cracks  
✅ Automatically surfaces real product issues to engineering  
✅ Reduces coordinator workload (not adds to it)  
✅ Gives marketing leadership actionable insight  

---

## 🔌 Integrations

- **Social APIs**: Instagram, TikTok, X (Twitter), YouTube, Facebook, and more
- **Ticketing Systems**: Push tickets to engineering or support systems
- **Analytics**: Export data for marketing and product teams

---

## 🛠 Tech Stack

This project is built with:

- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [React](https://reactjs.org/) - UI component library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable component library
- [Recharts](https://recharts.org/) - Composable charting library

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📄 License

This project is proprietary software for internal use.
