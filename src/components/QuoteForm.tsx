import { useEffect, useState } from 'react';
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import fetchProducts from '../fetchProducts';
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
    .transform((originalValue) => {
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
  const [productList, setProductList] = useState([])

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        if (Array.isArray(fetchedProducts)) {
          setProductList(fetchedProducts);
        } else {
          console.error('Fetched data is not an array:', fetchedProducts);
        }
      } catch (error) {
        console.error('Error fetching best-selling products:', error);
      }
    };
    fetchContent();
  }, []);

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
      className="mt-[96px] mx-auto w-full rounded-3xl bg-accent grid place-items-center p-6 text-accent-content"
    >
      <h2 className="text-3xl lg:text-4xl">Request a quote</h2>
      <p className="text-lg lg:text-xl">Get a custom quote for boxes and more.</p>

      <form id="request-quote-form" className="form-control w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <label htmlFor="firstName" className="label">
          <span className="label-text text-accent-content">First Name</span>
        </label>
        <input
          id="firstName"
          type="text"
          placeholder="First Name"
          className={`input input-bordered text-base-content w-full ${errors.firstName ? 'input-error' : ''}`}
          {...register('firstName')}
          required
          aria-describedby={errors.firstName ? 'firstName-error' : null}
        />
        {errors.firstName &&
          <div id="firstName-error" className="label">
            <span className="label-text-alt text-accent-content">{errors.firstName.message}</span>
          </div>}
        {/* Last Name */}
        <label htmlFor="lastName" className="label">
          <span className="label-text text-accent-content">Last Name</span>
        </label>
        <input
          id="lastName"
          type="text"
          placeholder="Last Name"
          className={`input input-bordered text-base-content w-full ${errors.lastName ? 'input-error' : ''}`}
          {...register('lastName')}
          required
          aria-describedby={errors.lastName ? 'lastName-error' : null}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName &&
          <div id="lastName-error" className="label">
            <span className="label-text-alt text-accent-content">{errors.lastName.message}</span>
          </div>}
        {/* Email Field */}
        <label htmlFor="email" className="label">
          <span className="label-text text-accent-content">Email</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={`input input-bordered text-base-content w-full ${errors.email ? 'input-error' : ''}`}
          {...register('email')}
          required
          aria-describedby={errors.email ? 'email-error' : null}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email &&
          <div id="email-error" className="label">
            <span className="label-text-alt text-accent-content">{errors.email.message}</span>
          </div>}
        {/* Phone Field */}
        <label htmlFor="phone" className="label">
          <span className="label-text text-accent-content">Phone Number</span>
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+971 12 345 6789"
          value={phone}
          className={`input input-bordered text-base-content w-full ${errors.phone ? 'input-error' : ''}`}
          {...register('phone')}
          aria-describedby={errors.phone ? 'phone-error' : null}
          onChange={handlePhoneChange}
        />
        {errors.phone &&
          <div id="phone-error" className="label">
            <span className="label-text-alt text-accent-content">{errors.phone.message}</span>
          </div>}

        {/* Product Select Field */}
        <label htmlFor="product" className="label">
          <span className="label-text text-accent-content">What product are you interested in?</span>
        </label>
        <select
          id="product"
          className={`select select-bordered text-base-content w-full ${errors.product ? 'select-error' : ''}`}
          {...register('product')}
          required value={product} onChange={(e) => setProduct(e.target.value)}
          aria-describedby={errors.product ? 'product-error' : null}
        >
          <option value='' disabled >Select one</option>
          {productList.map((product, index) => (
            <option key={index} value={product.productName}>{product.productName}</option>
          ))}
        </select>
        {errors.product &&
          <div id="product-error" className="label">
            <span className="label-text-alt text-accent-content">{errors.product.message}</span>
          </div>}

        {/* Artwork Select Field */}
        <label htmlFor="artwork" className="label">
          <span className="label-text text-accent-content">Do you have artwork?</span>
        </label>
        <select
          id="artwork"
          className={`select select-bordered text-base-content w-full ${errors.artwork ? 'select-error' : ''}`}
          {...register('artwork')} required value={artwork} onChange={(e) => setArtwork(e.target.value)}
          aria-describedby={errors.artwork ? 'artwork-error' : null}
        >
          <option value='' disabled>Select one</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {errors.artwork &&
          <div id="artwork-error" className="label">
            <span className="label-text-alt text-accent-content">{errors.artwork.message}</span>
          </div>}

        {/* Quantity Select Field */}
        <label htmlFor="quantity" className="label">
          <span className="label-text text-accent-content">Quantity</span>
        </label>
        <select
          id="quantity"
          className={`select select-bordered text-base-content w-full ${errors.quantity ? 'select-error' : ''}`}
          {...register('quantity')} required value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          aria-describedby={errors.quantity ? 'quantity-error' : null}
        >
          <option value='' disabled>Select one</option>
          <option value="less-than-1000">Less than 1,000</option>
          <option value="1000-4000">1,000 - 4,000</option>
          <option value="4000+">4,000 or more</option>
        </select>
        {errors.quantity &&
          <div id="quantity-error" className="label">
            <span className="label-text-alt text-accent-content">{errors.quantity.message}</span>
          </div>}

        <button type="submit" className="btn mt-4 max-w-fit mx-auto">Submit</button>
      </form>
    </section>
  );
};

export default QuoteForm;
