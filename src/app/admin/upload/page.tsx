'use client';

import { registerMember } from "@/services/auth";
import Header from "@/components/header";
import { Payload } from "@/lib/databasetypes";
import { count } from "console";
import Link from "next/link";
import React, { useState, CSSProperties } from "react";

import {
    useCSVReader,
    lightenDarkenColor,
    formatFileSize,
} from 'react-papaparse';

const GREY = '#CCC';
const GREY_LIGHT = 'rgba(255, 255, 255, 0.4)';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
    DEFAULT_REMOVE_HOVER_COLOR,
    40
);
const GREY_DIM = '#686868';

const styles = {
    zone: {
        alignItems: 'center',
        border: `4px dashed ${GREY}`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: 20,
    } as CSSProperties,
    file: {
        background: '#F4F4F4',
        display: 'flex',
        height: 120,
        width: 120,
        position: 'relative',
        zIndex: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        border: `4px ${GREY}`,
    } as CSSProperties,
    info: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    } as CSSProperties,
    size: {
        marginBottom: '0.5em',
        justifyContent: 'center',
        display: 'flex',
    } as CSSProperties,
    name: {
        fontSize: 12,
        marginBottom: '0.5em',
    } as CSSProperties,
    progressBar: {
        bottom: 14,
        position: 'absolute',
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    } as CSSProperties,
    zoneHover: {
        borderColor: GREY_DIM,
    } as CSSProperties,
    default: {
        borderColor: GREY,
    } as CSSProperties,
    remove: {
        height: 23,
        position: 'absolute',
        right: 6,
        top: 6,
        width: 23,
    } as CSSProperties,
};

export default function Upload() {
    
    const { CSVReader } = useCSVReader();
    const [zoneHover, setZoneHover] = useState(false);
    const [removeHoverColor, setRemoveHoverColor] = useState(
        DEFAULT_REMOVE_HOVER_COLOR
        );
    const [inputData, setInputData] = useState([]);
    const [countUploaded, setCountUploaded] = useState(-1);
        
    async function POST() {
        setCountUploaded(0);
        for (let i = 1; i < inputData.length; i++) {
            if (inputData.length < 2 || inputData[i]?.length < 5) {
                alert('Data tidak valid');
                return;
            }
            const { data, error } = await registerMember(
                inputData[i][0],
                inputData[i][1],
                inputData[i][2],
                inputData[i][3],
                inputData[i][4]
            );

            if (error) {
                alert('Gagal menambahkan data ke database' + error);
                return;
            } else {
                setCountUploaded(countUploaded + 1);
            }
        }    
    }

    return (
        <div>
            <Header line1="Dashboard" line2="Masukkan Data" />
            <div className="pt-[70px]">
                <div className="relative flex flex-col p-3 gap-3">
                    <CSVReader
                        onUploadAccepted={(results: any) => {
                            setInputData(results.data);
                            console.log(results.data);
                            setZoneHover(false);
                        }}
                        onDragOver={(event: DragEvent) => {
                            event.preventDefault();
                            setZoneHover(true);
                        }}
                        onDragLeave={(event: DragEvent) => {
                            event.preventDefault();
                            setZoneHover(false);
                        }}>
                        {({
                            getRootProps,
                            acceptedFile,
                            ProgressBar,
                            getRemoveFileProps,
                            Remove,
                        }: any) => (
                        <>
                            <div {...getRootProps()} style={Object.assign({}, styles.zone, zoneHover && styles.zoneHover )}>
                            {acceptedFile ? (
                                <>
                                    <div style={styles.file}>
                                        <div style={styles.info}>
                                            <span style={styles.size}>
                                                {formatFileSize(acceptedFile.size)}
                                            </span>
                                            <span style={styles.name}>{acceptedFile.name}</span>
                                        </div>
                                        <div style={styles.progressBar}>
                                            <ProgressBar />
                                        </div>
                                        <div
                                            {...getRemoveFileProps()}
                                            style={styles.remove}
                                            onMouseOver={(event: Event) => {
                                                event.preventDefault();
                                                setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                                            }}
                                            onMouseOut={(event: Event) => {
                                                event.preventDefault();
                                                    setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                                            }}>
                                            <Remove color={removeHoverColor} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                'Drop CSV file here or click to upload'
                            )}
                            </div>
                        </>
                    )}
                    </CSVReader>

                    <Link href="/example.csv">
                        <button className="w-full bg-[#F4F4F4] regular custom-box-shadow  hover:translate-y-1 hover:no-box-shadow">
                            <h1 className="text-[#313131] py-1 text-xl ">CONTOH CSV</h1>
                        </button>
                    </Link>

                    <button className="sticky top-[80px] w-full bg-[#8973AE] regular custom-box-shadow  hover:translate-y-1 hover:no-box-shadow"
                        onClick={POST}
                    >
                        <h1 className="text-[#F4F4F4] py-1 text-xl ">SIMPAN {countUploaded !== -1? `${countUploaded}/${inputData.length}` : ""}</h1>
                    </button>

                    {
                        inputData.map((item: any, index: number) => {
                            return (
                                index === 0 ? null : (
                                    <div key={index} className='flex bg-[#F4F4F4] dashed custom-box-shadow p-4'>
                                        <div className="w-full">
                                            <p>{item[2]}</p>
                                            <p>{item[0]} / {item[1]}</p>
                                        </div>
                                        <button className="flex w-12 h-10 bg-[#DC7C7C] regular custom-box-shadow items-center justify-center hover:translate-y-1 hover:no-box-shadow"
                                            onClick={() => {
                                                setInputData(inputData.filter((_, i) => i !== index));
                                            }}
                                        >
                                            <img src="/icons/Trash.svg" alt="delete" color="#F4F4F4" />
                                        </button>
                                    </div>
                                )
                            );
                        })  
                    }
                    
                </div>
            </div>
        </div>
    );
}