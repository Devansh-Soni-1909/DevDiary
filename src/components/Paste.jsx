import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (idToRemove) => {
    dispatch(removeFromPastes(idToRemove));
    toast.success('Paste deleted!', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!', {
          position: 'top-right',
          autoClose: 2000,
        });
      })
      .catch(() => {
        toast.error('Failed to copy', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
  };

  const handleShare = (pasteId) => {
    const shareLink = `${window.location.origin}/paste/${pasteId}`;
    navigator.clipboard.writeText(shareLink)
      .then(() => toast.success('Link copied to clipboard!', {
        position: 'top-right',
        autoClose: 2000,
      }))
      .catch(() => toast.error('Failed to copy link', {
        position: 'top-right',
        autoClose: 2000,
      }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow-md 
            border-none focus:outline-none focus:ring-2 focus:ring-blue-400 
            text-gray-700 placeholder-gray-400 transition-all duration-300"
          />
          <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 
            text-gray-400"></i>
        </div>
      </div>

      {/* Paste List */}
      <div className="grid gap-6 max-w-7xl mx-auto">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl 
              transition-shadow duration-300 border border-gray-200 min-w-[600px]"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {paste.title}
              </h2>

              {/* Content (Truncated) */}
              <div className="relative max-h-20 overflow-hidden">
                <p className="text-gray-600 text-sm">
                  {paste.content}
                </p>
                {paste.content.length > 100 && (
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t 
                    from-white to-transparent flex items-end justify-end">
                    <span className="text-blue-500 text-xs font-medium pr-2">
                      Read more
                    </span>
                  </div>
                )}
              </div>

              {/* Action Icons */}
              <div className="flex gap-4 mt-4">
                <a
                  href={`/?pasteId=${paste?._id}`}
                  className="p-2 text-blue-500 hover:text-blue-600 
                  transition-colors duration-200"
                  title="Edit"
                >
                  <i className="fas fa-pencil-alt text-lg"></i>
                </a>
                <a
                  href={`/pastes/${paste?._id}`}
                  className="p-2 text-green-500 hover:text-green-600 
                  transition-colors duration-200"
                  title="View"
                >
                  <i className="fas fa-eye text-lg"></i>
                </a>
                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="p-2 text-red-500 hover:text-red-600 
                  transition-colors duration-200"
                  title="Delete"
                >
                  <i className="fas fa-trash text-lg"></i>
                </button>
                <button
                  onClick={() => handleCopy(paste.content)}
                  className="p-2 text-gray-500 hover:text-gray-600 
                  transition-colors duration-200"
                  title="Copy"
                >
                  <i className="fas fa-copy text-lg"></i>
                </button>
                <button
                  onClick={() => handleShare(paste._id)}
                  className="p-2 text-purple-500 hover:text-purple-600 
                  transition-colors duration-200"
                  title="Share"
                >
                  <i className="fas fa-share-alt text-lg"></i>
                </button>
              </div>

              {/* Created At */}
              <p className="text-xs text-gray-400 mt-4">
                Created: {new Date(paste.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;