import { useState } from "react";

const Add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // format as yyyy-mm-dd
  const [githubRepoUrl, setGithubRepoUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Use Apollo useMutation to send to backend
    console.log({
      name,
      description,
      status,
      startDate,
      githubRepoUrl,
      tags,
    });

    // Reset form
    setName("");
    setDescription("");
    setStatus("Not Started");
    setStartDate(new Date().toISOString().split('T')[0]);
    setGithubRepoUrl("");
    setTags([]);
  };

  const handleTagChange = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="mt-10 p-5 flex h-[100vh] w-full justify-center items-center fixed gap-10 bg-white">
      {/* Left: Form */}
      <div className="w-4/6 h-[80vh] border border-gray-200 rounded-xl shadow-md p-10 overflow-auto">
        <h1 className="text-2xl font-extrabold mb-8">ADD PROJECT</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter project name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">GitHub Repository URL</label>
            <input
              type="url"
              value={githubRepoUrl}
              onChange={(e) => setGithubRepoUrl(e.target.value)}
              placeholder="https://github.com/your-repo"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tags</label>
            <div className="flex gap-4 flex-wrap">
              {['Backend', 'Frontend', 'Devops', 'Other'].map(tag => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tags.includes(tag)}
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
            className="mt-4 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
          >
            Add Project
          </button>
        </form>
      </div>

      {/* Right: Preview (Optional) */}
      <div className="w-2/6 h-[80vh] border border-gray-200 rounded-xl shadow-md p-10">
        {/* Preview Project details */}
      </div>
    </div>
  );
};

export default Add;
