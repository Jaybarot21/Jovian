import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Upload, CheckCircle, Briefcase } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const JobApplicationForm = ({ jobTitle = "" }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: jobTitle || "",
    experience: "",
    education: "",
    coverLetter: "",
    resume: null,
    relocate: false,
    workPermit: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: jobTitle || "",
        experience: "",
        education: "",
        coverLetter: "",
        resume: null,
        relocate: false,
        workPermit: false,
      });
    }, 3000);
  };

  return (
    <Card className="p-6 md:p-8 bg-white border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-green-800 mb-2">
            Application Received!
          </h3>
          <p className="text-green-700/80 max-w-md">
            Thank you for your interest in joining our team. We will review your
            application and contact you if there's a match.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <Briefcase className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-green-800">
              {jobTitle ? `Apply for ${jobTitle}` : "Job Application"}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name*</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name*</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone*</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="position">Position Applying For*</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) =>
                    handleSelectChange("position", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="International Sales Manager">
                      International Sales Manager
                    </SelectItem>
                    <SelectItem value="Quality Assurance Specialist">
                      Quality Assurance Specialist
                    </SelectItem>
                    <SelectItem value="Logistics Coordinator">
                      Logistics Coordinator
                    </SelectItem>
                    <SelectItem value="Agricultural Procurement Specialist">
                      Agricultural Procurement Specialist
                    </SelectItem>
                    <SelectItem value="Marketing Specialist">
                      Marketing Specialist
                    </SelectItem>
                    <SelectItem value="Finance Analyst">
                      Finance Analyst
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience*</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    handleSelectChange("experience", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Highest Education*</Label>
              <Select
                value={formData.education}
                onValueChange={(value) =>
                  handleSelectChange("education", value)
                }
                required
              >
                <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                  <SelectValue placeholder="Select education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Associate's Degree">
                    Associate's Degree
                  </SelectItem>
                  <SelectItem value="Bachelor's Degree">
                    Bachelor's Degree
                  </SelectItem>
                  <SelectItem value="Master's Degree">
                    Master's Degree
                  </SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Cover Letter*</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                required
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX)*</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-200 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-green-600" />
                    <p className="mb-2 text-sm text-green-700">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-green-600">
                      {formData.resume
                        ? formData.resume.name
                        : "PDF, DOC or DOCX (max. 5MB)"}
                    </p>
                  </div>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="relocate"
                  name="relocate"
                  checked={formData.relocate}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, relocate: checked }));
                  }}
                />
                <label
                  htmlFor="relocate"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700"
                >
                  I am willing to relocate if necessary
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="workPermit"
                  name="workPermit"
                  checked={formData.workPermit}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, workPermit: checked }));
                  }}
                  required
                />
                <label
                  htmlFor="workPermit"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-green-700"
                >
                  I confirm that I am legally authorized to work in India*
                </label>
              </div>
            </div>

            <div className="text-xs text-green-700/70">
              Fields marked with * are required
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl"
            >
              Submit Application
            </Button>

            <p className="text-xs text-center text-green-700/60">
              By submitting this application, you agree that we may keep your
              information on file for future opportunities and contact you
              regarding this or other positions.
            </p>
          </form>
        </>
      )}
    </Card>
  );
};

export default JobApplicationForm;
