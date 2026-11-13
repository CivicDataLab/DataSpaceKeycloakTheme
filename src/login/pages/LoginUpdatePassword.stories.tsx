import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-update-password.ftl" });

const meta = {
    title: "login/login-update-password.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                message: {
                    type: "info",
                    summary: "You need to change your password."
                },
                passwordPolicies: {
                    length: 8,
                    upperCase: 1,
                    digits: 1
                }
            }}
        />
    )
};

export const WithPasswordError: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                passwordPolicies: {
                    length: 8,
                    upperCase: 1,
                    digits: 1
                },
                messagesPerField: {
                    existsError: (fieldName: string, ...otherFieldNames: string[]) =>
                        [fieldName, ...otherFieldNames].includes("password"),
                    get: (fieldName: string) => (fieldName === "password" ? "Invalid password: minimum length 8." : "")
                }
            }}
        />
    )
};

export const WithAppInitiatedAction: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                isAppInitiatedAction: true,
                passwordPolicies: {
                    length: 8,
                    upperCase: 1,
                    digits: 1
                }
            }}
        />
    )
};
