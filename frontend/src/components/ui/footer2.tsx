import { Coffee, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "Coffee House",
    title: "Brew & Bean",
    url: "#",
  },
  tagline = "Crafting moments, one cup at a time.",
  menuItems = [
    {
      title: "Menu",
      links: [
        { text: "Coffee", url: "#" },
        { text: "Tea", url: "#" },
        { text: "Pastries", url: "#" },
        { text: "Breakfast", url: "#" },
        { text: "Lunch", url: "#" },
      ],
    },
    {
      title: "About",
      links: [
        { text: "Our Story", url: "#" },
        { text: "Our Beans", url: "#" },
        { text: "Sustainability", url: "#" },
        { text: "Careers", url: "#" },
      ],
    },
    {
      title: "Visit Us",
      links: [
        { text: "123 Coffee Street", url: "#", icon: <MapPin className="w-4 h-4" /> },
        { text: "(555) 123-4567", url: "tel:5551234567", icon: <Phone className="w-4 h-4" /> },
        { text: "hello@brewbean.com", url: "mailto:hello@brewbean.com", icon: <Mail className="w-4 h-4" /> },
      ],
    },
  ],
  copyright = "© 2024 Brew & Bean. All rights reserved.",
  bottomLinks = [
    { text: "Privacy Policy", url: "#" },
    { text: "Terms of Service", url: "#" },
  ],
}: Footer2Props) => {
  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, url: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, url: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, url: "#", label: "Twitter" },
  ];

  return (
    <footer className="relative bg-background text-foreground overflow-hidden">
      {/* Optional decorative circles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-muted blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-muted/70 blur-3xl"></div>
      </div>

      <div className="container relative py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Logo & Brand */}
          <div className="lg:col-span-5 space-y-6">
            <a href={logo.url} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 backdrop-blur-sm border border-border flex items-center justify-center">
                <Coffee className="w-7 h-7 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{logo.title}</span>
                <span className="text-muted-foreground text-sm">{tagline}</span>
              </div>
            </a>
            <p className="text-muted-foreground text-sm max-w-md">
              Open Daily: 7:00 AM - 8:00 PM<br />
              Fresh coffee, warm atmosphere, great company.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted/30 hover:bg-muted/50 border border-border hover:border-border/70 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Menu Sections */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {menuItems.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="font-semibold text-lg border-b border-border pb-2">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                      >
                        {link.icon && (
                          <span className="group-hover:text-foreground/70 transition-colors">{link.icon}</span>
                        )}
                        <span className="text-sm font-medium">{link.text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>{copyright}</p>
          <ul className="flex gap-6">
            {bottomLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.url}
                  className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export { Footer2 };
