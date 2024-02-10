'use client'

import { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { redirect } from 'next/navigation';

interface QRScannerProps {
    onSuccessfulScan: (decodedText: string, decodedResult: any) => void;
}

export default function QRScanner({ onSuccessfulScan }: QRScannerProps) {
    let html5QrCode: any;

    useEffect(() => {
        if (!html5QrCode?.getState()) {
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };

            html5QrCode = new Html5Qrcode(
                "reader"
            );
            
            const onScanSuccess = function(decodedText: string, decodedResult: any) {
                console.log(`Code matched = ${decodedText}`, decodedResult);
                
                // Stop the scanner to avoid multiple decode
                html5QrCode.stop().then(() => {
                    // QR Code found
                    console.log("QR Code found");
                }).catch((err: any) => {
                    console.error("Failed to stop the scanner", err);
                });

                onSuccessfulScan(decodedText, decodedResult);
            }

            const onScanFailure = (error: any) => {
                console.warn(`Code scan error = ${error}`);
            }

            html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure);

        }
    }, []);

    return (
        <div>
            <div className='regular custom-box-shadow'>
                <div id="reader"></div>
            </div>
        </div>
    );
}