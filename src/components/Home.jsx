import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId");

    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            }
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            // update
            dispatch(updateToPastes(paste));
        } else {
            // create
            dispatch(addToPastes(paste));
        }

        // after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-10 px-4 mt-8">
            {/* Updated container width to max-w-7xl to match Paste.jsx */}
            <div className="w-full max-w-7xl min-w-[600px] bg-white rounded-xl shadow-lg p-6 space-y-6">
                {/* Added min-w-[600px] to ensure consistent minimum width with Paste.jsx cards */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <input
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-500 text-black"
                    />

                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition font-semibold"
                        onClick={createPaste}
                    >
                        {pasteId ? "Update My Paste" : "Create My Paste"}
                    </button>
                </div>

                <div>
                    <textarea
                        className="w-full bg-gray-900 text-white p-4 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        rows={20}
                        placeholder="Write your content here..."
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default Home;