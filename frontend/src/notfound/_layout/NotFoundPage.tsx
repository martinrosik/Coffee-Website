import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Home, ArrowLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="p-10 min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Coffee className="w-32 h-32 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Looks like this page took a coffee break and never came back. Let's
            get you back to something brewing!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link to="/">
              <Home className="w-5 h-5" />
              Home Page
            </Link>
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Need help?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact our team
          </Link>
        </p>
      </div>
    </div>
  );
}
