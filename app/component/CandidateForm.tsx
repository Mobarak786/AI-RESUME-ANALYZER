"use client";

import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  linkedin: string;
  skills: string;
  experience: string;
}

export default function CandidateForm() {
  const [resume, setResume] = useState<File | null>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    linkedin: "",
    skills: "",
    experience: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setResume(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Create a FormData object
    const data = new FormData();

    // Append form fields to the FormData object
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("linkedin", formData.linkedin);
    data.append("skills", formData.skills);
    data.append("experience", formData.experience);
    if (resume) {
      data.append("resume", resume);
    }

    // Send data to the API
    try {
      const response = await fetch("/api/resume-parser", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      console.log("Submission Result:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <div className="w-full md:max-w-[80%] min-h-screen rounded-2xl">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Candidate Application
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-rows-2 gap-4 ">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* LinkedIn URL Field */}
            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn URL
              </label>
              <input
                id="linkedin"
                name="linkedin"
                type="url"
                placeholder="https://linkedin.com/in/johndoe"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Resume Upload Field */}
            <div>
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700"
              >
                Resume (PDF or Text)
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Skills Field */}
          <div>
            <label
              htmlFor="skills"
              className="block text-sm font-medium text-gray-700"
            >
              Skills
            </label>
            <textarea
              id="skills"
              name="skills"
              placeholder="JavaScript, React, Node.js, etc."
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
          </div>

          {/* Experience Field */}
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              placeholder="Describe your work experience..."
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
