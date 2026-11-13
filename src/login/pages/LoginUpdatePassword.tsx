import { useState, type FormEvent } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import PasswordWrapper from "../components/PasswordWrapper";
import PasswordRequirements, { getPasswordRules } from "../components/PasswordRequirements";
import FieldErrorIcon from "../components/FieldErrorIcon";

export default function LoginUpdatePassword(
    props: PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url, messagesPerField, isAppInitiatedAction, message } = kcContext;
    const { msgStr } = i18n;

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const rules = getPasswordRules(password, kcContext.passwordPolicies);
    const passwordMessage = submitted
        ? clientPasswordMessage(password, rules.some(rule => !rule.met))
        : serverPasswordMessage(fieldError(messagesPerField, "password"));
    const confirmMessage = submitted
        ? clientConfirmMessage(password, confirm)
        : serverConfirmMessage(fieldError(messagesPerField, "password-confirm"), msgStr("invalidPasswordConfirmMessage"));
    const passwordDescribedBy = describedBy(
        rules.length > 0 ? "password-requirements" : undefined,
        passwordMessage !== undefined ? "input-error-password-new" : undefined
    );

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const submitter = event.nativeEvent instanceof SubmitEvent ? event.nativeEvent.submitter : null;
        if (submitter instanceof HTMLButtonElement && submitter.name === "cancel-aia") {
            return;
        }

        const nextPasswordMessage = clientPasswordMessage(password, rules.some(rule => !rule.met));
        const nextConfirmMessage = clientConfirmMessage(password, confirm);
        setSubmitted(true);
        if (nextPasswordMessage !== undefined || nextConfirmMessage !== undefined) {
            event.preventDefault();
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={
                message !== undefined &&
                message.type !== "info" &&
                !messagesPerField.existsError("password", "password-confirm")
            }
            headerNode={
                <>
                    <h1 className="h1">Update your password</h1>
                    <p className="auth-subtitle">Choose a new password for your CivicDataSpace account.</p>
                </>
            }
        >
            <form id="kc-passwd-update-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post" onSubmit={onSubmit}>
                <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="password-new" className={kcClsx("kcLabelClass")}>
                        Password{" "}
                        <span className="required" aria-hidden="true">
                            *
                        </span>
                    </label>
                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                        <input
                            type="password"
                            id="password-new"
                            name="password-new"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            autoComplete="new-password"
                            placeholder="Create a password"
                            value={password}
                            aria-invalid={passwordMessage !== undefined}
                            aria-describedby={passwordDescribedBy}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </PasswordWrapper>
                    <PasswordRequirements
                        password={password}
                        rules={rules}
                        showInvalid={passwordMessage === "Password does not meet all requirements."}
                    />
                    {passwordMessage !== undefined && (
                        <FieldMessage id="input-error-password-new" kcClsx={kcClsx} message={passwordMessage} />
                    )}
                </div>
                <div className={kcClsx("kcFormGroupClass")}>
                    <label htmlFor="password-confirm" className={kcClsx("kcLabelClass")}>
                        Confirm password{" "}
                        <span className="required" aria-hidden="true">
                            *
                        </span>
                    </label>
                    <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-confirm">
                        <input
                            type="password"
                            id="password-confirm"
                            name="password-confirm"
                            className={kcClsx("kcInputClass")}
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            value={confirm}
                            aria-invalid={confirmMessage !== undefined}
                            aria-describedby={confirmMessage !== undefined ? "input-error-password-confirm" : undefined}
                            onChange={event => setConfirm(event.target.value)}
                        />
                    </PasswordWrapper>
                    {confirmMessage !== undefined && (
                        <FieldMessage id="input-error-password-confirm" kcClsx={kcClsx} message={confirmMessage} />
                    )}
                </div>
                <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                    <div className="checkbox">
                        <label htmlFor="logout-sessions">
                            <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked />
                            Sign out from other devices
                        </label>
                    </div>
                </div>
                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                    <input
                        className={kcClsx(
                            "kcButtonClass",
                            "kcButtonPrimaryClass",
                            !isAppInitiatedAction && "kcButtonBlockClass",
                            "kcButtonLargeClass"
                        )}
                        type="submit"
                        value="Update password"
                    />
                    {isAppInitiatedAction && (
                        <button
                            className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                            type="submit"
                            name="cancel-aia"
                            value="true"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
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

function describedBy(...ids: (string | undefined)[]) {
    const value = ids.filter(id => id !== undefined).join(" ");
    return value === "" ? undefined : value;
}

function fieldError(
    messagesPerField: Extract<KcContext, { pageId: "login-update-password.ftl" }>["messagesPerField"],
    fieldName: string
) {
    return messagesPerField.existsError(fieldName) ? messagesPerField.get(fieldName) : undefined;
}

function clientPasswordMessage(password: string, unmet: boolean) {
    if (password === "") {
        return "Password is required.";
    }
    if (unmet) {
        return "Password does not meet all requirements.";
    }
    return undefined;
}

function clientConfirmMessage(password: string, confirm: string) {
    if (confirm === "") {
        return "Password is required.";
    }
    if (password !== "" && confirm !== password) {
        return "Passwords do not match.";
    }
    return undefined;
}

function serverPasswordMessage(message: string | undefined) {
    if (message === undefined || plainMessage(message) === "") {
        return undefined;
    }
    return /required|specify password/i.test(plainMessage(message))
        ? "Password is required."
        : "Password does not meet all requirements.";
}

function serverConfirmMessage(message: string | undefined, mismatchText: string) {
    const plain = plainMessage(message ?? "");
    if (plain === "") {
        return undefined;
    }
    if (plain.includes(mismatchText) || /does not match|doesn't match|do not match/i.test(plain)) {
        return "Passwords do not match.";
    }
    if (/required|specify password/i.test(plain)) {
        return "Password is required.";
    }
    return "Passwords do not match.";
}

function plainMessage(message: string) {
    return message.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
