import { IconArrowLeft } from "@tabler/icons-react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

function isAccountCreationError(summary: string | undefined) {
    return /could not create|error creating|creating (your )?account|register/i.test(summary ?? "");
}

function isIdentityProviderAuthFailure(summary: string | undefined) {
    return /authenticating with identity provider|identity provider authentication/i.test(summary ?? "");
}

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, message } = kcContext;
    const summary = message?.summary;
    const accountCreationFailed = isAccountCreationError(summary);
    const identityProviderFailed = !accountCreationFailed && isIdentityProviderAuthFailure(summary);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                accountCreationFailed ? (
                    <>
                        <h1 className="h1">We couldn&apos;t create your account</h1>
                        <p className="auth-subtitle">
                            Something went wrong while creating your CivicDataSpace account. Please try again.
                        </p>
                    </>
                ) : identityProviderFailed ? (
                    <>
                        <h1 className="h1">Google sign-in failed</h1>
                        <p className="auth-subtitle">
                            We couldn&apos;t sign you in with Google. Please try again or use another sign-in method.
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="h1">Something went wrong</h1>
                        {summary ? (
                            <p
                                className="auth-subtitle"
                                dangerouslySetInnerHTML={{ __html: kcSanitize(summary) }}
                            />
                        ) : (
                            <p className="auth-subtitle">Please try again.</p>
                        )}
                    </>
                )
            }
        >
            <div id="kc-error-message">
                <a id="kc-try-again" className="btn btn-primary" href={url.loginRestartFlowUrl}>
                    Try again
                </a>
                <a className="subtle-link back-home" href={url.loginUrl}>
                    <IconArrowLeft size={14} stroke={1.75} aria-hidden />
                    {identityProviderFailed ? "Use another sign-in method" : "Return to Sign in"}
                </a>
            </div>
        </Template>
    );
}
