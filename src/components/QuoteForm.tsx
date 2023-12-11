import { useState } from 'react';
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DOMPurify from 'dompurify';

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  product: string;
  artwork: string;
  quantity: string;
}

const phoneNumberRegex = /^\d{1,3}\d{3,}$/;
const nameRegex = /^[A-Za-z\u00C0-\u00FF]+$/;

const cleanPhone = (value: string) => {
  try {
    return value.replace(/\D+/g, '');
  } catch (error) {
    console.error('Error cleaning phone value:', error);
  }
};

const schema = yup.object({
  firstName: yup.string().matches(nameRegex, 'First name should only contain letters').required('First name is required'),
  lastName: yup.string().matches(nameRegex, 'Last name should only contain letters').required('Last name is required'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phone: yup.string()
    .transform((value, originalValue) => {
      return cleanPhone(originalValue);
    })
    .required('Phone number is required').matches(phoneNumberRegex, 'Invalid phone number'),
  product: yup.string().required('Field is required'),
  artwork: yup.string().required('Field is required'),
  quantity: yup.string().required('Field is required'),
}).required();

function QuoteForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [product, setProduct] = useState('')
  const [artwork, setArtwork] = useState('')
  const [quantity, setQuantity] = useState('')

  const handlePhoneChange = (value: string) => {
    if (typeof value === 'string') {
      setPhone(value)
    } else {
      // Handle the case where value is not a valid number (or is not a string)
    }
  };


  // Initialize useForm
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const submissionData = {
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      email: DOMPurify.sanitize(data.email),
      phone: DOMPurify.sanitize(data.phone),
      product: DOMPurify.sanitize(data.product),
      artwork: DOMPurify.sanitize(data.artwork),
      quantity: DOMPurify.sanitize(data.quantity),
    };
    try {
      const response = await fetch('/api/request-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Response:', result);
      // Provide feedback to the user
      alert("Form submitted successfully!");
      reset({ firstName: '', lastName: '', email: '', phone: '' })
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error - display error message to user
    }
  };

  return (
    <section
      id="request-quote-form-section"
      className="mt-[96px] w-full rounded-3xl bg-accent grid place-items-center p-6 text-accent-content"
    >
      <h2 className="text-3xl lg:text-4xl">Request a quote</h2>
      <p className="text-lg lg:text-xl">Get a custom quote for boxes and more.</p>

      <form id="request-quote-form" className="form-control w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>

        <label className="label">
          <span className="label-text text-accent-content">First Name</span>
        </label>
        <input
          type="text"
          placeholder="First Name"
          className={`input input-bordered text-base-content w-full ${errors.firstName ? 'input-error' : ''}`}
          {...register('firstName')}
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName &&
          <div className="label">
            <span className="label-text-alt text-accent-content">{errors.firstName.message}</span>
          </div>}

        <label className="label">
          <span className="label-text text-accent-content">Last Name</span>
        </label>
        <input
          type="text"
          placeholder="Last Name"
          className={`input input-bordered text-base-content w-full ${errors.lastName ? 'input-error' : ''}`}
          {...register('lastName')}
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName &&
          <div className="label">
            <span className="label-text-alt text-accent-content">{errors.lastName.message}</span>
          </div>}

        <label className="label">
          <span className="label-text text-accent-content">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className={`input input-bordered text-base-content w-full ${errors.email ? 'input-error' : ''}`}
          {...register('email')}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email &&
          <div className="label">
            <span className="label-text-alt text-accent-content">{errors.email.message}</span>
          </div>}

        <label className="label">
          <span className="label-text text-accent-content">Phone Number</span>
        </label>
        <Input
          placeholder="+971 12 345 6789"
          value={phone}
          className={`input input-bordered text-base-content w-full ${errors.phone ? 'input-error' : ''}`}
          {...register('phone')}
          onChange={handlePhoneChange}
        />
        {errors.phone &&
          <div className="label">
            <span className="label-text-alt text-accent-content">{errors.phone.message}</span>
          </div>}

        <label className="label">
          <span className="label-text text-accent-content"
          >What packaging products are you interested in?</span>
        </label>
        <select
          className={`select select-bordered text-base-content w-full ${errors.product ? 'select-error' : ''}`}
          {...register('product')}
          required value={product} onChange={(e) => setProduct(e.target.value)}>
          <option disabled >Select one</option>
          <option value="1">Product 1</option>
          <option value="2">Product 2</option>
          <option value="3">Product 3</option>
        </select>
        {errors.product &&
          <div className="label">
            <span className="label-text-alt text-accent-content">{errors.product.message}</span>
          </div>}

        <label className="label">
          <span className="label-text text-accent-content">Do you have artwork?</span>
        </label>
        <select
          className={`select select-bordered text-base-content w-full ${errors.artwork ? 'select-error' : ''}`}
          {...register('artwork')} required value={artwork} onChange={(e) => setArtwork(e.target.value)}>
          <option disabled>Select one</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {errors.artwork &&
          <div className="label">
            <span className="label-text-alt text-accent-content">{errors.artwork.message}</span>
          </div>}

        <label className="label">
          <span className="label-text text-accent-content">Quantity</span>
        </label>
        <select
          className={`select select-bordered text-base-content w-full ${errors.quantity ? 'select-error' : ''}`}
          {...register('quantity')} required value={quantity}
          onChange={(e) => setQuantity(e.target.value)}>
          <option disabled>Select one</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        {errors.quantity &&
          <div className="label">
            <span className="label-text-alt text-accent-content">{errors.quantity.message}</span>
          </div>}

        <button type="submit" className="btn mt-4 max-w-fit mx-auto">Submit</button>
      </form>
    </section>
  );
};

export default QuoteForm;
