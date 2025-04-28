import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../graphql/mutations/projectMutation";
import { AddProjectInput, AddProjectResponse } from "../graphql/types/projectTypes";

const Add = () => {
  const [formData, setFormData] = useState<AddProjectInput>({
    name: "",
    description: "",
    status: "Not Started",
    startDate: new Date().toISOString().split("T")[0],
    githubRepoUrl: "",
    tags: [],
  });

  const [addProject, { loading, error }] = useMutation<AddProjectResponse, { variables: AddProjectInput }>(ADD_PROJECT, {
    onError(err) {
      console.error("Mutation error:", err);
    },
  });

  const handleChange = (field: keyof AddProjectInput, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagChange = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addProject({
        variables: formData,
      });

      console.log("Project added successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        status: "Not Started",
        startDate: new Date().toISOString().split("T")[0],
        githubRepoUrl: "",
        tags: [],
      });

    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  return (
    <div className="mt-10 p-5 flex h-[100vh] w-full justify-center items-center fixed gap-10 bg-white">
      <div className="w-4/6 h-[80vh] border border-gray-200 rounded-xl shadow-md p-10 overflow-auto">
        <h1 className="text-2xl font-extrabold mb-8">ADD PROJECT</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Project Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter project name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter project description"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
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
              value={formData.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* GitHub Repo URL */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">GitHub Repository URL</label>
            <input
              type="url"
              value={formData.githubRepoUrl}
              onChange={(e) => handleChange("githubRepoUrl", e.target.value)}
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
                    checked={formData.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="form-checkbox text-purple-600"
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Project"}
          </button>

          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
      </div>

      {/* Right Preview (optional) */}
      <div className="w-2/6 h-[80vh] border border-gray-200 rounded-xl shadow-md p-10">
        {/* Preview Area */}
      </div>
    </div>
  );
};

export default Add;
