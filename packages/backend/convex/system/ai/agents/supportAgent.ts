import { google } from "@ai-sdk/google";
import { Agent } from "@convex-dev/agent";
import { components } from "../../../_generated/api";
import { escalateConversation } from "../tools/escalateConversation";
import { resolveConversation } from "../tools/resolveConversation";

export const supportAgent = new Agent(components.agent, {
    name: "Support Agent",
    chat: google.chat("gemini-2.5-flash"),
    instructions: `You are a customer support agent. Use "resolveConversation" tool when user expresses finalization of the conversation. Use "escalateConversation" tool when user expresses frustation, or request human explicitly.`,
    // tools: {
    //     resolveConversation,
    //     escalateConversation,
    // },
});