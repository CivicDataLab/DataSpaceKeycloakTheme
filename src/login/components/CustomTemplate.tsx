import React from "react";
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react";
import CivicFooter from "./CivicFooter";
import CivicLogo from "./CivicLogo";
import { getPrivacyHref } from "../getPrivacyHref";
import type { I18n } from "../i18n";

export type CustomTemplateProps = {
    children: React.ReactNode;
    socialProvidersNode?: React.ReactNode;
    infoNode?: React.ReactNode;
    i18n: I18n;
    kcContext: {
        message?: {
            type: string;
            summary: string;
        };
        client?: {
            baseUrl?: string;
        };
    };
    displayMessage?: boolean;
};

export default function CustomTemplate({
    children,
    socialProvidersNode,
    infoNode,
    i18n,
    kcContext,
    displayMessage = true
}: CustomTemplateProps) {
    const { msg } = i18n;
    const privacyHref = getPrivacyHref(kcContext.client?.baseUrl);

    return (
        <>
            <div className="civic-split-wrapper">
                {/* Left Panel - Form Section */}
                <div id="kc-content-wrapper">
                    <div className="card-pf">
                        {/* Messages */}
                        {displayMessage && kcContext.message !== undefined && (
                            <div className={`pf-c-alert pf-m-${kcContext.message.type}`}>
                                <div className="pf-c-alert__icon">
                                    {kcContext.message.type === "success" && <span>✓</span>}
                                    {(kcContext.message.type === "warning" ||
                                        kcContext.message.type === "error") && (
                                        <IconAlertCircle size={18} stroke={1.75} aria-hidden />
                                    )}
                                    {kcContext.message.type === "info" && (
                                        <IconInfoCircle size={18} stroke={1.75} aria-hidden />
                                    )}
                                </div>
                                <span
                                    className="pf-c-alert__title"
                                    dangerouslySetInnerHTML={{
                                        __html: kcContext.message.summary
                                    }}
                                />
                            </div>
                        )}

                        {/* Form Content */}
                        {children}

                        {/* Social Providers Section */}
                        {socialProvidersNode}

                        {/* Info Section (e.g., registration link) */}
                        {infoNode}
                    </div>
                </div>

                {/* Right Panel with Logo */}
                <div className="civic-brand-panel">
                    <CivicLogo />
                    <div className="civic-legal-links">
                        <a href={privacyHref} target="_blank" rel="noopener noreferrer">
                            {msg("privacy")}
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <CivicFooter />
        </>
    );
}
