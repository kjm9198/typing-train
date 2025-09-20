import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getRandomText = query(async (ctx) => {
    const texts = await ctx.db.query("texts").collect();
    if (texts.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
});

export const addText = mutation({
    args: { content: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert("texts", { content: args.content });
    },
});

export const seedTexts = mutation({
    handler: async (ctx) => {
        const sampleTexts = [
            "Hello, world!",
            "Convex is awesome.",
            "Seed text example.",
            "Another sample text.",
            "Last sample text."
        ];
        for (const text of sampleTexts) {
            await ctx.db.insert("texts", { content: text });
        }
    },
});