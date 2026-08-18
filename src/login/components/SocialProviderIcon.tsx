import type { ReactNode } from "react";

type SocialProviderIconProps = {
    providerId: string;
    alias: string;
    className?: string;
};

function normalizeProviderKey(providerId: string, alias: string) {
    const key = (providerId || alias).toLowerCase();

    if (key.includes("google")) return "google";
    if (key.includes("microsoft") || key.includes("windows") || key === "azure") return "microsoft";
    if (key.includes("facebook")) return "facebook";
    if (key.includes("instagram")) return "instagram";
    if (key.includes("twitter") || key === "x") return "twitter";
    if (key.includes("linkedin")) return "linkedin";
    if (key.includes("stackoverflow") || key.includes("stack-overflow")) return "stackoverflow";
    if (key.includes("github")) return "github";
    if (key.includes("gitlab")) return "gitlab";
    if (key.includes("bitbucket")) return "bitbucket";
    if (key.includes("paypal")) return "paypal";
    if (key.includes("openshift")) return "openshift";

    return key;
}

function IconShell({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <svg
            className={className ?? "kc-social-provider-icon"}
            width="18"
            height="18"
            viewBox="0 0 48 48"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    );
}

function GoogleIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
                fill="#4CAF50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
        </IconShell>
    );
}

function MicrosoftIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path fill="#F25022" d="M4 4h18v18H4z" />
            <path fill="#7FBA00" d="M26 4h18v18H26z" />
            <path fill="#00A4EF" d="M4 26h18v18H4z" />
            <path fill="#FFB900" d="M26 26h18v18H26z" />
        </IconShell>
    );
}

function FacebookIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#1877F2"
                d="M24 4C12.954 4 4 12.954 4 24c0 9.84 7.09 17.98 16.406 19.77V29.89h-4.938v-5.89h4.938v-4.492c0-4.88 2.907-7.577 7.357-7.577 2.132 0 4.363.381 4.363.381v4.8h-2.458c-2.421 0-3.176 1.503-3.176 3.044v3.844h5.406l-.864 5.89h-4.542v13.88C36.91 41.98 44 33.84 44 24 44 12.954 35.046 4 24 4z"
            />
            <path
                fill="#fff"
                d="M33.199 29.89l.864-5.89h-5.406v-3.844c0-1.541.755-3.044 3.176-3.044h2.458v-4.8s-2.231-.381-4.363-.381c-4.45 0-7.357 2.697-7.357 7.577V24h-4.938v5.89h4.938v13.88a20.2 20.2 0 006.125 0V29.89h4.542z"
            />
        </IconShell>
    );
}

function InstagramIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <defs>
                <radialGradient id="instagram-gradient" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stopColor="#fdf497" />
                    <stop offset="5%" stopColor="#fdf497" />
                    <stop offset="45%" stopColor="#fd5949" />
                    <stop offset="60%" stopColor="#d6249f" />
                    <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
            </defs>
            <path
                fill="url(#instagram-gradient)"
                d="M24 8.5c5.3 0 5.93.02 8.02.12 2.04.1 3.15.43 3.89.72.98.38 1.68.83 2.41 1.57.74.74 1.19 1.43 1.57 2.41.29.74.62 1.85.72 3.89.1 2.09.12 2.72.12 8.02s-.02 5.93-.12 8.02c-.1 2.04-.43 3.15-.72 3.89-.38.98-.83 1.68-1.57 2.41-.74.74-1.43 1.19-2.41 1.57-.74.29-1.85.62-3.89.72-2.09.1-2.72.12-8.02.12s-5.93-.02-8.02-.12c-2.04-.1-3.15-.43-3.89-.72-.98-.38-1.68-.83-2.41-1.57-.74-.74-1.19-1.43-1.57-2.41-.29-.74-.62-1.85-.72-3.89C8.52 29.93 8.5 29.3 8.5 24s.02-5.93.12-8.02c.1-2.04.43-3.15.72-3.89.38-.98.83-1.68 1.57-2.41.74-.74 1.43-1.19 2.41-1.57.74-.29 1.85-.62 3.89-.72C18.07 8.52 18.7 8.5 24 8.5m0-4.5C18.62 4 17.94 4.02 15.82 4.12 13.71 4.22 12.27 4.57 11.01 5.06 9.7 5.57 8.59 6.25 7.48 7.36 6.37 8.47 5.69 9.58 5.18 10.89c-.49 1.26-.84 2.7-.94 4.81C4.14 17.82 4.12 18.5 4.12 24s.02 6.18.12 8.3c.1 2.11.45 3.55.94 4.81.51 1.31 1.19 2.42 2.3 3.53 1.11 1.11 2.22 1.79 3.53 2.3 1.26.49 2.7.84 4.81.94 2.12.1 2.8.12 8.18.12s6.06-.02 8.18-.12c2.11-.1 3.55-.45 4.81-.94 1.31-.51 2.42-1.19 3.53-2.3 1.11-1.11 1.79-2.22 2.3-3.53.49-1.26.84-2.7.94-4.81.1-2.12.12-2.8.12-8.18s-.02-6.06-.12-8.18c-.1-2.11-.45-3.55-.94-4.81-.51-1.31-1.19-2.42-2.3-3.53-1.11-1.11-2.22-1.79-3.53-2.3-1.26-.49-2.7-.84-4.81-.94C30.06 4.02 29.38 4 24 4z"
            />
            <path
                fill="url(#instagram-gradient)"
                d="M24 13.84A10.16 10.16 0 1034.16 24 10.16 10.16 0 0024 13.84zm0 16.76A6.6 6.6 0 1130.6 24 6.6 6.6 0 0124 30.6z"
            />
            <circle fill="url(#instagram-gradient)" cx="34.55" cy="13.55" r="2.45" />
        </IconShell>
    );
}

function TwitterIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#000"
                d="M28.5 20.3L43.2 4h-3.5L26.9 18.1 16.4 4H4.8l15.4 22.1L4.8 44h3.5l13.5-15.5L32 44h11.6L28.5 20.3zm-4.8 5.5l-1.6-2.2L9.5 6.6h5.4l10.3 14.5 1.6 2.2 13.7 19.3h-5.4L23.7 25.8z"
            />
        </IconShell>
    );
}

function LinkedInIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#0A66C2"
                d="M40.4 4H7.6C5.6 4 4 5.6 4 7.6v32.8C4 42.4 5.6 44 7.6 44h32.8c2 0 3.6-1.6 3.6-3.6V7.6C44 5.6 42.4 4 40.4 4zM16.2 37.6h-5.6V19.6h5.6v18zm-2.8-20.5c-1.8 0-3.3-1.5-3.3-3.3s1.5-3.3 3.3-3.3 3.3 1.5 3.3 3.3-1.5 3.3-3.3 3.3zm24.2 20.5h-5.6V28c0-2.3 0-5.2-3.2-5.2s-3.7 2.5-3.7 5.1v9.7h-5.6V19.6h5.4v2.5h.1c.7-1.4 2.6-2.9 5.3-2.9 5.7 0 6.7 3.7 6.7 8.6v9.8z"
            />
        </IconShell>
    );
}

function StackOverflowIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path fill="#BCBBBB" d="M10 36h24v4H10z" />
            <path fill="#F48024" d="M14 28h20v4H14zm1.4-7.8l19.5 4.1-.8 3.9-19.5-4.1.8-3.9zm3.2-7.4l18.1 8.4-1.7 3.6-18.1-8.4 1.7-3.6zm5.1-6.7l15.4 12.7-2.5 3.1L21.2 9.2l2.5-3.1zM30.6 4l2.9 2.1-12.3 16.9-2.9-2.1L30.6 4zM34 32v-8h4v12H10v-4h24z" />
        </IconShell>
    );
}

function GitHubIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#181717"
                d="M24 4C12.95 4 4 12.98 4 24.06c0 8.87 5.72 16.39 13.66 19.04 1 .19 1.36-.43 1.36-.96 0-.47-.02-1.73-.03-3.39-5.56 1.21-6.73-2.7-6.73-2.7-.91-2.32-2.22-2.94-2.22-2.94-1.81-1.25.14-1.22.14-1.22 2 .14 3.05 2.07 3.05 2.07 1.78 3.07 4.67 2.18 5.81 1.67.18-1.3.7-2.18 1.27-2.68-4.44-.51-9.1-2.24-9.1-9.95 0-2.2.78-4 2.06-5.41-.21-.51-.89-2.56.19-5.34 0 0 1.68-.54 5.5 2.07a18.9 18.9 0 015.01-.68c1.7.01 3.41.23 5.01.68 3.82-2.61 5.5-2.07 5.5-2.07 1.08 2.78.4 4.83.2 5.34 1.28 1.41 2.06 3.21 2.06 5.41 0 7.73-4.67 9.43-9.12 9.93.72.62 1.36 1.85 1.36 3.73 0 2.69-.02 4.86-.02 5.52 0 .53.36 1.16 1.37.96C38.29 40.44 44 32.92 44 24.06 44 12.98 35.05 4 24 4z"
            />
        </IconShell>
    );
}

function GitLabIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path fill="#E24329" d="M24 44L16.4 21.3h15.2L24 44z" />
            <path fill="#FC6D26" d="M24 44l7.6-22.7H40L24 44z" />
            <path fill="#FCA326" d="M40 21.3L36.3 10a1.2 1.2 0 00-2.3 0L24 21.3h16z" />
            <path fill="#E24329" d="M24 44L16.4 21.3H8L24 44z" />
            <path fill="#FC6D26" d="M8 21.3h8.4L12 10a1.2 1.2 0 00-2.3 0L8 21.3z" />
            <path fill="#FCA326" d="M8 21.3L11.7 10a1.2 1.2 0 012.3 0l3.7 11.3H8z" />
        </IconShell>
    );
}

function BitbucketIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#0052CC"
                d="M5.7 6.3A1.7 1.7 0 004 8.2l5.4 31.4c.2.9 1 1.6 1.9 1.6h25.9c.7 0 1.3-.5 1.4-1.2L43.9 8.2a1.7 1.7 0 00-1.7-1.9H5.7zm24.5 23.1h-11L16.4 16h15.6l-1.8 13.4z"
            />
            <path fill="#2684FF" d="M30.2 29.4h-11l1.4-8.7h8.2l1.4 8.7z" />
        </IconShell>
    );
}

function PayPalIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#003087"
                d="M18.4 36.2l1.1-6.8.5-3.2c.1-.5.5-.8 1-.8h4.4c5.4 0 9.6-2.2 11-7.4.4-1.6.4-3 .1-4.2.1 0 .1-.1.2-.1H42c.5 0 .8.4.7.9l-2.8 17.8c-.1.7-.7 1.2-1.4 1.2h-6.6c-.5 0-.9.4-1 .9l-.8 5.1c-.1.4-.4.7-.8.7h-5.1c-.5 0-.8-.4-.7-.9l.9-5.2z"
            />
            <path
                fill="#009CDE"
                d="M17.2 8.5c.3-1.8 1.5-3.1 3.8-3.8.9-.3 1.9-.4 3.1-.4h9.1c1.2 0 2.2.1 3 .4 1.8.6 2.9 1.9 3.2 3.8.2 1.1.1 2.4-.3 3.9-1.5 5.5-5.8 7.8-11.5 7.8h-4.1c-.6 0-1.1.4-1.2 1l-1.7 10.6c-.1.4-.4.7-.8.7h-5.2c-.5 0-.8-.4-.7-.9l3.3-21.1c.1-.6.5-1 1-.1z"
            />
        </IconShell>
    );
}

function OpenShiftIcon({ className }: { className?: string }) {
    return (
        <IconShell className={className}>
            <path
                fill="#EE0000"
                d="M24 4c11.05 0 20 8.95 20 20s-8.95 20-20 20S4 35.05 4 24 12.95 4 24 4zm0 4C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16S32.84 8 24 8zm-1.2 6.5h2.4v9.1l6.5 3.8-1.2 2.1-7.7-4.5V14.5z"
            />
        </IconShell>
    );
}

const ICONS: Record<string, (props: { className?: string }) => ReactNode> = {
    google: GoogleIcon,
    microsoft: MicrosoftIcon,
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    linkedin: LinkedInIcon,
    stackoverflow: StackOverflowIcon,
    github: GitHubIcon,
    gitlab: GitLabIcon,
    bitbucket: BitbucketIcon,
    paypal: PayPalIcon,
    openshift: OpenShiftIcon
};

export default function SocialProviderIcon({ providerId, alias, className }: SocialProviderIconProps) {
    const key = normalizeProviderKey(providerId, alias);
    const Icon = ICONS[key];

    if (!Icon) {
        return null;
    }

    return <Icon className={className} />;
}
