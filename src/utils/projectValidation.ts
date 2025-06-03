
import { ProjectData } from '@/types/project';

export const validateProjectData = (projectData: ProjectData, projectName: string): boolean => {
  console.log(`Validating project data for: ${projectName}`);
  
  const requiredFields = [
    'title', 'subtitle', 'description', 'year', 'client', 'role',
    'images', 'heroTitle', 'heroSubtitle', 'heroYear', 'heroClient',
    'heroRole', 'mainDescription', 'projectType', 'projectCategory',
    'teamType', 'duration', 'approach', 'development'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = (projectData as any)[field];
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return !value || value.trim() === '';
  });

  if (missingFields.length > 0) {
    console.error(`Missing required fields in ${projectName}:`, missingFields);
    return false;
  }

  // Validate images array
  if (!Array.isArray(projectData.images) || projectData.images.length === 0) {
    console.error(`${projectName}: images should be a non-empty array`);
    return false;
  }

  console.log(`${projectName}: validation passed`);
  return true;
};

export const validateAllProjects = () => {
  console.log('Starting project data validation...');
  
  try {
    // Import and validate each project
    import('@/data/invisibleProject').then(({ invisibleProjectData }) => {
      validateProjectData(invisibleProjectData, 'Invisible Project');
    });
    
    import('@/data/learnProject').then(({ learnProjectData }) => {
      validateProjectData(learnProjectData, 'Learn Project');
    });
    
    import('@/data/thermalTraceProject').then(({ thermalTraceProjectData }) => {
      validateProjectData(thermalTraceProjectData, 'Thermal Trace Project');
    });
    
    // Add other projects as needed
    console.log('Project validation completed');
    
  } catch (error) {
    console.error('Error during project validation:', error);
  }
};
