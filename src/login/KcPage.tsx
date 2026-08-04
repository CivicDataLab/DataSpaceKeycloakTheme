import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Suspense, lazy } from "react";
import type { KcContext } from "./KcContext";
import "./assets/civic-theme.css";
import CustomTemplate from "./components/CustomTemplate";
import { useI18n } from "./i18n";

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={(templateProps) => (
                                    <CustomTemplate 
                                        kcContext={kcContext}
                                        socialProvidersNode={templateProps.socialProvidersNode}
                                        infoNode={templateProps.infoNode}
                                    >
                                        {templateProps.children}
                                    </CustomTemplate>
                                )}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                }
            })()}
        </Suspense>
    );
}

const classes = {
    kcLoginClass: "login-pf-page",
    kcFormGroupClass: "form-group",
    kcLabelClass: "control-label",
    kcInputClass: "form-control",
    kcButtonClass: "btn",
    kcButtonPrimaryClass: "btn-primary",
    kcButtonDefaultClass: "btn-default",
    kcButtonLargeClass: "btn-large",
} satisfies { [key in ClassKey]?: string };
