const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const GenerateTopicsAIModel = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Learn Python :: As you are coaching teacher \n- User wants to learn about the topic\n    - Generate 5-7 Course titles for study (Short)\n    - Make sure it is related to the description\n    - Output will be ARRAY of String in JSON FORMAT only\n    - Do not add any plain text in output." },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
                        "course_titles": [
                            "Python Basics : A Gentle Intro",
                            "Python Fundamentals: Data & Control",
                            "Python Programming: Functions & Modules",
                            "Object-Oriented Python: Classes",
                            "Python Data Handling: Files & APIs",
                            "Intermediate Python: Libraries",
                            "Python Project: Build Your First App"
                        ]
                }` },
            ],
        },
    ],
});

export const GenerateCourseAiModel = model.startChat({
    generationConfig,
    history: [
    ],
});