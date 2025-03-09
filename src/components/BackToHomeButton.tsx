import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const BackToHomeButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link to="/">
        <Button className="rounded-full w-12 h-12 bg-green-600 hover:bg-green-700 shadow-lg">
          <Home className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default BackToHomeButton;
