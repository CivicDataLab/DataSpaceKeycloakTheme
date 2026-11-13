import { useState, type FormEvent } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import FieldErrorIcon from "../components/FieldErrorIcon";

/** Carries the Sign In email into Reset when the user clicks Forgot password? */
export const RESET_EMAIL_STORAGE_KEY = "civic-dataspace-reset-email";

export default function LoginResetPassword(
    props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, realm, auth, messagesPerField } = kcContext;
    const { msg } = i18n;
    const useEmail = realm.loginWithEmailAllowed;

    const [emailError, setEmailError] = useState<string | undefined>();

    const serverRaw = messagesPerField.existsError("username")
        ? plainMessage(messagesPerField.get("username"))
        : undefined;
    const serverMessage =
        serverRaw !== undefined && useEmail && /please specify username/i.test(serverRaw)
            ? "Email is required."
            : serverRaw;
    const emailMessage = emailError ?? serverMessage;

    const validateReset = (event: FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const username = String(data.get("username") ?? "").trim();
        let nextError: string | undefined;

        if (username === "") {
            nextError = useEmail ? "Email is required." : "Username is required.";
        } else if (realm.registrationEmailAsUsername && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            nextError = "Enter a valid email address.";
        }

        setEmailError(nextError);

        if (nextError !== undefined) {
            event.preventDefault();
            return false;
        }

        return true;
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username") && emailError === undefined}
            headerNode={
                <>
                    <h1 className="h1">Reset your password</h1>
                    <p className="auth-subtitle">
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
                </>
            }
        >
            <form
                id="kc-reset-password-form"
                className={kcClsx("kcFormClass")}
                action={url.loginAction}
                method="post"
                onSubmit={event => {
                    validateReset(event);
                }}
            >
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
                        defaultValue={readPrefillUsername(auth.attemptedUsername)}
                        placeholder={useEmail ? "you@example.org" : undefined}
                        aria-invalid={emailMessage !== undefined}
                        aria-describedby={emailMessage !== undefined ? "input-error-username" : undefined}
                        onChange={() => setEmailError(undefined)}
                    />
                    {emailMessage !== undefined && (
                        <span
                            id="input-error-username"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                        >
                            <FieldErrorIcon />
                            {emailError !== undefined ? (
                                <span>{emailMessage}</span>
                            ) : (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(emailMessage)
                                    }}
                                />
                            )}
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

function readPrefillUsername(attemptedUsername: string | undefined) {
    const fromAuth = attemptedUsername?.trim() ?? "";
    if (fromAuth !== "") {
        return fromAuth;
    }

    try {
        const stored = sessionStorage.getItem(RESET_EMAIL_STORAGE_KEY)?.trim() ?? "";
        sessionStorage.removeItem(RESET_EMAIL_STORAGE_KEY);
        return stored;
    } catch {
        return "";
    }
}

function plainMessage(message: string) {
    return message.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
