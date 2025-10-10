"use client";

import { useState, useEffect } from "react";

interface MenuItem {
    id: string;
    name: string;
    category: string;
    description: string;
    ingredients: string[];
    price: number;
    discount?: number;
    available: boolean;
    image?: string;
}

interface NewMenuItemPopupProps {
  isOpen: boolean;
  onClose: () => void;
  editingMenuItem?: MenuItem | null;
  onUpdateMenuItem?: (item: MenuItem) => void;
  onCreateMenuItem?: (item: Omit<MenuItem, 'id'>) => void;
}

export default function NewMenuItemPopup({ 
  isOpen, 
  onClose, 
  editingMenuItem = null,
  onUpdateMenuItem,
  onCreateMenuItem 
}: NewMenuItemPopupProps) {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    ingredients: "",
    description: "",
    price: "",
    discount: "",
    available: true,
  });

  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with editing menu item data
  useEffect(() => {
    if (editingMenuItem) {
      setFormData({
        itemName: editingMenuItem.name,
        category: editingMenuItem.category,
        ingredients: editingMenuItem.ingredients.join(', '),
        description: editingMenuItem.description,
        price: editingMenuItem.price.toString(),
        discount: editingMenuItem.discount?.toString() || "",
        available: editingMenuItem.available,
      });
      setImagePreview(editingMenuItem.image);
    } else {
      // Reset to default values for new item
      setFormData({
        itemName: "",
        category: "",
        ingredients: "",
        description: "",
        price: "",
        discount: "",
        available: true,
      });
      setImagePreview(undefined);
    }
  }, [editingMenuItem, isOpen]);

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

  // Create menu API endpoint
  const handleCreateItem = async () => {
    setIsSubmitting(true);

    try {
      // const apiEndpoint = "/api/menu-items";
      
      const menuItemData: Omit<MenuItem, 'id'> = {
        name: formData.itemName,
        category: formData.category,
        ingredients: formData.ingredients.split(',').map(ingredient => ingredient.trim()).filter(ing => ing),
        description: formData.description,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || undefined,
        available: formData.available,
        image: imagePreview,
      };

      // when add API and uncooment belong
      /*
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItemData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create menu item: ${response.statusText}`);
      }

      const result = await response.json();
      */

      // Simulate API call success
      console.log("Menu item created successfully:", menuItemData);
      
      // Call the create callback if provided
      if (onCreateMenuItem) {
        onCreateMenuItem(menuItemData);
      }
      
    } catch (error) {
      console.error("Error creating menu item:", error);
      alert("Failed to create menu item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update Menu item API endpoint
  const handleUpdateItem = async () => {
    if (!editingMenuItem) return;

    setIsSubmitting(true);

    try {

      // const apiEndpoint = `/api/menu-items/${editingMenuItem.id}`;
      
      const updatedMenuItemData: MenuItem = {
        id: editingMenuItem.id,
        name: formData.itemName,
        category: formData.category,
        ingredients: formData.ingredients.split(',').map(ingredient => ingredient.trim()).filter(ing => ing),
        description: formData.description,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || undefined,
        available: formData.available,
        image: imagePreview,
      };

      // when add API and uncooment belong
      /*
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMenuItemData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update menu item: ${response.statusText}`);
      }

      const result = await response.json();
      */

      // Simulate API call success
      console.log("Menu item updated successfully:", updatedMenuItemData);
      
      // Call the update callback if provided
      if (onUpdateMenuItem) {
        onUpdateMenuItem(updatedMenuItemData);
      }
      
    } catch (error) {
      console.error("Error updating menu item:", error);
      alert("Failed to update menu item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.itemName.trim()) {
      alert("Please enter a name for the menu item");
      return;
    }
    if (!formData.category.trim()) {
      alert("Please select a category");
      return;
    }
    if (!formData.description.trim()) {
      alert("Please enter a description");
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    if (editingMenuItem) {
      handleUpdateItem();
    } else {
      handleCreateItem();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto text-black">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {editingMenuItem ? 'Edit Menu Item' : 'New Menu'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
              disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                        min="0"
                        step="0.01"
                        disabled={isSubmitting}
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
                        min="0"
                        step="0.01"
                        disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    {formData.itemName || "Item Name"}
                  </h4>
                  <p className="text-gray-600 capitalize">
                    {formData.category || "Category"}
                  </p>
                  <p className="text-xl font-semibold my-2">
                    ${formData.price || "0.00"}
                    {formData.discount && parseFloat(formData.discount) > 0 && (
                      <span className="text-sm text-green-600 ml-2">
                        Save ${formData.discount}
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {formData.description || "Item description will appear here"}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.ingredients 
                      ? formData.ingredients.split(',').map((ingredient, index) => (
                          ingredient.trim() && (
                            <span 
                              key={index}
                              className="bg-gray-100 px-2 py-1 rounded text-xs text-black"
                            >
                              {ingredient.trim()}
                            </span>
                          )
                        ))
                      : ["Ingredients", "will", "appear", "here"].map((ingredient, index) => (
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
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                editingMenuItem ? "Update Item" : "Save Item"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}