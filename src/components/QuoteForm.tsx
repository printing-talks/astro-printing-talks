import React from 'react';
import { useState } from 'react';
import Input from 'react-phone-number-input/input'
import 'react-phone-number-input/style.css'

function QuoteForm() {
  const [value, setValue] = useState()
  const [product, setProduct] = useState('')
  const [artwork, setArtwork] = useState('')
  const [quantity, setQuantity] = useState('')
  return (
    <section
      id="request-quote-form-section"
      className="w-full rounded-3xl bg-accent grid place-items-center p-6 text-accent-content"
    >
      <h2 className="text-3xl lg:text-4xl">Request a quote</h2>
      <p className="text-lg lg:text-xl">Get a custom quote for boxes and more.</p>

      <form id="request-quote-form" className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text text-accent-content">First Name</span>
        </label>
        <input
          type="text"
          placeholder="First Name"
          className="input input-bordered text-base-content w-full"
          required
        />

        <label className="label">
          <span className="label-text text-accent-content">Last Name</span>
        </label>
        <input
          type="text"
          placeholder="Last Name"
          className="input input-bordered text-base-content w-full"
          required
        />

        <label className="label">
          <span className="label-text text-accent-content">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered text-base-content w-full"
          required
        />

        <label className="label">
          <span className="label-text text-accent-content">Phone Number</span>
        </label>
        <Input
          placeholder="+971 12 345 6789"
          value={value}
          onChange={setValue}
          className='input input-bordered text-base-content w-full'
        />

        <label className="label">
          <span className="label-text text-accent-content"
          >What packaging products are you interested in?</span>
        </label>
        <select className="select select-bordered text-base-content w-full" required value={product} onChange={(e) => setProduct(e.target.value)}>
          <option disabled >Select one</option>
          <option>Product 1</option>
          <option>Product 2</option>
          <option>Product 3</option>
        </select>

        <label className="label">
          <span className="label-text text-accent-content">Do you have artwork?</span>
        </label>
        <select className="select select-bordered text-base-content w-full" required value={artwork} onChange={(e) => setArtwork(e.target.value)}>
          <option disabled>Select one</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <label className="label">
          <span className="label-text text-accent-content">Quantity</span>
        </label>
        <select className="select select-bordered text-base-content w-full" required value={quantity}
          onChange={(e) => setQuantity(e.target.value)}>
          <option disabled>Select one</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>

        <button type="submit" className="btn mt-4 max-w-fit mx-auto">Submit</button>
      </form>
    </section>
  );
};

export default QuoteForm;
