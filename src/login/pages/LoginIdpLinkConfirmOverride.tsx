import { IconArrowLeft } from "@tabler/icons-react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";

export default function LoginIdpLinkConfirmOverride(
    props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm-override.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, idpDisplayName } = kcContext;
    const providerName = idpDisplayName || "Google";

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <>
                    <h1 className="h1">Different account detected</h1>
                    <p className="auth-subtitle">
                        This {providerName} account is different from your existing CivicDataSpace account.
                    </p>
                </>
            }
        >
            <div id="kc-idp-override">
                <form action={url.loginAction} method="post">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        name="submitAction"
                        id="confirmOverride"
                        value="confirmOverride"
                    >
                        Continue with this {providerName} account
                    </button>
                </form>
                <a className="subtle-link back-home" href={url.loginRestartFlowUrl}>
                    <IconArrowLeft size={14} stroke={1.75} aria-hidden />
                    Use another account
                </a>
            </div>
        </Template>
    );
}
