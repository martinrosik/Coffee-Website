import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Croissant, IceCream, Cake } from 'lucide-react';

export default function Menu1() {
  const menuData = {
    coffee: [
      {
        id: 1,
        name: 'Espresso',
        description: 'Rich and bold single shot of Italian espresso',
        price: '2.50',
        sizes: ['Single', 'Double'],
        popular: true
      },
      {
        id: 2,
        name: 'Cappuccino',
        description: 'Espresso with steamed milk and foam',
        price: '3.80',
        sizes: ['Small', 'Medium', 'Large'],
        popular: true
      },
      {
        id: 3,
        name: 'Latte',
        description: 'Smooth espresso with steamed milk',
        price: '4.20',
        sizes: ['Small', 'Medium', 'Large'],
        popular: false
      },
      {
        id: 4,
        name: 'Americano',
        description: 'Espresso with hot water',
        price: '3.20',
        sizes: ['Small', 'Medium', 'Large'],
        popular: false
      },
      {
        id: 5,
        name: 'Flat White',
        description: 'Espresso with microfoam milk',
        price: '4.00',
        sizes: ['Medium'],
        popular: true
      },
      {
        id: 6,
        name: 'Mocha',
        description: 'Espresso with chocolate and steamed milk',
        price: '4.50',
        sizes: ['Small', 'Medium', 'Large'],
        popular: false
      }
    ],
    cold: [
      {
        id: 7,
        name: 'Iced Coffee',
        description: 'Cold brew coffee over ice',
        price: '3.80',
        sizes: ['Medium', 'Large'],
        popular: true
      },
      {
        id: 8,
        name: 'Iced Latte',
        description: 'Espresso with cold milk over ice',
        price: '4.50',
        sizes: ['Medium', 'Large'],
        popular: true
      },
      {
        id: 9,
        name: 'Frappuccino',
        description: 'Blended coffee with ice and cream',
        price: '5.20',
        sizes: ['Medium', 'Large'],
        popular: true
      },
      {
        id: 10,
        name: 'Cold Brew',
        description: 'Smooth cold-steeped coffee',
        price: '4.20',
        sizes: ['Medium', 'Large'],
        popular: false
      }
    ],
    food: [
      {
        id: 11,
        name: 'Croissant',
        description: 'Buttery, flaky French pastry',
        price: '2.80',
        popular: true
      },
      {
        id: 12,
        name: 'Chocolate Muffin',
        description: 'Rich chocolate chip muffin',
        price: '3.20',
        popular: false
      },
      {
        id: 13,
        name: 'Bagel with Cream Cheese',
        description: 'Fresh bagel with cream cheese spread',
        price: '4.50',
        popular: true
      },
      {
        id: 14,
        name: 'Avocado Toast',
        description: 'Smashed avocado on sourdough',
        price: '6.80',
        popular: true
      },
      {
        id: 15,
        name: 'Breakfast Sandwich',
        description: 'Egg, cheese, and bacon on English muffin',
        price: '5.50',
        popular: false
      }
    ],
    desserts: [
      {
        id: 16,
        name: 'Cheesecake',
        description: 'Creamy New York style cheesecake',
        price: '5.20',
        popular: true
      },
      {
        id: 17,
        name: 'Brownie',
        description: 'Fudgy chocolate brownie',
        price: '3.50',
        popular: true
      },
      {
        id: 18,
        name: 'Tiramisu',
        description: 'Classic Italian coffee-flavored dessert',
        price: '5.80',
        popular: false
      },
      {
        id: 19,
        name: 'Cinnamon Roll',
        description: 'Warm cinnamon roll with icing',
        price: '4.20',
        popular: true
      }
    ]
  };

  const MenuItem = ({ item }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {item.name}
              {item.popular && (
                <Badge variant="default" className="text-xs">
                  Popular
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="mt-2">{item.description}</CardDescription>
          </div>
          <span className="text-2xl font-bold text-primary ml-4">
            €{item.price}
          </span>
        </div>
      </CardHeader>
      {item.sizes && (
        <CardContent>
          <div className="flex gap-2">
            {item.sizes.map(size => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Menu</h1>
          <p className="text-lg text-muted-foreground">
            Handcrafted with love, served with care
          </p>
        </div>

        {/* Menu Tabs */}
        <Tabs defaultValue="coffee" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="coffee" className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              <span className="hidden sm:inline">Hot Coffee</span>
              <span className="sm:hidden">Hot</span>
            </TabsTrigger>
            <TabsTrigger value="cold" className="flex items-center gap-2">
              <IceCream className="w-4 h-4" />
              <span className="hidden sm:inline">Cold Drinks</span>
              <span className="sm:hidden">Cold</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-2">
              <Croissant className="w-4 h-4" />
              <span className="hidden sm:inline">Food</span>
              <span className="sm:hidden">Food</span>
            </TabsTrigger>
            <TabsTrigger value="desserts" className="flex items-center gap-2">
              <Cake className="w-4 h-4" />
              <span className="hidden sm:inline">Desserts</span>
              <span className="sm:hidden">Sweet</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coffee" className="space-y-4">
            {menuData.coffee.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="cold" className="space-y-4">
            {menuData.cold.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="food" className="space-y-4">
            {menuData.food.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </TabsContent>

          <TabsContent value="desserts" className="space-y-4">
            {menuData.desserts.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">
                All prices are in EUR. Ask about our daily specials and seasonal offerings!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}