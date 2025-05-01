import React from "react";

const Add = () => {
  return (
    <div className="mt-10 p-5 flex h-[100vh] w-full justify-center items-center fixed gap-10 bg-white">
      <div className="w-4/6 h-[80vh] border border-gray-200 rounded-xl shadow-md p-10 overflow-auto">
        <h1 className="text-2xl font-extrabold mb-8">ADD PROJECT</h1>

        <form className="flex flex-col gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input
              type="text"
              placeholder="Enter project name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              placeholder="Enter project description"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* GitHub Repo URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">GitHub Repository URL</label>
            <input
              type="url"
              placeholder="https://github.com/your-repo"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tags</label>
            <div className="flex gap-4 flex-wrap">
              {["Backend", "Frontend", "Devops", "Other"].map(tag => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-purple-600"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Add Project
          </button>
        </form>
      </div>

      {/* Right-side Preview Area */}
      <div className="w-2/6 h-[80vh] border border-gray-200 rounded-xl shadow-md p-10">
        {/* Optional Preview or Info */}
      </div>
    </div>
  );
};

export default Add;
