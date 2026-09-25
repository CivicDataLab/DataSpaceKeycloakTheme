import type { ClassKey } from "keycloakify/login";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Suspense, lazy, type ReactNode } from "react";
import type { KcContext } from "./KcContext";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import "@fontsource/jetbrains-mono/700.css";
import "./assets/civic-theme.css";
import CustomTemplate from "./components/CustomTemplate";
import { useI18n } from "./i18n";

const Login = lazy(() => import("./pages/Login"));
const Error = lazy(() => import("./pages/Error"));
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"));
const LoginIdpLinkConfirmOverride = lazy(() => import("./pages/LoginIdpLinkConfirmOverride"));
const Info = lazy(() => import("./pages/Info"));
const SignedIn = lazy(() => import("./pages/SignedIn"));
const IdpReviewUserProfile = lazy(() => import("./pages/IdpReviewUserProfile"));
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"));
const Register = lazy(() => import("./pages/Register"));
const UserProfileFormFields = lazy(() => import("./UserProfileFormFields"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    const Template = (templateProps: {
        children?: ReactNode;
        displayMessage?: boolean;
        socialProvidersNode?: ReactNode;
        infoNode?: ReactNode;
        headerNode?: ReactNode;
    }) => (
        <CustomTemplate
            kcContext={kcContext}
            displayMessage={templateProps.displayMessage}
            socialProvidersNode={templateProps.socialProvidersNode}
            infoNode={templateProps.infoNode}
            headerNode={templateProps.headerNode}
        >
            {templateProps.children}
        </CustomTemplate>
    );

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "login.ftl":
                        return (
                            <Login
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "error.ftl":
                        return (
                            <Error
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-idp-link-confirm.ftl":
                        return (
                            <LoginIdpLinkConfirm
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "login-idp-link-confirm-override.ftl":
                        return (
                            <LoginIdpLinkConfirmOverride
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "info.ftl":
                        return (
                            <Info
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "signed-in.ftl":
                        return (
                            <SignedIn
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "idp-review-user-profile.ftl":
                        return (
                            <IdpReviewUserProfile
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={false}
                            />
                        );
                    case "login-reset-password.ftl":
                        return (
                            <LoginResetPassword
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                            />
                        );
                    case "register.ftl":
                        return (
                            <Register
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );
                    default:
                        return (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
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
    // NOTE: The Keycloak default also carries a "required" class, which our label
    // asterisk rules force to `color: inherit`, turning error messages black.
    kcInputErrorMessageClass: "civic-field-error",
    kcButtonClass: "btn",
    kcButtonPrimaryClass: "btn-primary",
    kcButtonDefaultClass: "btn-default",
    kcButtonLargeClass: "btn-large",
} satisfies { [key in ClassKey]?: string };
