import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { GrGallery } from "react-icons/gr";

export default function CoffeeGallery() {
  const galleryItems = [
    {
      id: 1,
      title: "Espresso Perfection",
      category: "Coffee",
      image:
        "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=1200&h=900&fit=crop",
      description: "Rich and bold espresso shots",
    },
    {
      id: 2,
      title: "Latte Art",
      category: "Coffee",
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1200&h=900&fit=crop",
      description: "Beautiful handcrafted latte art",
    },
    {
      id: 3,
      title: "Cozy Interior",
      category: "Atmosphere",
      image:
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&h=900&fit=crop",
      description: "Warm and inviting space",
    },
    {
      id: 4,
      title: "Fresh Pastries",
      category: "Food",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&h=900&fit=crop",
      description: "Delicious homemade treats",
    },
    {
      id: 5,
      title: "Cappuccino Love",
      category: "Coffee",
      image:
        "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=1200&h=900&fit=crop",
      description: "Perfectly foamed cappuccino",
    },
    {
      id: 6,
      title: "Coffee Beans",
      category: "Ingredients",
      image:
        "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&h=900&fit=crop",
      description: "Premium roasted beans",
    },
    {
      id: 7,
      title: "Brewing Process",
      category: "Coffee",
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=900&fit=crop",
      description: "Artisan coffee making",
    },
    {
      id: 8,
      title: "Sweet Treats",
      category: "Food",
      image:
        "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?w=1200&h=900&fit=crop",
      description: "Cakes and desserts",
    },
    {
      id: 9,
      title: "Outdoor Seating",
      category: "Atmosphere",
      image:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=900&fit=crop",
      description: "Enjoy your coffee outside",
    },
  ];

  const categories = [
    "All",
    ...new Set(galleryItems.map((item) => item.category)),
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GrGallery className="w-12 h-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Our Gallery</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Explore our coffee, food, and atmosphere
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden group relative cursor-pointer rounded-2xl border-none shadow-md hover:shadow-xl transition-all duration-500"
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-90"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
                  <h3 className="text-white text-xl font-semibold opacity-90 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-200 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
              <CardContent className="p-4 bg-card rounded-b-2xl">
                <Badge variant="secondary" className="mb-2">
                  {item.category}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={28} />
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-2xl object-contain animate-in fade-in zoom-in duration-300"
          />
        </div>
      )}
    </div>
  );
}
