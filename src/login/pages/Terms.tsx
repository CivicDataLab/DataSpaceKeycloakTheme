import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { getAppHomeUrl, getPrivacyPolicyUrl } from "../appHome";

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { url } = kcContext;
    const { msgStr } = i18n;
    const termsHtml = msgStr("termsText").trim();
    const hasTerms = termsHtml !== "" && termsHtml !== "termsText";
    const privacyHref = getPrivacyPolicyUrl(getAppHomeUrl()) ?? "/privacy";

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <>
                    <h1 className="h1">Terms and Conditions</h1>
                    <p className="auth-subtitle">Review before you continue.</p>
                </>
            }
        >
            <div id="kc-terms-text">
                {hasTerms ? (
                    <div dangerouslySetInnerHTML={{ __html: kcSanitize(termsHtml) }} />
                ) : (
                    <p>
                        Please review the{" "}
                        <a href={privacyHref} target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </a>{" "}
                        before continuing.
                    </p>
                )}
            </div>
            <form id="kc-terms-form" action={url.loginAction} method="post">
                <input
                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                    name="accept"
                    id="kc-accept"
                    type="submit"
                    value="Accept"
                />
                <input
                    className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                    name="cancel"
                    id="kc-decline"
                    type="submit"
                    value="Decline"
                />
            </form>
        </Template>
    );
}
