import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "logout-confirm.ftl" });

const meta = {
    title: "login/logout-confirm.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default: "Do you want to log out?" + Logout button only */
export const Default: Story = {
    render: () => <KcPageStory />
};

/** With "Back to application" link visible */
export const WithBackToApplication: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                url: {
                    logoutConfirmAction: "/mock-logout-action"
                },
                client: {
                    baseUrl: "/mock-client-url"
                },
                logoutConfirm: {
                    code: "mock-session-code",
                    skipLink: false
                }
            }}
        />
    )
};

/** Session-over style warning message + logout confirm */
export const WithSessionMessage: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                url: {
                    logoutConfirmAction: "/mock-logout-action"
                },
                client: {
                    baseUrl: "/mock-client-url"
                },
                logoutConfirm: {
                    code: "mock-session-code",
                    skipLink: false
                },
                message: {
                    summary: "Your session has expired. Do you want to log out?",
                    type: "warning"
                }
            }}
        />
    )
};
