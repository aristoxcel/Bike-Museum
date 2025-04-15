import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../redux/features/products/productApi";
import { TProductResponse } from "../../redux/types/product";
import { toast } from "sonner";
import axios from "axios";

const CreateProductForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: 0,
    category: "Mountain",
    photo: "",
    description: "",
    quantity: 0,
    inStock: false,
    isDeleted: false,
  });

  const [createProduct] = useAddProductMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm({ ...form, [name]: target.checked });
    } else {
      setForm({
        ...form,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFormData = new FormData();
      newFormData.append("file", file);
      newFormData.append("upload_preset", "rakib001"); 

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dtrek2mmx/image/upload",
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setForm({ ...form, photo: response.data.secure_url });
        toast.success("Image uploaded successfully");
      } catch (err) {
        console.log(err);
        toast.error("Failed to upload image");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProduct(form as Partial<TProductResponse>).unwrap();
      toast.success("Product created successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create product");
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] min-h-screen w-full flex items-center justify-center py-10">
      <div className="bg-[#2B1E36] bg-opacity-90 p-8 rounded-2xl shadow-xl w-11/12 md:w-2/5 text-white">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <h2 className="text-lg mb-2">Product Name</h2>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full px-4 py-2 rounded-md bg-[#1B1B31] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Brand */}
          <div>
            <h2 className="text-lg mb-2">Brand</h2>
            <input
              type="text"
              id="brand"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Brand Name"
              className="w-full px-4 py-2 rounded-md bg-[#1B1B31] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Price */}
          <div>
            <h2 className="text-lg mb-2">Price</h2>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full px-4 py-2 rounded-md bg-[#1B1B31] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Category */}
          <div>
            <h2 className="text-lg mb-2">Category</h2>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-[#1B1B31] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
            <h2 className="text-lg mb-2">Photo (optional)</h2>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:bg-[#2B1E36] file:text-gray-300
      hover:file:bg-[#3A2B47]
    "
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg mb-2">Description</h2>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-full px-4 py-2 rounded-md bg-[#1B1B31] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <h2 className="text-lg mb-2">Quantity</h2>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter Quantity"
              className="w-full px-4 py-2 rounded-md bg-[#1B1B31] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
              className="h-5 w-5 text-orange-400 focus:ring-orange-400 border-gray-300 rounded"
            />
            <label htmlFor="inStock" className="text-lg">
              In Stock
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-center items-center">
            <button
              type="submit"
              className="w-2/3 bg-green-500 hover:bg-orange-600 transition-all py-2 rounded-lg font-semibold text-white shadow-md"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
