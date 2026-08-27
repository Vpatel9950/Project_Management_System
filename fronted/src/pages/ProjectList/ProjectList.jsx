import React, { useState, useEffect } from "react";
import { projectService } from "../../services/projectService";
import ProjectCard from "../Project/ProjectCard";
import { Search, Filter, Layers, RefreshCw, Plus } from "lucide-react";

export const tags = [
  "All",
  "react",
  "nextJs",
  "spring boot",
  "mysql",
  "mongodb",
  "angular",
  "python",
  "flask",
  "django",
];

const categories = ["all", "fullstack", "frontend", "backend"];

export const ProjectList = ({ onOpenCreateProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      if (searchKeyword.trim()) {
        const results = await projectService.searchProjects(searchKeyword.trim());
        setProjects(results || []);
      } else {
        const data = await projectService.getProjects(
          selectedCategory,
          selectedTag
        );
        setProjects(data || []);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
      setError("Failed to connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, selectedTag, searchKeyword]);

  const handleDeleteProject = async (projectId) => {
    try {
      await projectService.deleteProject(projectId);
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (err) {
      alert("Failed to delete project. You may need owner privileges.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Layers className="w-8 h-8 text-indigo-400" />
            Projects Workspace
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your backend-synchronized software projects & team members
          </p>
        </div>

        {onOpenCreateProject && (
          <button
            onClick={onOpenCreateProject}
            className="self-start md:self-auto px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Project</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="backdrop-blur-xl bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 sticky top-24 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-400" />
                Filters
              </h2>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedTag("All");
                  setSearchKeyword("");
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="mt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Category
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                      selectedCategory === cat
                        ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-indigo-500"
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Technologies / Tags
              </h3>
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {tags.map((t) => (
                  <label
                    key={t}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium cursor-pointer transition-colors ${
                      selectedTag === t
                        ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="tag"
                      value={t}
                      checked={selectedTag === t}
                      onChange={() => setSelectedTag(t)}
                      className="accent-purple-500"
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search projects by name..."
              className="w-full pl-12 pr-4 py-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-md"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={fetchProjects}
                className="flex items-center gap-1 text-xs font-bold text-rose-300 hover:underline"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          )}

          {/* Grid of Projects */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-56 rounded-2xl bg-slate-900/40 border border-slate-800 animate-pulse p-6 space-y-4"
                >
                  <div className="h-6 w-24 bg-slate-800 rounded-full"></div>
                  <div className="h-6 w-3/4 bg-slate-800 rounded-md"></div>
                  <div className="h-4 w-full bg-slate-800/60 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 backdrop-blur-xl bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">No Projects Found</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-sm mx-auto">
                No projects match your criteria. Try creating a new project or resetting filters.
              </p>
              {onOpenCreateProject && (
                <button
                  onClick={onOpenCreateProject}
                  className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl"
                >
                  Create First Project
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDeleteProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
