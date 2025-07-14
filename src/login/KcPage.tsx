import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "keycloakify/login/Template";
import CivicLogo from "./components/CivicLogo";
import "./assets/civic-theme.css";
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
                                Template={(props) => (
                                    <>
                                        <div id="kc-header" className="civic-header">
                                            <div className="civic-header-content">
                                                <CivicLogo />
                                            </div>
                                        </div>
                                        <Template {...props} />
                                    </>
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
    kcLoginClass: "civic-login",
    kcFormGroupClass: "civic-form-group",
    kcLabelClass: "civic-label",
    kcInputClass: "civic-input",
    kcButtonClass: "civic-button",
    kcButtonPrimaryClass: "civic-button-primary",
    kcButtonDefaultClass: "civic-button-default",
    kcButtonLargeClass: "civic-button-large",
    kcFeedbackErrorIcon: "civic-feedback-error-icon",
    kcFeedbackWarningIcon: "civic-feedback-warning-icon",
    kcFeedbackSuccessIcon: "civic-feedback-success-icon",
    kcFeedbackInfoIcon: "civic-feedback-info-icon",
} satisfies { [key in ClassKey]?: string };
