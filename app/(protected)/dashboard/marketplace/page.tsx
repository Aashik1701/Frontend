"use client"
import React, { useState, useRef } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, ShoppingCart, Wallet, Upload, X } from 'lucide-react';

// Initial product data focused on handwoven textiles and traditional crafts
const initialProducts = [
  {
    id: 1,
    name: "Handwoven Silk Saree",
    price: 250,
    cryptoPrice: 0.075, // Estimated ETH price
    description: "Exquisite hand-woven silk saree with traditional kanthi work, crafted by women artisans from rural Karnataka.",
    category: "Traditional Wear",
    image: "/saree.jpg"
  },
  {
    id: 2,
    name: "Handloom Cotton Dress",
    price: 120,
    cryptoPrice: 0.036, // Estimated ETH price
    description: "Comfortable handloom cotton dress with block print design, supporting local weaving communities.",
    category: "Clothing",
    image: "/cotton.jpg"
  },
  {
    id: 3,
    name: "Organic Cotton Towel Set",
    price: 75,
    cryptoPrice: 0.022, // Estimated ETH price
    description: "Set of 3 hand-woven organic cotton towels, naturally dyed using eco-friendly techniques.",
    category: "Home Textiles",
    image: "/towel.jpg"
  },
  {
    id: 4,
    name: "Kantha Embroidered Shawl",
    price: 180,
    cryptoPrice: 0.054, // Estimated ETH price
    description: "Intricate Kantha embroidered shawl, handcrafted by women artisans from West Bengal.",
    category: "Accessories",
    image: "/shawl.jpg"
  },
  {
    id: 5,
    name: "Handwoven Ikat Dupatta",
    price: 95,
    cryptoPrice: 0.028, // Estimated ETH price
    description: "Vibrant Ikat weave dupatta showcasing traditional weaving techniques from Odisha.",
    category: "Accessories",
    image: "/dup.jpg"
  }
];

const MarketplacePage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'row'
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: null
  });
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // File type and size validation
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image (JPEG, PNG, or GIF)');
        return;
      }

      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Create a file reader to convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewProduct(prev => ({
      ...prev,
      image: null
    }));
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Validation
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
      alert('Please fill in all required fields and upload an image');
      return;
    }

    const productToAdd = {
      ...newProduct,
      id: products.length + 1,
      price: parseFloat(newProduct.price),
      cryptoPrice: parseFloat(newProduct.price) * 0.0003, // Simple ETH conversion
    };

    setProducts([...products, productToAdd]);
    
    // Reset form
    setNewProduct({
      name: '',
      price: '',
      description: '',
      category: '',
      image: null
    });
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Women's Artisan Marketplace
        </h1>
        <div className="flex items-center space-x-4">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
          <Button 
            variant={viewMode === 'row' ? 'default' : 'outline'}
            onClick={() => setViewMode('row')}
          >
            Row View
          </Button>
        </div>
      </div>

      {/* Product Display */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-3 gap-6" 
          : "space-y-4"
      }>
        {products.map((product) => (
          <Card 
            key={product.id} 
            className={`
              hover:shadow-lg transition-shadow 
              ${viewMode === 'row' ? 'flex items-center p-4' : ''}
            `}
          >
            <div className={
              viewMode === 'row' 
                ? "flex items-center space-x-6 w-full" 
                : ""
            }>
              <img 
                src={product.image} 
                alt={product.name} 
                className={
                  viewMode === 'row' 
                    ? "w-48 h-48 object-cover rounded-md mr-6" 
                    : "w-full h-48 object-cover rounded-md mb-4"
                }
              />
              <div className="flex-grow">
                <CardHeader className="p-0 mb-2">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-green-600 flex items-center">
                        <Wallet className="mr-1" size={14} /> 
                        {product.cryptoPrice.toFixed(4)} ETH
                      </span>
                    </div>
                    <Button variant="outline">
                      <ShoppingCart className="mr-2" size={16} /> Buy Now
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Product Section */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <Plus className="inline mr-2" /> Add Your Artisan Product
        </h2>
        <form onSubmit={handleAddProduct} className="max-w-lg mx-auto">
          <div className="space-y-4">
            <Input 
              placeholder="Product Name" 
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input 
              type="number" 
              step="0.01" 
              placeholder="Price in USD" 
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Textarea 
              placeholder="Product Description" 
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            />
            <Input 
              placeholder="Category" 
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            />
            
            {/* Image Upload Section */}
            <div className="bg-white border-2 border-dashed p-4 rounded-lg">
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/gif"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
              />
              <label 
                htmlFor="imageUpload" 
                className="flex items-center justify-center cursor-pointer"
              >
                {newProduct.image ? (
                  <div className="relative">
                    <img 
                      src={newProduct.image} 
                      alt="Product Preview" 
                      className="max-h-48 max-w-full rounded-lg"
                    />
                    <Button 
                      type="button"
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-0 right-0 m-2"
                      onClick={removeImage}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-500 mb-2" />
                    <p className="text-gray-600">
                      Click to upload product image (Max 5MB)
                    </p>
                  </div>
                )}
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '10px 20px' }}
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketplacePage;