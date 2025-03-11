import { useSupabaseRealtime } from "../hooks/useSupabaseRealtime";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

const SocialLinks = () => {
  const { data: links, loading } = useSupabaseRealtime("social_links");

  const platformIcons = {
    facebook: <Facebook className="w-5 h-5" />,
    twitter: <Twitter className="w-5 h-5" />,
    instagram: <Instagram className="w-5 h-5" />,
    linkedin: <Linkedin className="w-5 h-5" />,
    youtube: <Youtube className="w-5 h-5" />,
    website: <Globe className="w-5 h-5" />,
    other: <LinkIcon className="w-5 h-5" />,
  };

  if (loading) return null;

  const activeLinks = links.filter((link) => link.is_active);

  if (activeLinks.length === 0) return null;

  return (
    <div className="flex space-x-4">
      {activeLinks.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          {platformIcons[link.platform]}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
