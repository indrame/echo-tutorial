import { createClerkClient } from "@clerk/backend";
import { v } from "convex/values";
import { action } from "../_generated/server";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY || "sk_test_Rqmcwff2O1brJp9g9qavuXukyTVMCt4MmzADrhg1l8",
});

export const validate = action({
    args: {
        organizationId: v.string(),
    },
    handler: async (ctx, args) => {
        try {
            await clerkClient.organizations.getOrganization({
                organizationId: args.organizationId.toString(),
            });
            return { valid: true };

        } catch {
            return { valid: false, reason: "Organization not found" };
        }
    }
})
