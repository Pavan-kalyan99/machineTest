import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import axios from 'axios';
export default function UploadCSV() {
    const [file, setFile] = useState(null);
    const API = import.meta.env.VITE_API_URL;

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            //     const addFile =
            //     await axiosInstance.post('/api/csv/upload', formData);
            // alert('Uploaded successfully');
            const res = await axios.post(`${API}/api/csv/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(res.data);

        }
        catch (err) {
            alert(err.response?.data?.error || 'Upload failed');

        }


    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upload CSV</h2>
            <form onSubmit={handleUpload}>
                <input type="file" accept=".csv,.xlsx,.xls" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
                <button type="submit" className="bg-purple-600 text-white p-2 rounded">Upload</button>
            </form>
        </div>
    );
}