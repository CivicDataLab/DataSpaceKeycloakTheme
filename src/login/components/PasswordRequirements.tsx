import { IconCheck } from "@tabler/icons-react";
import type { PasswordPolicies } from "keycloakify/login/KcContext";

type PasswordRule = {
    id: string;
    label: string;
    met: boolean;
};

export function getPasswordRules(password: string, policies: PasswordPolicies | undefined): PasswordRule[] {
    if (policies === undefined) {
        return [];
    }

    const rules: PasswordRule[] = [];

    if (policies.length) {
        rules.push({
            id: "length",
            label: `At least ${policies.length} characters`,
            met: password.length >= policies.length
        });
    }

    if (policies.upperCase) {
        const count = countLetters(password, "upper");
        rules.push({
            id: "upperCase",
            label: policies.upperCase === 1 ? "One uppercase letter" : `At least ${policies.upperCase} uppercase letters`,
            met: count >= policies.upperCase
        });
    }

    if (policies.digits) {
        const count = password.split("").filter(char => !Number.isNaN(Number.parseInt(char, 10))).length;
        rules.push({
            id: "digits",
            label: policies.digits === 1 ? "One number" : `At least ${policies.digits} numbers`,
            met: count >= policies.digits
        });
    }

    if (policies.lowerCase) {
        const count = countLetters(password, "lower");
        rules.push({
            id: "lowerCase",
            label: policies.lowerCase === 1 ? "One lowercase letter" : `At least ${policies.lowerCase} lowercase letters`,
            met: count >= policies.lowerCase
        });
    }

    if (policies.specialChars) {
        const count = password.split("").filter(char => !/[a-zA-Z0-9]/.test(char)).length;
        rules.push({
            id: "specialChars",
            label: policies.specialChars === 1 ? "One special character" : `At least ${policies.specialChars} special characters`,
            met: count >= policies.specialChars
        });
    }

    if (policies.maxLength) {
        rules.push({
            id: "maxLength",
            label: `At most ${policies.maxLength} characters`,
            met: password.length > 0 && password.length <= policies.maxLength
        });
    }

    return rules;
}

export default function PasswordRequirements(props: { password: string; rules: PasswordRule[]; showInvalid: boolean }) {
    const { password, rules, showInvalid } = props;

    if (rules.length === 0) {
        return null;
    }

    return (
        <div className="civic-password-requirements">
            <p id="password-requirements-label">Password must contain</p>
            <ul id="password-requirements" aria-labelledby="password-requirements-label">
                {rules.map(rule => {
                    const met = password.length > 0 && rule.met;
                    return (
                        <li key={rule.id} className={met ? "is-met" : showInvalid ? "is-invalid" : undefined}>
                            {met ? (
                                <IconCheck size={14} stroke={2} aria-hidden />
                            ) : (
                                <span className="civic-password-mark" aria-hidden />
                            )}
                            <span className="civic-sr">{met ? "Met: " : "Not met: "}</span>
                            {rule.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function countLetters(password: string, kind: "upper" | "lower") {
    return password.split("").filter(char => {
        const isLetter = char.toUpperCase() !== char.toLowerCase();
        if (!isLetter) {
            return false;
        }
        return kind === "upper" ? char === char.toUpperCase() : char === char.toLowerCase();
    }).length;
}
