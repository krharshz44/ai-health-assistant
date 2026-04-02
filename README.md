Here’s a **clean, professional, hackathon-winning README** that clearly explains your idea, improves structure, and boosts impact 👇

---

# 🚀 HostelMed — AI Health Assistant for Students

An AI-powered health assistant designed specifically for **hostel students** to quickly assess symptoms, get basic remedies, and understand urgency — all in seconds.

> 🧠 Built using **React + Vite**, **Node.js + Express**, and **OpenAI API**

---

## 💡 Problem Statement

Hostel students often face health issues like:

* Fever, cold, stomach infections
* Food poisoning from mess food
* Delayed medical attention due to confusion or negligence

⚠️ **Challenges:**

* No immediate doctor access
* Lack of medical awareness
* Ignoring early symptoms

---

## ✅ Solution — HostelMed

HostelMed acts as a **24/7 AI health companion** that:

* 🩺 Analyzes symptoms instantly
* 🚦 Classifies urgency (Low / Medium / High)
* 💊 Suggests basic remedies
* 🏥 Recommends when to seek medical help

---

## 🌟 Key Features

### 🤖 AI Symptom Analyzer

* Input symptoms in natural language
* AI returns structured medical insights

### 🚨 Urgency Detection

* 🟢 Low — Home care enough
* 🟡 Medium — Monitor condition
* 🔴 High — Immediate medical attention

### 💡 Smart Recommendations

* Basic remedies
* Precautions
* Next steps

### 🎯 Hostel-Focused Intelligence

* Mess food-related issues
* Seasonal illnesses
* Student lifestyle patterns

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js

### AI Integration

* OpenAI API

---

## 📂 Project Structure

```
ai-health-assistant/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        │   ├── ChatBox.jsx
        │   └── MessageBubble.jsx
        └── hooks/
            └── useChat.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd ai-health-assistant
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
OPENAI_API_KEY=your-api-key
PORT=5000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🔄 How It Works

1. User enters symptoms
2. Frontend sends request to backend
3. Backend processes via OpenAI
4. AI returns structured response:

   * Urgency level
   * Possible issue
   * Remedies
5. UI displays formatted health insights

---

## 🧪 Demo Inputs (For Judges)

Try these during your hackathon demo:

* "Fever and headache since morning, 101°F"
* "Loose motions after eating hostel food"
* "Chest pain while breathing deeply"
* "Cold and runny nose"

---

## ⚠️ Error Handling

| Issue                  | Solution                  |
| ---------------------- | ------------------------- |
| Invalid API key        | Check `.env` file         |
| Backend not connecting | Ensure backend is running |
| Blank screen           | Check browser console     |
| Port conflict          | Change port in `.env`     |

---

## 🚀 Future Enhancements

* 📱 Mobile app version
* 🏥 Nearby hospital locator
* 📊 Health history tracking
* 🔔 Emergency alert system
* 🤖 Voice-based assistant

---

## 🏆 Why This Project Wins Hackathons

* ✅ Solves a **real student problem**
* ✅ **AI-powered + impactful**
* ✅ Clean UX with meaningful output
* ✅ Scalable to colleges & institutions
* ✅ B2B + B2C potential

---

## 📌 Tagline

> “Your hostel’s personal AI doctor — anytime, anywhere.”

---
