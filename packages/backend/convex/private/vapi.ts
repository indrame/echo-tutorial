import { VapiClient, Vapi } from "@vapi-ai/server-sdk";
import { internal } from "../_generated/api"
import { action } from "../_generated/server";
import { getSecretValue, parseSecretString } from "../lib/secrets";
import { ConvexError } from "convex/values";

export const getAssistants = action({
    args: {},
    handler: async (ctx): Promise<Vapi.Assistant[]> => {
        const identity = await ctx.auth.getUserIdentity();
        if(identity === null) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "User is not authenticated"
            }); 
        }

        const orgId = identity.orgId as string;
        if(!orgId) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Organization not found"
            }); 
        }

        const plugin = await ctx.runQuery(internal.system.plugins.getByOrganizationIdAndService, {
            organizationId: orgId,
            service: "vapi"
        });

        if(!plugin) {
            throw new ConvexError({
                code: "NOT_FOUND",
                message: "Vapi plugin not configured for this organization"
            });
        }   

        const secretName = plugin.secretName;
        const secretValue = await getSecretValue(secretName);
        const secretData = parseSecretString<{ privateApiKey: string, publicApiKey: string;}>(secretValue);

        if(!secretData ) {
            throw new ConvexError({
                code: "INTERNAL",
                message: "Failed to parse Vapi secret data"
            });
        }

        if(!secretData.privateApiKey || !secretData.publicApiKey) {
            throw new ConvexError({
                code: "INTERNAL",
                message: "Vapi secret data is incomplete"
            });
        }

        const vapiClient = new VapiClient({
            token: secretData.privateApiKey,
        });

        const assistants = await vapiClient.assistants.list();

        return assistants;        
    }
})

export const getPhoneNumbers = action({
    args: {},
    handler: async (ctx): Promise<Vapi.ListPhoneNumbersResponseItem[]> => {
        const identity = await ctx.auth.getUserIdentity();
        if(identity === null) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "User is not authenticated"
            }); 
        }

        const orgId = identity.orgId as string;
        if(!orgId) {
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Organization not found"
            }); 
        }

        const plugin = await ctx.runQuery(internal.system.plugins.getByOrganizationIdAndService, {
            organizationId: orgId,
            service: "vapi"
        });

        if(!plugin) {
            throw new ConvexError({
                code: "NOT_FOUND",
                message: "Vapi plugin not configured for this organization"
            });
        }   

        const secretName = plugin.secretName;
        const secretValue = await getSecretValue(secretName);
        const secretData = parseSecretString<{ privateApiKey: string, publicApiKey: string;}>(secretValue);

        if(!secretData ) {
            throw new ConvexError({
                code: "INTERNAL",
                message: "Failed to parse Vapi secret data"
            });
        }

        if(!secretData.privateApiKey || !secretData.publicApiKey) {
            throw new ConvexError({
                code: "INTERNAL",
                message: "Vapi secret data is incomplete"
            });
        }

        const vapiClient = new VapiClient({
            token: secretData.privateApiKey,
        });

        const phoneNumbers = await vapiClient.phoneNumbers.list();

        return phoneNumbers;        
    }
})
