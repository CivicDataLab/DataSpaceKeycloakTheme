import { useRef, useState, type FormEvent, type MouseEvent } from "react";
import type { JSX } from "keycloakify/tools/JSX";
import type { LazyOrNot } from "keycloakify/tools/LazyOrNot";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { clsx } from "keycloakify/tools/clsx";
import type { UserProfileFormFieldsProps } from "keycloakify/login/UserProfileFormFieldsProps";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { getAppHomeUrl, getPrivacyPolicyUrl } from "../appHome";
import SocialProviderIcon from "../components/SocialProviderIcon";
import FieldErrorIcon from "../components/FieldErrorIcon";

type RegisterUserProfileFormFieldsProps = UserProfileFormFieldsProps & {
    shouldRevealErrors?: boolean;
};

type RegisterProps = PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n> & {
    UserProfileFormFields: LazyOrNot<(props: RegisterUserProfileFormFieldsProps) => JSX.Element>;
    doMakeUserConfirmPassword: boolean;
};

export default function Register(props: RegisterProps) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes, UserProfileFormFields, doMakeUserConfirmPassword } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const {
        url,
        messagesPerField,
        recaptchaRequired,
        recaptchaVisible,
        recaptchaSiteKey,
        recaptchaAction,
        social
    } = kcContext;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);
    const [areTermsAccepted, setAreTermsAccepted] = useState(false);
    const [hasAttemptedSubmitWithoutTerms, setHasAttemptedSubmitWithoutTerms] = useState(false);
    const [shouldRevealErrors, setShouldRevealErrors] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const termsCheckboxRef = useRef<HTMLInputElement>(null);
    const privacyHref = getPrivacyPolicyUrl(getAppHomeUrl()) ?? "/privacy";
    const serverTermsError = messagesPerField.existsError("termsAccepted") ? messagesPerField.get("termsAccepted") : undefined;
    const showTermsError = !areTermsAccepted && (hasAttemptedSubmitWithoutTerms || serverTermsError !== undefined);

    const rejectIfTermsNotAccepted = (): boolean => {
        if (areTermsAccepted) {
            return false;
        }

        setHasAttemptedSubmitWithoutTerms(true);
        termsCheckboxRef.current?.focus();
        return true;
    };

    const onRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (!isFormSubmittable) {
            setShouldRevealErrors(true);
        }
        if (rejectIfTermsNotAccepted() || !isFormSubmittable) {
            event.preventDefault();
        }
    };

    const onRegisterClick = (event: MouseEvent<HTMLButtonElement | HTMLInputElement>) => {
        if (!isFormSubmittable) {
            setShouldRevealErrors(true);
        }
        if (rejectIfTermsNotAccepted() || !isFormSubmittable) {
            event.preventDefault();
        }
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={messagesPerField.exists("global")}
            headerNode={
                <>
                    <h1 className="h1">Create your account</h1>
                    <p className="auth-subtitle">
                        Join CivicDataSpace to create, manage and share civic data and knowledge.
                    </p>
                </>
            }
            socialProvidersNode={
                social?.providers !== undefined && social.providers.length !== 0 ? (
                    <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                        <div className="kc-social-divider">
                            <span>or</span>
                        </div>
                        <ul className={kcClsx("kcFormSocialAccountListClass")}>
                            {social.providers.map(provider => (
                                <li key={provider.alias}>
                                    <a
                                        id={`social-${provider.alias}`}
                                        className={kcClsx("kcFormSocialAccountListButtonClass")}
                                        href={provider.loginUrl}
                                    >
                                        <span className="kc-social-provider-content">
                                            <span className="kc-social-provider-icon-wrap">
                                                <SocialProviderIcon
                                                    providerId={provider.providerId}
                                                    alias={provider.alias}
                                                />
                                            </span>
                                            <span
                                                className={kcClsx("kcFormSocialAccountNameClass")}
                                                dangerouslySetInnerHTML={{
                                                    __html: `Continue with ${kcSanitize(provider.displayName)}`
                                                }}
                                            />
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null
            }
            infoNode={
                <div id="kc-registration">
                    <span>
                        Already have an account?{" "}
                        <a href={url.loginUrl}>Sign in</a>
                    </span>
                </div>
            }
        >
            <form
                ref={formRef}
                id="kc-register-form"
                className={kcClsx("kcFormClass")}
                action={url.registrationAction}
                method="post"
                onSubmit={onRegisterSubmit}
            >
                <UserProfileFormFields
                    kcContext={kcContext}
                    i18n={i18n}
                    kcClsx={kcClsx}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                    shouldRevealErrors={shouldRevealErrors}
                />
                <div className="form-group civic-terms">
                    <input
                        ref={termsCheckboxRef}
                        type="checkbox"
                        id="termsAccepted"
                        name="termsAccepted"
                        checked={areTermsAccepted}
                        onChange={event => setAreTermsAccepted(event.target.checked)}
                        aria-invalid={showTermsError}
                        aria-describedby={showTermsError ? "input-error-termsAccepted" : undefined}
                    />
                    <p>
                        I acknowledge the{" "}
                        <a href={privacyHref} target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </a>
                        .
                    </p>
                    {showTermsError && (
                        <span
                            id="input-error-termsAccepted"
                            className={kcClsx("kcInputErrorMessageClass")}
                            aria-live="polite"
                        >
                            <FieldErrorIcon />
                            {serverTermsError !== undefined ? (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(serverTermsError)
                                    }}
                                />
                            ) : (
                                <span>Please acknowledge the Privacy Policy to continue.</span>
                            )}
                        </span>
                    )}
                </div>
                {recaptchaRequired && (recaptchaVisible || recaptchaAction === undefined) && (
                    <div className="form-group">
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey} data-action={recaptchaAction}></div>
                    </div>
                )}
                <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                    {recaptchaRequired && !recaptchaVisible && recaptchaAction !== undefined ? (
                        <button
                            className={clsx(
                                kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass"),
                                "g-recaptcha"
                            )}
                            data-sitekey={recaptchaSiteKey}
                            data-callback={() => {
                                if (!isFormSubmittable) {
                                    setShouldRevealErrors(true);
                                }
                                if (rejectIfTermsNotAccepted() || !isFormSubmittable) {
                                    return;
                                }
                                formRef.current?.submit();
                            }}
                            data-action={recaptchaAction}
                            type="submit"
                            onClick={onRegisterClick}
                        >
                            Create Account
                        </button>
                    ) : (
                        <input
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            type="submit"
                            value="Create Account"
                            onClick={onRegisterClick}
                        />
                    )}
                </div>
            </form>
        </Template>
    );
}
