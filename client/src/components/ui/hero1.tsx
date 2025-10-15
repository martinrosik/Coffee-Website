import { BiSolidCoffeeBean } from "react-icons/bi";
import { Link } from "react-router-dom"; // ✅ Import Link
import { Button } from "@/components/ui/button";

interface Hero1Props {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image: {
    src: string;
    alt: string;
  };
}

const Hero1 = ({
  heading = "CoffeeBean",
  description = "Home of the best coffee in the world. Experience the rich aroma and exquisite taste of our handpicked beans, roasted to perfection just for you.",
  buttons = {
    primary: {
      text: "Menu",
      url: "/menu",
    },
    secondary: {
      text: "About us",
      url: "/about",
    },
  },
  image = {
    src: "/assets/img/image1.jpg",
    alt: "Hero section demo image showing interface components",
  },
}: Hero1Props) => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <Link to={buttons.primary.url}>{buttons.primary.text}</Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link
                    to={buttons.secondary.url}
                    className="flex items-center gap-1"
                  >
                    {buttons.secondary.text}
                    <BiSolidCoffeeBean className="size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero1 };
