// src/components/NoteModal.jsx
import React, { useState } from "react";

export default function NoteModal({ open, onClose }) {
  const [note, setNote] = useState("");

  const handleSave = () => {
    alert("📝 Note saved: " + note);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative shadow-xl">
        <h2 className="text-2xl font-semibold mb-4">New Health Note</h2>
        <textarea
          rows="6"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Describe your symptoms, feelings, or anything important..."
          className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-blue-500"
        ></textarea>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-2 rounded-lg text-white"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}