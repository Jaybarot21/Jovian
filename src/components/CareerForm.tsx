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
import { useTranslation } from "../lib/translations";

const CareerForm = ({ jobTitle = "" }) => {
  const { t } = useTranslation();
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

    // Create FormData object for file upload
    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "resume" && formData[key]) {
        submitData.append("resume", formData[key]);
      } else if (key !== "resume") {
        submitData.append(key, formData[key]);
      }
    });

    // Submit to Supabase
    fetch("/api/submit-career", {
      method: "POST",
      body: submitData,
    })
      .then((response) => {
        if (response.ok) {
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
        } else {
          alert(t("formSubmitError"));
        }
      })
      .catch(() => {
        alert(t("formSubmitError"));
      });
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
            {t("applicationReceived")}
          </h3>
          <p className="text-green-700/80 max-w-md">
            {t("applicationReceivedMessage")}
          </p>
        </motion.div>
      ) : (
        <>
          <div className="flex items-center mb-6">
            <Briefcase className="h-6 w-6 text-green-600 mr-3" />
            <h2 className="text-xl font-bold text-green-800">
              {jobTitle ? `${t("applyFor")} ${jobTitle}` : t("jobApplication")}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("firstName")}*</Label>
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
                <Label htmlFor="lastName">{t("lastName")}*</Label>
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
                <Label htmlFor="email">{t("email")}*</Label>
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
                <Label htmlFor="phone">{t("phone")}*</Label>
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
                <Label htmlFor="position">{t("positionApplyingFor")}*</Label>
                <Select
                  value={formData.position}
                  onValueChange={(value) =>
                    handleSelectChange("position", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder={t("selectPosition")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="International Sales Manager">
                      {t("internationalSalesManager")}
                    </SelectItem>
                    <SelectItem value="Quality Assurance Specialist">
                      {t("qualityAssuranceSpecialist")}
                    </SelectItem>
                    <SelectItem value="Logistics Coordinator">
                      {t("logisticsCoordinator")}
                    </SelectItem>
                    <SelectItem value="Agricultural Procurement Specialist">
                      {t("agriculturalProcurementSpecialist")}
                    </SelectItem>
                    <SelectItem value="Marketing Specialist">
                      {t("marketingSpecialist")}
                    </SelectItem>
                    <SelectItem value="Finance Analyst">
                      {t("financeAnalyst")}
                    </SelectItem>
                    <SelectItem value="Other">{t("other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">{t("yearsOfExperience")}*</Label>
                <Select
                  value={formData.experience}
                  onValueChange={(value) =>
                    handleSelectChange("experience", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                    <SelectValue placeholder={t("selectExperience")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">{t("years01")}</SelectItem>
                    <SelectItem value="1-3">{t("years13")}</SelectItem>
                    <SelectItem value="3-5">{t("years35")}</SelectItem>
                    <SelectItem value="5-10">{t("years510")}</SelectItem>
                    <SelectItem value="10+">{t("years10Plus")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">{t("highestEducation")}*</Label>
              <Select
                value={formData.education}
                onValueChange={(value) =>
                  handleSelectChange("education", value)
                }
                required
              >
                <SelectTrigger className="bg-white border-green-200 text-green-800 focus:border-green-500">
                  <SelectValue placeholder={t("selectEducation")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High School">{t("highSchool")}</SelectItem>
                  <SelectItem value="Associate's Degree">
                    {t("associatesDegree")}
                  </SelectItem>
                  <SelectItem value="Bachelor's Degree">
                    {t("bachelorsDegree")}
                  </SelectItem>
                  <SelectItem value="Master's Degree">
                    {t("mastersDegree")}
                  </SelectItem>
                  <SelectItem value="PhD">{t("phd")}</SelectItem>
                  <SelectItem value="Other">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">{t("coverLetter")}*</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder={t("coverLetterPlaceholder")}
                required
                className="bg-white border-green-200 text-green-800 placeholder:text-green-400 focus:border-green-500 min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resume">{t("uploadResume")}*</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-200 border-dashed rounded-lg cursor-pointer bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-green-600" />
                    <p className="mb-2 text-sm text-green-700">
                      <span className="font-semibold">
                        {t("clickToUpload")}
                      </span>{" "}
                      {t("orDragAndDrop")}
                    </p>
                    <p className="text-xs text-green-600">
                      {formData.resume
                        ? formData.resume.name
                        : t("resumeFileTypes")}
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
                  {t("willingToRelocate")}
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
                  {t("legallyAuthorized")}*
                </label>
              </div>
            </div>

            <div className="text-xs text-green-700/70">
              {t("requiredFields")}
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg rounded-xl"
            >
              {t("submitApplication")}
            </Button>

            <p className="text-xs text-center text-green-700/60">
              {t("applicationDisclaimer")}
            </p>
          </form>
        </>
      )}
    </Card>
  );
};

export default CareerForm;
