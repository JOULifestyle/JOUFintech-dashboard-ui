// apiService.ts
export const getUserData = async () => {
    const response = await fetch('/api/user');
    return response.json();
};
