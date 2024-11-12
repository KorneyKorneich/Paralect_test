import { JobSchema } from "./shemas";

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const getAllJobs = async () => {
    const jobs = await fetch(`${backendUrl}/getAllJobs`, {method: "GET"});

    const json: JobSchema[] = await jobs.json();
    return json;
}

export const createJob = async (jobData: JobSchema) => {
    const response = await fetch(`${backendUrl}/createJob`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(jobData)
    })
    const json = await response.json();

    return json;
}

export const updateJob = async (updatedJobData: JobSchema ) => {
    const response = await fetch(`${backendUrl}/updateJob`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "PUT",
        body: JSON.stringify(updatedJobData)
    })
    const json = await response.json();
    console.log(json);
    return json
}

export const deleteJob = async (id: string) => {
    
    const response = await fetch(`${backendUrl}/deleteJob`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "DELETE",
        body: JSON.stringify({id})
    })
    const json = await response.json();
    return json;
}
