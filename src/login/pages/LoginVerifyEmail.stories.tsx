import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-verify-email.ftl" });

const meta = {
    title: "login/login-verify-email.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default verify-email screen */
export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                user: {
                    email: "john.doe@example.com"
                }
            }}
        />
    )
};

/** Matches the “verify email to activate account” flow from the product */
export const WithVerifyEmailMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                user: {
                    email: "john.doe@example.com"
                },
                message: {
                    type: "warning",
                    summary: "You need to verify your email address to activate your account."
                }
            }}
        />
    )
};
