import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FieldErrorIcon from "../components/FieldErrorIcon";

export default function LoginResetPassword(
    props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg } = i18n;
    const useEmail = realm.loginWithEmailAllowed;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username")}
            headerNode={
                <>
                    <h1 className="h1">Reset your password</h1>
                    <p className="auth-subtitle">
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
                </>
            }
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                        {useEmail ? "Email" : msg("username")}{" "}
                        <span className="required" aria-hidden="true">
                            *
                        </span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={kcClsx("kcInputClass")}
                        autoFocus
                        autoComplete="email"
                        defaultValue={auth.attemptedUsername ?? ""}
                        placeholder={useEmail ? "you@example.org" : undefined}
                        aria-invalid={messagesPerField.existsError("username")}
                    />
                    {messagesPerField.existsError("username") && (
                        <span
                            id="input-error-username"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                        >
                            <FieldErrorIcon />
                            <span
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        </span>
                    )}
                </div>
                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                    <input
                        className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        type="submit"
                        value="Send Reset Link"
                    />
                </div>
            </form>
            <div id="kc-registration">
                <a href={url.loginUrl}>Back to Sign In</a>
            </div>
        </Template>
    );
}
