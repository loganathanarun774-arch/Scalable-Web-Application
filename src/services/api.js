const MOCK_DELAY = 800;

export const mockApi = async (data, shouldSucceed = true) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve({ data });
            } else {
                reject(new Error("Operation failed"));
            }
        }, MOCK_DELAY);
    });
};
