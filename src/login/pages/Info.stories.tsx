import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "info.ftl" });

const meta = {
    title: "login/info.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AccountVerified: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "success",
                    summary: "Your Google account is now connected to CivicDataSpace."
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
