import { IconArrowLeft } from "@tabler/icons-react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import SocialProviderIcon from "../components/SocialProviderIcon";

export default function LoginIdpLinkConfirm(
    props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>
) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, idpAlias } = kcContext;
    const providerName = idpAlias.charAt(0).toUpperCase() + idpAlias.slice(1);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <>
                    <h1 className="h1">Existing account found</h1>
                    <p className="auth-subtitle">
                        This email is already associated with a CivicDataSpace account. Continue with {providerName} to verify your identity.
                    </p>
                </>
            }
        >
            <div id="kc-idp-link-confirm">
                <form action={url.loginAction} method="post">
                    <button
                        type="submit"
                        className="civic-idp-continue"
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        <span className="kc-social-provider-content">
                            <span className="kc-social-provider-icon-wrap">
                                <SocialProviderIcon providerId={idpAlias} alias={idpAlias} />
                            </span>
                            <span>Continue with {providerName}</span>
                        </span>
                    </button>
                </form>
                <a className="subtle-link back-home" href={url.loginUrl}>
                    <IconArrowLeft size={14} stroke={1.75} aria-hidden />
                    Back to Sign in
                </a>
            </div>
        </Template>
    );
}
