import { useEffect, useState } from 'react';
import { getProjects, Project } from '@/services/projects';

const STRAPI_URL = 'http://localhost:1337';

const CustomWorkShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        console.log('Projects received in component:', data);
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getDescriptionText = (description: any) => {
    if (!description) return 'No description available';

    // Handle rich text structure
    if (Array.isArray(description)) {
      return description.map(block => {
        if (block.type === 'paragraph' && Array.isArray(block.children)) {
          return block.children
            .map(child => child.text || '')
            .join(' ');
        }
        return '';
      }).join(' ');
    }

    return 'No description available';
  };

  // Debug render
  console.log('Current projects state:', projects);

  return (
    <section className="py-16 bg-[#F9F5E7]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-playfair font-bold text-[#4A3C2A] mb-4">
            Examples of Our Custom Work
          </h2>
          <p className="text-[#8C7354]">
            Browse through some of our recent custom projects to get inspired for your own unique piece.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#8C7354]">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#8C7354]">No projects found. Please check the console for debugging information.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              console.log('Rendering project:', project);
              console.log('Project description before processing:', project.Description);
              const descriptionText = getDescriptionText(project.Description);
              console.log('Final description text:', descriptionText);
              
              return (
                <div key={project.id} className="bg-[#F9F5E7] rounded-lg overflow-hidden shadow-md">
                  <div className="h-64">
                    {project.Photo && (
                      <img 
                        src={`${STRAPI_URL}${project.Photo.url}`}
                        alt={project.Title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-playfair font-bold text-xl text-[#4A3C2A] mb-2">
                      {project.Title}
                    </h3>
                    <p className="text-[#8C7354] mb-4">
                      {descriptionText}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-white px-3 py-1 rounded-full text-[#8C7354]">
                        {project.Category}
                      </span>
                      <span className="text-[#4A3C2A] font-medium">
                        {project.Location}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <a 
            href="https://teromix.ge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-[#8C7354] hover:bg-[#4A3C2A] text-white font-medium rounded-md transition duration-300"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default CustomWorkShowcase; 