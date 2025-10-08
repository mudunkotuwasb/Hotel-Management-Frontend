"use client";

import { useState } from "react";

interface NewMenuItemPopupProps {
  onClose: () => void;
}

export default function NewMenuItemPopup({ onClose }: NewMenuItemPopupProps) {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    ingredients: "",
    description: "",
    price: "",
    discount: "",
    available: true,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Replace with actual API endpoint
    // const apiEndpoint = "/api/menu-items";
    
    try {
      const menuItemData = {
        name: formData.itemName,
        category: formData.category,
        ingredients: formData.ingredients.split(',').map(ingredient => ingredient.trim()),
        description: formData.description,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        available: formData.available,
        image: imagePreview,
      };

      // Uncomment when API is added above
      /*
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItemData),
      });

      if (response.ok) {
        onClose(); // Close popup on success
        // TODO: Add success notification or refresh menu items list
      } else {
        // TODO: Handle error response
        console.error("Failed to save menu item");
      }
      */

      console.log("Menu item data to be saved:", menuItemData);
      onClose();
      
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto text-black">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">New Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div>
              <h3 className="font-semibold mb-4">Item Info</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black"
                    placeholder="Enter item name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black"
                  >
                    <option value="">Select category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="dessert">Dessert</option>
                    <option value="beverage">Beverage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ingredients *
                  </label>
                  <input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 text-black"
                    placeholder="List ingredients separated by commas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border rounded px-3 py-2 text-black"
                    placeholder="Enter item description"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Price Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Price *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 text-black"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Discount
                      </label>
                      <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 text-black"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Availability</h3>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="available" 
                      name="available"
                      checked={formData.available}
                      onChange={handleChange}
                      className="rounded" 
                    />
                    <label htmlFor="available" className="text-sm">
                      Available for order
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Upload File</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full border rounded px-3 py-2 text-black"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div>
              <h3 className="font-semibold mb-4">Preview</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center text-gray-500 mb-4">PREVIEW</div>
                
                <div className="bg-white rounded-lg shadow p-4 text-black">
                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="mb-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <h4 className="font-semibold text-lg">
                    {formData.itemName || "Grilled Salmon"}
                  </h4>
                  <p className="text-gray-600 capitalize">
                    {formData.category || "Dinner"}
                  </p>
                  <p className="text-xl font-semibold my-2">
                    ${formData.price || "28"}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.description || "Fresh Atlantic salmon with herbs and lemon"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.ingredients 
                      ? formData.ingredients.split(',').map((ingredient, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded text-xs text-black"
                          >
                            {ingredient.trim()}
                          </span>
                        ))
                      : ["Salmon", "Herbs", "Lemon", "Olive Oil"].map((ingredient, index) => (
                          <span 
                            key={index}
                            className="bg-gray-100 px-2 py-1 rounded text-xs text-black"
                          >
                            {ingredient}
                          </span>
                        ))
                    }
                  </div>
                  
                  <div className={`inline-block px-3 py-1 rounded text-xs ${
                    formData.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {formData.available ? "Available" : "Unavailable"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}