import { query, mutation } from "./_generated/server";

export const getMany = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        return users;
    },
})

export const add = mutation ({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(identity === null) {
            throw new Error("Unauthorized");
        }
        
        const orgId = identity.orgId as string;
        if(!orgId) {
            throw new Error("Organization ID is required to add a user");
        }

        throw new Error("Testing an error");

        const userId = await ctx.db.insert("users", {
            name: "Indra"
        });

        return userId;
    }
    
})