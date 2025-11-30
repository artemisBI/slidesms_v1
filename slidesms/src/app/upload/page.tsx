"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { parseCSV, ParseResult, Contact } from '@/utils/csvHelpers';
import BackgroundParticles from '@/components/BackgroundParticles';
import styles from './page.module.css';

export default function UploadPage() {
    const [result, setResult] = useState<ParseResult | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        setIsProcessing(true);
        try {
            const file = acceptedFiles[0];
            const parseResult = await parseCSV(file);
            setResult(parseResult);
        } catch (error) {
            console.error('Error parsing CSV:', error);
            alert('Failed to parse CSV file.');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
            'application/vnd.ms-excel': ['.csv', '.xls', '.xlsx']
        },
        multiple: false,
        noClick: true, // Disable click to open file picker
        noKeyboard: true // Disable keyboard to open file picker
    });

    const handleReset = () => {
        setResult(null);
    };

    const handleConfirm = async () => {
        if (!result || result.valid.length === 0) {
            alert('No valid contacts to upload.');
            return;
        }

        setIsUploading(true);
        console.log(JSON.stringify({ contacts: result.valid }, null, 2));

        try {
            // 👉 This fetch call is the bridge to the backend API that will store contacts in Supabase (currently just a placeholder).
            const response = await fetch('/api/contacts/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contacts: result.valid
                })
            });

            const data = await response.json();
            console.log('Server response:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            alert(`Success! ${data.inserted} contacts uploaded.`);
            setResult(null); // Reset after successful upload
        } catch (error) {
            console.error('Error uploading contacts:', error);
            alert(error instanceof Error ? error.message : 'Failed to upload contacts.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <main className={styles.main}>
            <BackgroundParticles />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Upload Contacts</h1>
                    <p className={styles.subtitle}>Upload your CSV file to import contacts. We'll automatically detect names and phone numbers.</p>
                </div>

                {!result ? (
                    <>
                        <div
                            {...getRootProps()}
                            className={`${styles.uploadZone} ${isDragActive ? styles.active : ''}`}
                        >
                            <input {...getInputProps()} />
                            <svg className={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className={styles.uploadText}>
                                {isProcessing ? 'Processing...' : 'Drag & drop your CSV here'}
                            </p>
                            <p className={styles.uploadSubtext}>or</p>
                            <button
                                type="button"
                                onClick={open}
                                className={`${styles.button} ${styles.primaryButton}`}
                                disabled={isProcessing}
                            >
                                Browse Files
                            </button>
                            <p className={styles.uploadSubtext} style={{ marginTop: '0.5rem' }}>Supports CSV files with Name, Phone, and Email columns</p>
                        </div>
                    </>
                ) : (
                    <div className={styles.results}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statValue} style={{ color: '#10B981' }}>{result.valid.length}</div>
                                <div className={styles.statLabel}>Valid Contacts</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statValue} style={{ color: '#EF4444' }}>{result.invalid.length}</div>
                                <div className={styles.statLabel}>Invalid Rows</div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statValue} style={{ color: '#F59E0B' }}>{result.duplicates}</div>
                                <div className={styles.statLabel}>Duplicates Removed</div>
                            </div>
                        </div>

                        <div className={styles.previewSection}>
                            <div className={styles.previewHeader}>
                                Preview (First 50 Valid Contacts)
                            </div>
                            <div className={styles.tableWrapper}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.valid.slice(0, 50).map((contact, i) => (
                                            <tr key={i}>
                                                <td>
                                                    {[
                                                        contact.title,
                                                        contact.firstname,
                                                        contact.alias ? `"${contact.alias}"` : null,
                                                        contact.lastname,
                                                        contact.suffix
                                                    ].filter(Boolean).join(' ')}
                                                </td>
                                                <td>{contact.phone}</td>
                                                <td>{contact.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <button onClick={handleReset} className={`${styles.button} ${styles.secondaryButton}`}>
                                Upload Different File
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`${styles.button} ${styles.primaryButton}`}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : 'Confirm & Import'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
