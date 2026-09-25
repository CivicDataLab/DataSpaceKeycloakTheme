import React, { useEffect } from "react";

type CivicLegalDialogProps = {
    open: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
};

export const CivicLegalDialog: React.FC<CivicLegalDialogProps> = ({
    open,
    title,
    children,
    onClose
}) => {
    useEffect(() => {
        if (!open) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div className="civic-dialog-overlay" onClick={onClose} role="presentation">
            <div
                className="civic-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="civic-dialog-title"
                onClick={event => event.stopPropagation()}
            >
                <h2 id="civic-dialog-title" className="civic-dialog-title">
                    {title}
                </h2>
                <div className="civic-dialog-body">{children}</div>
            </div>
        </div>
    );
};

export default CivicLegalDialog;
