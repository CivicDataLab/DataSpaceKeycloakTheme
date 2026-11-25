import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-reset-password.ftl" });

const meta = {
    title: "login/login-reset-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    loginWithEmailAllowed: true,
                    registrationEmailAsUsername: true
                }
            }}
        />
    )
};

/** Email carried from Sign In (or a prior attempt) via auth.attemptedUsername. */
export const PrefillEmail: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    loginWithEmailAllowed: true,
                    registrationEmailAsUsername: true
                },
                auth: {
                    attemptedUsername: "you@example.com"
                }
            }}
        />
    )
};

/** Keycloak empty-field copy mapped to “Email is required.” when loginWithEmailAllowed. */
export const ServerPleaseSpecifyUsername: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                realm: {
                    loginWithEmailAllowed: true,
                    registrationEmailAsUsername: true
                },
                messagesPerField: {
                    existsError: (fieldName: string) => fieldName === "username",
                    get: (fieldName: string) =>
                        fieldName === "username" ? "Please specify username." : undefined
                }
            }}
        />
    )
};
