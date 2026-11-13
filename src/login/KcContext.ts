/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { ExtendKcContext, PasswordPolicies } from "keycloakify/login/KcContext";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
    themeName: ThemeName;
    properties: Record<KcEnvName, string> & {};
    client?: {
        baseUrl?: string;
    };
};

export type KcContextExtensionPerPage = {
    "signed-in.ftl": {};
    "login-update-password.ftl": {
        passwordPolicies?: PasswordPolicies;
    };
    "register.ftl": {
        social?: {
            displayInfo?: boolean;
            providers?: {
                loginUrl: string;
                alias: string;
                providerId: string;
                displayName: string;
                iconClasses?: string;
            }[];
        };
    };
};

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;
