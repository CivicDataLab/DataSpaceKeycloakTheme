import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import CivicSuccessStatus from "../components/CivicSuccessStatus";

export default function SignedIn(props: PageProps<Extract<KcContext, { pageId: "signed-in.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={false}
            headerNode={
                <CivicSuccessStatus
                    title="You're signed in"
                    subtitle={
                        <>
                            This is where CivicDataSpace
                            <br />
                            would open your dashboard.
                        </>
                    }
                />
            }
        >
            {null}
        </Template>
    );
}
