function httpOrigin(value: string): string | undefined {
    try {
        const url = new URL(value);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return undefined;
        }
        return url.origin;
    } catch {
        return undefined;
    }
}

/** Keycloak 25+ moves `redirect_uri` into `client_data` (`ru`) after the first page. */
function redirectUriFromClientData(clientData: string): string | undefined {
    try {
        const normalized = clientData.replace(/-/g, "+").replace(/_/g, "/");
        const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
        const parsed = JSON.parse(atob(padded)) as { ru?: unknown; redirectUri?: unknown };
        const redirectUri = typeof parsed.ru === "string" ? parsed.ru : parsed.redirectUri;
        return typeof redirectUri === "string" ? redirectUri : undefined;
    } catch {
        return undefined;
    }
}

/** Home of the app that started this login (`redirect_uri` origin). */
export function getAppHomeUrl(): string | undefined {
    if (typeof window === "undefined") {
        return undefined;
    }

    const params = new URLSearchParams(window.location.search);
    const clientData = params.get("client_data");
    const redirectUri = params.get("redirect_uri") ?? (clientData ? redirectUriFromClientData(clientData) : undefined);
    return redirectUri ? httpOrigin(redirectUri) : undefined;
}

export function getPrivacyPolicyUrl(homeHref: string | undefined): string | undefined {
    if (!homeHref) {
        return undefined;
    }

    const home = homeHref.replace(/\/$/, "");
    return `${home}/privacy`;
}
