import { Coffee, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { isAdmin, logout } from "@/_shared/utils/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const admin = await isAdmin();
      setAdminLoggedIn(admin);
    };
    checkAdmin();
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
    { name: "About us", path: "/about" },
  ];

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Coffee className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                CoffeeBean
              </h1>
              <p className="text-xs text-muted-foreground">
                Artisan Coffee House
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <Link to="/" target="_blank">
              <Button className="w-full cursor-pointer">Order Now</Button>
            </Link>

            {adminLoggedIn && (
              <>
                <Link to="/admin">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="cursor-pointer"
                  >
                    Admin Panel
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={logout}
                  className="cursor-pointer"
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-5 flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link to="/" target="_blank">
                  <Button
                    className="w-full cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    Order Now
                  </Button>
                </Link>

                {adminLoggedIn && (
                  <>
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button
                        className="w-full cursor-pointer"
                        variant="secondary"
                      >
                        Admin Panel
                      </Button>
                    </Link>
                    <Button
                      className="w-full cursor-pointer"
                      variant="destructive"
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
