import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "error.ftl" });

const meta = {
    title: "login/error.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GoogleSignInFailed: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary: "Unexpected error when authenticating with identity provider"
                }
            }}
        />
    )
};

export const AccountCreationFailed: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary: "Could not create user"
                }
            }}
        />
    )
};

export const InvalidRedirectUri: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary: "Invalid parameter: redirect_uri"
                }
            }}
        />
    )
};

export const UnknownClient: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary: "Client not found."
                }
            }}
        />
    )
};

export const IdentityAlreadyLinked: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "error",
                    summary:
                        "Federated identity returned by google is already linked to the current user."
                }
            }}
        />
    )
};
