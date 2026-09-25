import { useState } from "react";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import type { JSX } from "keycloakify/tools/JSX";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

type IdpReviewUserProfileProps = PageProps<Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: UserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function IdpReviewUserProfile(props: IdpReviewUserProfileProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, messagesPerField } = kcContext;
    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            headerNode={
                <>
                    <h1 className="h1">Create your CivicDataSpace account</h1>
                    <p className="auth-subtitle">
                        Your Google account is ready.
                        <br />
                        Create your CivicDataSpace account.
                    </p>
                </>
            }
        >
            <div id="kc-idp-review-profile">
                <form id="kc-idp-review-profile-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                    <UserProfileFormFields
                        kcContext={kcContext}
                        i18n={i18n}
                        onIsFormSubmittableValueChange={setIsFormSubmittable}
                        kcClsx={kcClsx}
                        doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                        AfterField={({ attribute }) =>
                            attribute.name === "email" ? (
                                <>
                                    <span className="civic-verified-badge">
                                        <IconCheck size={14} stroke={2.25} aria-hidden />
                                        Verified
                                    </span>
                                    <a className="civic-forgot-link" href={url.loginRestartFlowUrl}>
                                        Use a different Google account
                                    </a>
                                </>
                            ) : null
                        }
                    />
                    <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                        <input
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            type="submit"
                            value="Create account"
                            disabled={!isFormSubmittable}
                        />
                    </div>
                </form>
                <a className="subtle-link back-home" href={url.loginUrl}>
                    <IconArrowLeft size={14} stroke={1.75} aria-hidden />
                    Back to Sign in
                </a>
            </div>
        </Template>
    );
}
