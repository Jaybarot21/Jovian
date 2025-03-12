import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Briefcase, Clock, GraduationCap } from "lucide-react";

interface JobCardProps {
  job: {
    title: string;
    department: string;
    location: string;
    type: string;
    experience: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
  };
  index: number;
  onApply: () => void;
}

const JobCard = ({ job, index, onApply }: JobCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="p-6 border-green-200 hover:border-green-500 transition-all duration-300 shadow-sm hover:shadow-md">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-bold text-green-800">{job.title}</h3>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                {job.department}
              </Badge>
            </div>

            <p className="text-green-700/80 mb-4">{job.description}</p>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-green-700">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-green-700">
                <Briefcase className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.type}</span>
              </div>
              <div className="flex items-center text-green-700">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{job.experience}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-green-800 mb-2">
                Key Responsibilities:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {job.responsibilities.slice(0, 3).map((item, i) => (
                  <li key={i} className="text-sm text-green-700/80">
                    {item}
                  </li>
                ))}
                {job.responsibilities.length > 3 && (
                  <li className="text-sm text-green-700/80">And more...</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-green-800 mb-2">
                Requirements:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {job.requirements.slice(0, 2).map((item, i) => (
                  <li key={i} className="text-sm text-green-700/80">
                    {item}
                  </li>
                ))}
                {job.requirements.length > 2 && (
                  <li className="text-sm text-green-700/80">And more...</li>
                )}
              </ul>
            </div>
          </div>

          <div className="md:ml-4 flex-shrink-0">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto"
              onClick={onApply}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default JobCard;
