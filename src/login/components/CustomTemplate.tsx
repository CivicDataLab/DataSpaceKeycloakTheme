import React from "react";
import { IconAlertCircle, IconArrowLeft, IconInfoCircle } from "@tabler/icons-react";
import { getAppHomeUrl, getPrivacyPolicyUrl } from "../appHome";
import CivicLogo from "./CivicLogo";

type CustomTemplateProps = {
    children: React.ReactNode;
    socialProvidersNode?: React.ReactNode;
    infoNode?: React.ReactNode;
    headerNode?: React.ReactNode;
    kcContext: {
        message?: {
            type: string;
            summary: string;
        };
        client?: {
            clientId?: string;
            baseUrl?: string;
        };
    };
    displayMessage?: boolean;
};

export default function CustomTemplate({
    children,
    socialProvidersNode,
    infoNode,
    headerNode,
    kcContext,
    displayMessage = true
}: CustomTemplateProps) {
    const homeHref = getAppHomeUrl() ?? kcContext.client?.baseUrl ?? "/";
    const privacyHref = getPrivacyPolicyUrl(homeHref);

    return (
        <>
            <div className="civic-split-wrapper">
                {/* Left Panel - Form Section */}
                <div id="kc-content-wrapper">
                    <div className="civic-form-column">
                    <a className="subtle-link back-home" href={homeHref}>
                        <IconArrowLeft size={14} stroke={1.75} aria-hidden />
                        Back to Home
                    </a>
                    <div className="card-pf">
                        {headerNode !== undefined && (
                            <div className="civic-auth-header">{headerNode}</div>
                        )}
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
                </div>

                {/* Right Panel with Logo */}
                <div className="civic-brand-panel">
                    <CivicLogo />
                    <div className="civic-legal-links">
                        <a href={privacyHref ?? "/privacy"} target="_blank" rel="noopener noreferrer">
                            Privacy
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
