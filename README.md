🚀 AI Website Builder (Planning Mode)

An AI-powered CLI tool that generates complete, production-ready frontend websites using Google Gemini.

This project implements structured AI task decomposition, automatic folder creation, and multi-file orchestration using a planning-based execution system.

✨ Features

🧠 AI Project Planning (JSON-based structured plan)

📁 Automatic folder & file generation

📝 Multi-file production-ready code generation

🎯 Responsive and modern frontend output

🔐 Secure environment variable handling

⚡ CLI-based interactive workflow

🏗 How It Works

User provides a website prompt

Gemini generates a structured JSON project plan

The system:

Creates folders

Generates files one-by-one

Writes production-ready code

Website is saved inside the /projects directory

This follows an AI agent-style orchestration pattern.

🛠 Tech Stack

Node.js

Google Gemini API (@google/genai)

dotenv

readline-sync

fs/promises (File System API)

📂 Project Structure

ai-website-builder/
│
├── package.json
├── script.js
├── .env (not committed)
├── .gitignore
└── projects/
    └── (Generated websites here)

⚙️ Setup Instructions
1️⃣ Clone Repository

git clone https://github.com/YOUR_USERNAME/ai-website-builder.git

cd ai-website-builder

2️⃣ Install Dependencies

npm install

3️⃣ Add Your Gemini API Key

Create a .env file in the root directory and add:

GOOGLE_API_KEY=your_api_key_here

You can generate your API key from Google AI Studio.

4️⃣ Run the Application

npm start

Then enter a prompt like:

Build a responsive portfolio website

Your generated website will appear inside:

/projects/

📌 Example Output

projects/
└── portfolio/
    ├── index.html
    ├── styles.css
    └── script.js

🧠 Architecture Concept

This project demonstrates:

AI Task Decomposition

Structured Planning via JSON

Deterministic File Generation

Agent-style Execution Pattern

Multi-step AI Orchestration

It shows how LLMs can be used to build real-world autonomous developer tools.

🔐 Security

.env is excluded using .gitignore

API keys are never committed

Generated project folders are ignored

Safe local development workflow

🚀 Future Improvements

Edit existing project mode

Auto-preview development server

Deployment integration (Vercel / Netlify)

Token usage & cost estimation

Plugin-based architecture

Web-based UI instead of CLI

👨‍💻 Author

Built as an AI-powered developer tooling experiment focused on autonomous code generation.

📜 License

ISC License
