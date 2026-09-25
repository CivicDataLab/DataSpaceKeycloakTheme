export function getPrivacyHref(baseUrl?: string) {
    return `${(baseUrl || "/").replace(/\/$/, "")}/privacy`;
}
