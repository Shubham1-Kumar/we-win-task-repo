import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ fetchUsers, editingUser, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    designation: "",
    favorites: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        gender: editingUser.gender,
        designation: editingUser.designation,
        favorites: editingUser.favorites,
      });
    } else {
      setFormData({ name: "", gender: "", designation: "", favorites: [] });
    }
    setErrors({});
  }, [editingUser]);

  const designationOptions = ["Developer", "Designer", "Manager", "Tester", "DevOps"];
  const favoriteOptions = ["Reading", "Sports", "Music", "Movies", "Travel", "Cooking"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        favorites: checked ? [...prev.favorites, value] : prev.favorites.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (formData.favorites.length === 0) newErrors.favorites = "At least one favorite must be selected";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, formData);
        if (onCancelEdit) onCancelEdit();
      } else {
        await axios.post("http://localhost:5000/api/users", formData);
        setFormData({ name: "", gender: "", designation: "", favorites: [] });
      }
      if (fetchUsers) fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold text-center mb-4">{editingUser ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Gender</label>
          <div className="flex gap-4">
            {["Male", "Female"].map((gender) => (
              <label key={gender} className="flex items-center space-x-2">
                <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleChange} />
                <span>{gender}</span>
              </label>
            ))}
          </div>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Designation</label>
          <select name="designation" value={formData.designation} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="">Select Designation</option>
            {designationOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.designation && <p className="text-red-500 text-sm">{errors.designation}</p>}
        </div>

        <div>
          <label className="block text-gray-700">Favorites</label>
          <div className="grid grid-cols-2 gap-2">
            {favoriteOptions.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input type="checkbox" name="favorites" value={option} checked={formData.favorites.includes(option)} onChange={handleChange} />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {errors.favorites && <p className="text-red-500 text-sm">{errors.favorites}</p>}
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : editingUser ? "Update" : "Submit"}
          </button>
          {editingUser && (
            <button type="button" onClick={onCancelEdit} className="bg-gray-500 text-white px-4 py-2 rounded-md">Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
