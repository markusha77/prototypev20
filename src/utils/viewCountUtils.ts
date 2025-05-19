/**
 * Utility functions for handling view counts
 */

/**
 * Get the view count for a specific project
 * @param projectId - The ID of the project
 * @returns The number of views for the project
 */
export const getProjectViewCount = (projectId: string): number => {
  try {
    const viewCountKey = `project-views-${projectId}`;
    const storedCount = localStorage.getItem(viewCountKey);
    return storedCount ? parseInt(storedCount, 10) : 0;
  } catch (error) {
    console.warn('Failed to get view count:', error);
    return 0;
  }
};

/**
 * Increment the view count for a specific project
 * @param projectId - The ID of the project
 * @returns The updated view count
 */
export const incrementProjectViewCount = (projectId: string): number => {
  try {
    const viewCountKey = `project-views-${projectId}`;
    const currentCount = getProjectViewCount(projectId);
    const newCount = currentCount + 1;
    
    localStorage.setItem(viewCountKey, newCount.toString());
    return newCount;
  } catch (error) {
    console.warn('Failed to increment view count:', error);
    return getProjectViewCount(projectId);
  }
};

/**
 * Reset the view count for a specific project
 * @param projectId - The ID of the project
 */
export const resetProjectViewCount = (projectId: string): void => {
  try {
    const viewCountKey = `project-views-${projectId}`;
    localStorage.removeItem(viewCountKey);
  } catch (error) {
    console.warn('Failed to reset view count:', error);
  }
};
