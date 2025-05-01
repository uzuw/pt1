import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/queries/projectQueries";

const AllProjects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p className="p-10">Loading projects...</p>;
  if (error) return <p className="p-10 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.getProjects.map((project: any) => (
          <div
            key={project.id}
            className="border p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-sm mt-2">
              <strong>Status:</strong> {project.status}
            </p>
            <p className="text-sm">
              <strong>Start:</strong>{" "}
              {new Date(project.startDate).toLocaleDateString()}
            </p>
            {project.githubRepoUrl && (
              <a
                href={project.githubRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 block mt-2"
              >
                GitHub Repo
              </a>
            )}
            <div className="mt-2 flex gap-2 flex-wrap">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProjects;
