'use client'

import { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { error } from 'console';

export default function QRScanner() {
    const [scanResult, setScanResult] = useState(null);

    let html5QrCode;

    useEffect(() => {
        if (!html5QrCode?.getState()) {
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };

            html5QrCode = new Html5Qrcode(
                "reader"
            );
            

            html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure);

            function onScanSuccess(decodedText, decodedResult) {
                console.log(`Code matched = ${decodedText}`, decodedResult);
                // oppening the link in current tab
                window.open(decodedText, "_self");
                setScanResult(decodedText);
            }

            function onScanFailure(error) {
                console.warn(`Code scan error = ${error}`);
            }
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