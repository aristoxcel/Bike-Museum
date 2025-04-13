import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../../redux/features/products/productApi';
import {
    TProductResponse,
  } from '../../redux/types/product'; 
import { toast } from 'sonner';
import axios from 'axios';

const CreateProductForm = () => {
  const navigate = useNavigate();

  // Initialize form state
  const [form, setForm] = useState({
    name: '',
    brand: '',
    price: 0,
    category: 'Mountain',
    photo: '',
    description: '',
    quantity: 0,
    inStock: false,
    isDeleted: false,
  });

  // Create Product mutation
  const [createProduct] = useAddProductMutation();

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setForm({ ...form, [name]: target.checked });
    } else {
      setForm({
        ...form,
        [name]: type === 'number' ? Number(value) : value,
      });
    }
  };

  // Handle image file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFormData = new FormData();
      newFormData.append('file', file);
      newFormData.append('upload_preset', 'your-upload-preset');  // Use your Cloudinary preset

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dtrek2mmx/image/upload',
          newFormData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        // Set the uploaded image URL in form state
        setForm({ ...form, photo: response.data.secure_url });
        toast.success('Image uploaded successfully');
      } catch (err) {
        console.log(err)
        toast.error('Failed to upload image');
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use Partial<TProductResponse> to allow missing fields
      await createProduct(form as Partial<TProductResponse>).unwrap();
      toast.success('Product created successfully');
      navigate('/admin/products');
    } catch (err) {
        console.log(err)
      toast.error('Failed to create product');
    }
  };

  return (
    <div className="container  mx-auto p-20">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="Mountain">Mountain</option>
            <option value="Road">Road</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Photo URL */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Photo (optional)
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handleFileChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* In Stock */}
        <div>
          <label htmlFor="inStock" className="block text-sm font-medium text-gray-700">
            In Stock
          </label>
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
