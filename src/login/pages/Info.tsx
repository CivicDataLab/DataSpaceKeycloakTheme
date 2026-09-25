import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import CivicSuccessStatus from "../components/CivicSuccessStatus";

function isAccountCreated(summary: string | undefined) {
    return /account created|account is ready|has been created/i.test(summary ?? "");
}

function isPasswordResetEmail(summary: string | undefined) {
    return /further instructions|reset your password|check your email|we've sent/i.test(summary ?? "");
}

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const summary = kcContext.message?.summary;
    const checkEmail = isPasswordResetEmail(summary);
    const accountCreated = isAccountCreated(summary);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                checkEmail ? (
                    <CivicSuccessStatus
                        mark="email"
                        title="Check your email"
                        subtitle={
                            <>
                                If an account exists for this
                                <br />
                                email, we&apos;ve sent instructions
                                <br />
                                to reset your password.
                            </>
                        }
                        action={
                            <a className="btn btn-primary" href={kcContext.url.loginUrl}>
                                Back to Sign In
                            </a>
                        }
                    />
                ) : accountCreated ? (
                    <CivicSuccessStatus
                        title="Account created"
                        subtitle={
                            <>
                                Your CivicDataSpace
                                <br />
                                account is ready.
                            </>
                        }
                    />
                ) : (
                    <CivicSuccessStatus
                        title="Account verified"
                        subtitle={
                            <>
                                Your Google account is now
                                <br />
                                connected to CivicDataSpace.
                            </>
                        }
                    />
                )
            }
        >
            {null}
        </Template>
    );
}
