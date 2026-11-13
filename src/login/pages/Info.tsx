import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import CivicSuccessStatus from "../components/CivicSuccessStatus";

function isAccountCreated(summary: string | undefined) {
    return /account created|account is ready|has been created/i.test(summary ?? "");
}

export function isPasswordResetEmail(summary: string | undefined) {
    return /further instructions|reset your password|check your email|we've sent/i.test(summary ?? "");
}

export function CheckYourEmailStatus(props: { loginUrl: string }) {
    return (
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
                <a className="btn btn-primary" href={props.loginUrl}>
                    Back to Sign In
                </a>
            }
        />
    );
}

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const summary = kcContext.message?.summary;
    const checkEmail = isPasswordResetEmail(summary);
    const accountCreated = isAccountCreated(summary);

    if (!checkEmail && !accountCreated) {
        const { advancedMsgStr } = i18n;
        const { messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client } = kcContext;
        const messageSummary = message?.summary ?? "";
        const heading = messageHeader ? advancedMsgStr(messageHeader) : messageSummary;
        const actionLabels = requiredActions
            ?.map(requiredAction => advancedMsgStr(`requiredAction.${requiredAction}`))
            .filter(label => label.length > 0);
        const subtitle = actionLabels?.length
            ? actionLabels.join(", ")
            : messageHeader && messageSummary && messageSummary !== heading
              ? messageSummary
              : undefined;
        const link = skipLink
            ? undefined
            : pageRedirectUri
              ? { href: pageRedirectUri, label: "Back to application" }
              : actionUri
                ? { href: actionUri, label: "Continue" }
                : client.baseUrl
                  ? { href: client.baseUrl, label: "Back to application" }
                  : undefined;

        return (
            <Template
                kcContext={kcContext}
                i18n={i18n}
                doUseDefaultCss={doUseDefaultCss}
                classes={classes}
                displayMessage={false}
                headerNode={
                    <>
                        {heading ? (
                            <h1 className="h1" dangerouslySetInnerHTML={{ __html: kcSanitize(heading) }} />
                        ) : null}
                        {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}
                    </>
                }
            >
                {link ? (
                    <div id="kc-info-message">
                        <a className="btn btn-primary" href={link.href}>
                            {link.label}
                        </a>
                    </div>
                ) : null}
            </Template>
        );
    }

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                checkEmail ? (
                    <CheckYourEmailStatus loginUrl={kcContext.url.loginUrl} />
                ) : (
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
                )
            }
        >
            {null}
        </Template>
    );
}
