import type { ReactNode } from "react";
import { IconCheck, IconMail } from "@tabler/icons-react";

type CivicSuccessStatusProps = {
    title: string;
    subtitle: ReactNode;
    mark?: "success" | "email";
    action?: ReactNode;
};

export default function CivicSuccessStatus({ title, subtitle, mark = "success", action }: CivicSuccessStatusProps) {
    return (
        <div className="civic-success-status">
            <span className={mark === "email" ? "civic-email-mark" : "civic-success-mark"} aria-hidden="true">
                {mark === "email" ? <IconMail size={28} stroke={1.75} /> : <IconCheck size={28} stroke={2.25} />}
            </span>
            <h1 className="h1">{title}</h1>
            <p className="auth-subtitle">{subtitle}</p>
            {action}
        </div>
    );
}
