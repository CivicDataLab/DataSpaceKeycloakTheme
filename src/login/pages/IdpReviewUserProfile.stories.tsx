import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "idp-review-user-profile.ftl" });

const meta = {
    title: "login/idp-review-user-profile.ftl",
    component: KcPageStory
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <KcPageStory
            kcContext={{
                profile: {
                    attributesByName: {
                        username: { validators: {}, annotations: { inputType: "hidden" } },
                        firstName: { validators: {}, annotations: { inputType: "hidden" } },
                        lastName: { validators: {}, annotations: { inputType: "hidden" } },
                        email: {
                            value: "jordan.rivera@gmail.com",
                            readOnly: true,
                            validators: {},
                            annotations: {}
                        },
                        password: { validators: {}, annotations: { inputType: "hidden" } },
                        "password-confirm": { validators: {}, annotations: { inputType: "hidden" } }
                    }
                }
            }}
        />
    )
};
