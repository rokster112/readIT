export function handleChange(e, setFormData, setError) {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  setError(false);
}
