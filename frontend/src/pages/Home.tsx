const Home = () => {
    const projects = [
      { id: 1, title: 'Project One', description: 'Description of project one.' },
      { id: 2, title: 'Project Two', description: 'Description of project two.' },
      { id: 3, title: 'Project Three', description: 'Description of project three.' },
      // You can replace these with your real fetched data later
    ];
  
    return (
      <div className="mt-28 p-5 min-h-[100vh] w-full bg-white">
        {/* Card Container */}
        <div className="w-full shadow-md border border-gray-200 p-10 rounded-2xl">
        <h1 className="font-extrabold text-3xl pb-10 text-red-400">PROJECTS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  