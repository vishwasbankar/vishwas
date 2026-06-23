import axios from "axios";

// ✅ IMPORTANT: use env variable instead of localhost
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});


/**
 * @description Service to generate interview report
 */
export const generateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile
}) => {

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview/", formData);

    return response.data;
};


/**
 * @description Get interview report by ID
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
};


/**
 * @description Get all interview reports
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/");
    return response.data;
};


/**
 * @description Generate and download resume PDF
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(
        `/api/interview/resume/pdf/${interviewReportId}`,
        null,
        { responseType: "blob" }
    );

    // ✅ auto download fix
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "resume.pdf");

    document.body.appendChild(link);
    link.click();
    link.remove();
};