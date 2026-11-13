import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" });

const meta = {
    title: "login/info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RequiredAction: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messageHeader: "",
                requiredActions: ["UPDATE_PASSWORD"],
                actionUri: "https://example.com/required-action",
                message: {
                    type: "info",
                    summary: "Perform the following action(s)"
                }
            }}
        />
    )
};

export const EmailAlreadyVerified: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                messageHeader: "",
                actionUri: "",
                message: {
                    type: "info",
                    summary: "Your email address has been verified already."
                }
            }}
        />
    )
};

export const AccountCreated: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "success",
                    summary: "Your CivicDataSpace account is ready."
                }
            }}
        />
    )
};

export const CheckYourEmail: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "success",
                    summary: "You should receive an email shortly with further instructions."
                }
            }}
        />
    )
};
