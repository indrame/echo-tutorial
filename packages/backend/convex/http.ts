import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { createClerkClient } from "@clerk/backend";
import type { WebhookEvent } from "@clerk/backend";
import { internal } from "./_generated/api";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
});

const http = httpRouter();

http.route({
    path: "/clerk-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const event = await validateRequest(request);

        if(!event) {
            return new Response("Invalid webhook", { status: 400 });
        }

        switch(event.type) {
            case "subscription.updated": {
                const subscripton = event.data as {
                    status: string;
                    payer?: {
                        organization_id: string;
                    }
                }

                const organizationId = subscripton.payer?.organization_id;
                if(!organizationId) {
                    return new Response("No organization ID", { status: 400 });
                }

                await clerkClient.organizations.updateOrganization(organizationId, {
                    maxAllowedMemberships: subscripton.status === "active" ? 5 : 1
                });

                await ctx.runMutation(internal.system.subscriptions.upsert, {
                    organizationId,
                    status: subscripton.status
                })

                break;
            } default: {
                console.log(`Unhandled Clerk webhook event type: ${event.type}`);
            }
        }

        return new Response(null, { status: 200 });
    })
})

async function validateRequest(req: Request): Promise<WebhookEvent | null> {
    const payloadString = await req.text();
    const svixHeaders = {
        "svix-id": req.headers.get("svix-id") || "",
        "svix-timestamp": req.headers.get("svix-timestamp") || "",
        "svix-signature": req.headers.get("svix-signature") || "",
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
    try {
        const evt = wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
        return evt;
    } catch (err) {
        console.error("Failed to verify Clerk webhook:", err);
        return null;
    }
}

export default http;

