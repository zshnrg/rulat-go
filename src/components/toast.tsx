import { useState, useEffect } from "react";

interface ToastProps {
    text: string;
    time?: number;
    isVisible: boolean; // Add isVisible prop
    onClose?: () => void; // Add onClose prop
}

export default function Toast({ text, time, isVisible, onClose }: ToastProps) {
    const [show, setShow] = useState(isVisible); // Initialize show state with isVisible prop

    useEffect(() => {
        setShow(isVisible); // Update show state when isVisible prop changes
    }, [isVisible]);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
                if (onClose) onClose(); // Call onClose function if provided
            }, time || 3000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    return (
        <div className={show ? "block" : "hidden"}>
            <div className="fixed bottom-0 right-0 z-50 p-4 sm:w-full">
                <div className="flex bg-[#F4F4F4] custom-box-shadow regular p-3">
                    <div className="flex gap-3 items-center">
                        <p>{text}</p>
                    </div>
                    <div
                        className="pl-4 h-6 text-center cursor-pointer"
                        onClick={() => setShow(false)}
                    >
                        x
                    </div>
                </div>
            </div>
        </div>
    );
}
