import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import path from "path";
import readlineSync from "readline-sync";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

if (!process.env.GOOGLE_API_KEY) {
  console.error("❌ GOOGLE_API_KEY not found in .env file");
  process.exit(1);
}

const BASE_DIR = path.join(process.cwd(), "projects");

/* ============================= */
/* Utility Functions */
/* ============================= */

async function initializeBaseDirectory() {
  await fs.mkdir(BASE_DIR, { recursive: true });
}

async function createDirectory(directoryPath) {
  const fullPath = path.join(BASE_DIR, directoryPath);
  await fs.mkdir(fullPath, { recursive: true });
  console.log(`📁 Created: ${directoryPath}`);
}

async function writeFile(filePath, content) {
  const fullPath = path.join(BASE_DIR, filePath);
  const dir = path.dirname(fullPath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(fullPath, content, "utf-8");
  console.log(`📝 Written: ${filePath}`);
}

/* ============================= */
/* Planning Mode */
/* ============================= */

async function generateProjectPlan(userPrompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
Create a structured JSON plan for this website:

"${userPrompt}"

Return ONLY valid JSON in this format:

{
  "projectName": "string",
  "folders": ["folder1", "folder2"],
  "files": [
    { "path": "filePath", "description": "what it contains" }
  ]
}
`
          }
        ]
      }
    ]
  });

  try {
    const text = result.text.trim();
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const cleanJSON = text.slice(jsonStart, jsonEnd);
    return JSON.parse(cleanJSON);
  } catch (error) {
    console.error("❌ Failed to parse project plan.");
    return null;
  }
}

/* ============================= */
/* File Generation */
/* ============================= */

async function generateFileContent(filePath, description, userPrompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
User Request: ${userPrompt}

Create production-ready code.

File: ${filePath}
Purpose: ${description}

Rules:
- Clean, modern code
- Responsive design
- Proper comments
- No explanations
- Only raw code output
`
          }
        ]
      }
    ]
  });

  return result.text;
}

/* ============================= */
/* Website Builder */
/* ============================= */

async function buildWebsite(userPrompt) {
  console.log("🧠 Generating project plan...\n");

  const plan = await generateProjectPlan(userPrompt);

  if (!plan) {
    console.log("❌ Failed to generate project plan.");
    return;
  }

  console.log("📦 Project Name:", plan.projectName);

  // Create main project folder
  await createDirectory(plan.projectName);

  // Create subfolders
  if (plan.folders && plan.folders.length > 0) {
    for (const folder of plan.folders) {
      await createDirectory(`${plan.projectName}/${folder}`);
    }
  }

  // Generate files
  for (const file of plan.files) {
    console.log(`⚡ Generating: ${file.path}`);

    const content = await generateFileContent(
      file.path,
      file.description,
      userPrompt
    );

    await writeFile(`${plan.projectName}/${file.path}`, content);
  }

  console.log("\n✅ Website created successfully!");
  console.log(`📂 Location: ${BASE_DIR}/${plan.projectName}\n`);
}

/* ============================= */
/* Main CLI */
/* ============================= */

async function main() {
  console.log("🚀 AI Website Builder (Planning Mode)");
  console.log("=======================================");
  console.log(`📂 Projects Folder: ${BASE_DIR}`);
  console.log('Type "exit" to quit.\n');

  await initializeBaseDirectory();

  while (true) {
    const input = readlineSync.question(
      "💬 What website would you like to build? "
    );

    if (input.toLowerCase() === "exit") {
      console.log("👋 Goodbye!");
      break;
    }

    if (!input.trim()) continue;

    console.log("\n⚡ AI processing...\n");

    try {
      await buildWebsite(input);
    } catch (error) {
      console.error("❌ Error:", error.message);
    }
  }
}

main();