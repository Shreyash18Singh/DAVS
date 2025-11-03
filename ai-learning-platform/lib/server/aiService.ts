import axios from 'axios';
import { NextApiRequest } from 'next';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'text-bison-001';

async function callGemini(prompt: string) {
  if (!GEMINI_API_KEY) {
    return `Demo response: ${prompt}`;
  }
  const url = `https://generativelanguage.googleapis.com/v1beta2/models/${GEMINI_MODEL}:generateText?key=${GEMINI_API_KEY}`;
  const body = {
    prompt: { text: prompt },
    temperature: 0.2,
    maxOutputTokens: 512,
  };
  const resp = await axios.post(url, body, { headers: { 'Content-Type': 'application/json' } });
  const candidates = resp.data?.candidates;
  if (Array.isArray(candidates) && candidates.length > 0) return candidates[0].output;
  return resp.data?.output || '';
}

export async function askGyaanGuru(prompt: string, systemInstruction = 'You are Gyaan Guru — an AI tutor inspired by Sanskrit shlokas, empathetic and concise.') {
  const full = `${systemInstruction}\n\n${prompt}`;
  return callGemini(full);
}

export async function summarizeText(text: string) {
  const prompt = `Summarize the following educational text into a clear, concise conceptual explanation suitable for a student:\n\n${text}`;
  return callGemini(prompt);
}
