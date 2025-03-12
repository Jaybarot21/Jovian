import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { AlertCircle, Save, Loader2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

const ContactInfoEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    id: null,
    address: "",
    phone: "",
    email: "",
    business_hours: "",
  });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .order("id", { ascending: true })
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setContactInfo(data[0]);
      }
    } catch (err) {
      console.error("Error fetching contact info:", err);
      setError("Failed to load contact information");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      const { error } = await supabase
        .from("contact_info")
        .update({
          address: contactInfo.address,
          phone: contactInfo.phone,
          email: contactInfo.email,
          business_hours: contactInfo.business_hours,
          updated_at: new Date().toISOString(),
        })
        .eq("id", contactInfo.id);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating contact info:", err);
      setError("Failed to update contact information");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
        <p className="ml-2 text-green-700">Loading contact information...</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-green-200">
      <h2 className="text-xl font-bold text-green-800 mb-6">
        Edit Contact Information
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
          Contact information updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            name="address"
            value={contactInfo.address}
            onChange={handleChange}
            required
            className="bg-white border-green-200 text-green-800 focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            required
            className="bg-white border-green-200 text-green-800 focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={contactInfo.email}
            onChange={handleChange}
            required
            className="bg-white border-green-200 text-green-800 focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_hours">Business Hours</Label>
          <Input
            id="business_hours"
            name="business_hours"
            value={contactInfo.business_hours}
            onChange={handleChange}
            required
            className="bg-white border-green-200 text-green-800 focus:border-green-500"
          />
        </div>

        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ContactInfoEditor;
