import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "login-idp-link-email.ftl" });

const meta = {
    title: "login/login-idp-link-email.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Existing account + Continue with Google: Keycloak asks the user to confirm the link by email */
export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                idpAlias: "google",
                brokerContext: {
                    username: "john.doe@example.com"
                },
                realm: {
                    displayName: "CivicDataSpace"
                }
            }}
        />
    )
};
