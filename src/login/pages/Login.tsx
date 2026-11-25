import { useState, type FormEvent } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import PasswordWrapper from "../components/PasswordWrapper";
import SocialProviderIcon from "../components/SocialProviderIcon";
import FieldErrorIcon from "../components/FieldErrorIcon";
import { CheckYourEmailStatus, isPasswordResetEmail } from "./Info";

/** Must match LoginResetPassword.RESET_EMAIL_STORAGE_KEY */
const RESET_EMAIL_STORAGE_KEY = "civic-dataspace-reset-email";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField, message } = kcContext;


    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [emailError, setEmailError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();

    const serverError = messagesPerField.existsError("username", "password")
        ? plainMessage(messagesPerField.getFirstError("username", "password"))
        : undefined;
    const invalidCredentials = serverError !== undefined && /invalid username or password/i.test(serverError);
    const passwordMessage =
        passwordError ??
        (emailError !== undefined ? undefined : invalidCredentials ? "Email or password is incorrect." : usernameHidden ? serverError : undefined);
    const emailMessage = emailError ?? (invalidCredentials || serverError === undefined ? undefined : serverError);

    const validateLogin = (event: FormEvent<HTMLFormElement>) => {
        const data = new FormData(event.currentTarget);
        const username = String(data.get("username") ?? "").trim();
        const password = String(data.get("password") ?? "");
        let nextEmailError: string | undefined;
        let nextPasswordError: string | undefined;

        if (!usernameHidden) {
            if (username === "") {
                nextEmailError = realm.loginWithEmailAllowed ? "Email is required." : "Username is required.";
            } else if (realm.registrationEmailAsUsername && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
                nextEmailError = "Enter a valid email address.";
            }
        }

        if (password === "") {
            nextPasswordError = "Password is required.";
        }

        setEmailError(nextEmailError);
        setPasswordError(nextPasswordError);

        if (nextEmailError !== undefined || nextPasswordError !== undefined) {
            event.preventDefault();
            setIsLoginButtonDisabled(false);
            return false;
        }

        return true;
    };

    if (isPasswordResetEmail(plainMessage(message?.summary ?? ""))) {
        return (
            <Template
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayMessage={false}
                headerNode={<CheckYourEmailStatus loginUrl={url.loginUrl} />}
            >
                {null}
            </Template>
        );
    }

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={
                <>
                    <h1 className="h1">Welcome back</h1>
                    <p className="auth-subtitle">Sign in to continue to CivicDataSpace.</p>
                </>
            }
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span>
                            Don&apos;t have an account?{" "}
                            <a href={url.registrationUrl}>
                                Create an account
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <div className="kc-social-divider">
                                <span>or</span>
                            </div>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            <span className="kc-social-provider-content">
                                                <span className="kc-social-provider-icon-wrap">
                                                    <SocialProviderIcon providerId={p.providerId} alias={p.alias} />
                                                </span>
                                                <span
                                                    className={kcClsx("kcFormSocialAccountNameClass")}
                                                    dangerouslySetInnerHTML={{
                                                        __html: `Continue with ${kcSanitize(p.displayName)}`
                                                    }}
                                                />
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={event => {
                                if (!validateLogin(event)) {
                                    return;
                                }
                                setIsLoginButtonDisabled(true);
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                        {realm.loginWithEmailAllowed ? "Email" : msg("username")}{" "}
                                        <span className="required" aria-hidden="true">
                                            *
                                        </span>
                                    </label>
                                    <input
                                       
                                        id="username"
                                        className={kcClsx("kcInputClass")}
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus
                                        autoComplete="username"
                                        placeholder={realm.loginWithEmailAllowed ? "you@example.org" : undefined}
                                        aria-invalid={emailMessage !== undefined}
                                        aria-describedby={emailMessage !== undefined ? "input-error-username" : undefined}
                                        onChange={() => setEmailError(undefined)}
                                    />
                                    {emailMessage !== undefined && (
                                        <FieldMessage id="input-error-username" kcClsx={kcClsx} message={emailMessage} />
                                    )}
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                <div className="civic-label-row">
                                    <label htmlFor="password" className={kcClsx("kcLabelClass")}>
                                        Password{" "}
                                        <span className="required" aria-hidden="true">
                                            *
                                        </span>
                                    </label>
                                    {realm.resetPasswordAllowed && (
                                        <a
                                            className="civic-forgot-link"
                                           
                                            href={url.loginResetCredentialsUrl}
                                            onClick={() => {
                                                const value = (
                                                    document.getElementById("username") as HTMLInputElement | null
                                                )?.value.trim() ?? "";
                                                try {
                                                    if (value !== "") {
                                                        sessionStorage.setItem(RESET_EMAIL_STORAGE_KEY, value);
                                                    } else {
                                                        sessionStorage.removeItem(RESET_EMAIL_STORAGE_KEY);
                                                    }
                                                } catch {
                                                    // Private mode / blocked storage — reset page stays empty.
                                                }
                                            }}
                                        >
                                            Forgot password?
                                        </a>
                                    )}
                                </div>
                                <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password">
                                    <input
                                       
                                        id="password"
                                        className={kcClsx("kcInputClass")}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        aria-invalid={passwordMessage !== undefined}
                                        aria-describedby={passwordMessage !== undefined ? "input-error-password" : undefined}
                                        onChange={() => setPasswordError(undefined)}
                                    />
                                </PasswordWrapper>
                                {passwordMessage !== undefined && (
                                    <FieldMessage id="input-error-password" kcClsx={kcClsx} message={passwordMessage} />
                                )}
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                <input
                                   
                                    disabled={isLoginButtonDisabled}
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value="Sign In"
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

function FieldMessage(props: { id: string; message: string; kcClsx: ReturnType<typeof getKcClsx>["kcClsx"] }) {
    const { id, message, kcClsx } = props;

    return (
        <span id={id} className={kcClsx("kcInputErrorMessageClass")} aria-live="polite">
            <FieldErrorIcon />
            <span>{message}</span>
        </span>
    );
}

function plainMessage(message: string) {
    return message.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
