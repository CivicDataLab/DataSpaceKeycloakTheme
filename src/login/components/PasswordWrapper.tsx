import type { JSX } from "keycloakify/tools/JSX";
import { useIsPasswordRevealed } from "keycloakify/tools/useIsPasswordRevealed";
import type { KcClsx } from "keycloakify/login/lib/kcClsx";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import type { I18n } from "../i18n";

export default function PasswordWrapper(props: {
    kcClsx: KcClsx;
    i18n: I18n;
    passwordInputId: string;
    children: JSX.Element;
}) {
    const { kcClsx, i18n, passwordInputId, children } = props;
    const { msgStr } = i18n;
    const { isPasswordRevealed, toggleIsPasswordRevealed } = useIsPasswordRevealed({
        passwordInputId
    });

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                {isPasswordRevealed ? (
                    <IconEyeOff size={18} stroke={1.75} aria-hidden />
                ) : (
                    <IconEye size={18} stroke={1.75} aria-hidden />
                )}
            </button>
        </div>
    );
}
