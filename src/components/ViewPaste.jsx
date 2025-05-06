import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';
const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  // Handle invalid paste
  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-700">
          <h2 className="text-2xl font-semibold mb-2">Paste Not Found</h2>
          <p>Please check the link or try again.</p>
        </div>
      </div>
    );
  }

  // Copy to clipboard handler
  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success('Content copied to clipboard!');
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center items-start pt-12 px-4 sm:px-6 lg:px-8 mt-3">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 sm:p-10 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">View Paste</h1>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Title</label>
          <input
            type="text"
            value={paste.title}
            disabled
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-800 focus:outline-none"
          />
        </div>

        {/* Content Textarea with Copy Icon */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-gray-600">Content</label>
          {/* Copy icon button */}
          <button
            onClick={handleCopy}
            className="absolute top-8 right-3 text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition"
            title="Copy to clipboard"
          >
            <FiCopy size={18} />
          </button>

          {/* Textarea */}
          <textarea
            className="w-full bg-gray-900 text-white p-4 pt-10 rounded-md resize-none focus:outline-none text-sm leading-relaxed"
            value={paste.content}
            disabled
            rows={20}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
