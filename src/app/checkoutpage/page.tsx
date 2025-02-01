"use client";
import { useContext, useEffect, useState, useCallback, ChangeEvent } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useFlutterwave, FlutterwaveConfig, PaymentResponse } from "flutterwave-react-v3";
import Link from "next/link";
import { CartContext } from "../context folder/appContext";

export default function Checkout() {
  const cart = useContext(CartContext);
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [successfully, setSuccessfully] = useState<boolean>(false);
  const apiKey: string = "FLWPUBK_TEST-cb119a9a9127ae014d8a8ddd16e081da-X";

  const sanitizedAmount: number = parseFloat(cart.totalCart) || 0;

  useEffect(() => {
    if (successfully) {
      cart.addToOrders(localStorage.getItem("nameobject") || "", address, phone);
      console.log("Transaction successful");
      alert(
        "Thank you, transaction successful. Our delivery agent will be in touch with you soon."
      );
    }
  }, [successfully, address, phone, cart]);

  const config: FlutterwaveConfig = {
    public_key: apiKey,
    tx_ref: Date.now().toString(),
    amount: sanitizedAmount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: email.trim(),
      phone_number: phone.trim(),
      name: name.trim(),
      address: address.trim(),
    },
    customizations: {
      title: "Mr Smart wears",
      description: "Payment for items in cart",
      logo: "https://png.pngtree.com/png-clipart/20200720/original/pngtree-orange-logo-design-png-image_4781563.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    if (phone.length < 11) {
      alert("Please fill in the phone number field with your correct number");
      return;
    }

    if (!address.trim()) {
      alert("Please fill in the address field with your address");
      return;
    }

    handleFlutterPayment({
      callback: (response: PaymentResponse) => {
        if (response) {
          setSuccessfully(true);
        } else {
          setSuccessfully(false);
        }
        closePaymentModal();
      },
      onClose: () => {
        alert(successfully ? "Payment was successful" : "Payment was not successful");
      },
    });
  };

  const handleInputChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    },
    []
  );

  return (
    <div className="App">
      <div className="flex items-center space-x-2 p-4">
        <Link href="/cart" className="text-orange-500 flex justify-center items-center gap-3">
          <BiArrowBack />
          <h4 className="text-lg font-semibold text-gray-500">Back to cart</h4>
        </Link>
      </div>
      <div className="space-y-4 p-6">
        <input
          type="number"
          placeholder="Amount"
          value={sanitizedAmount}
          readOnly
          className="w-full p-3 border rounded-md border-gray-300"
          aria-label="Amount"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={handleInputChange(setAddress)}
          className="w-full p-3 border rounded-md border-gray-300"
          aria-label="Address"
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
          className="w-full p-3 border rounded-md border-gray-300"
          aria-label="Email"
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleInputChange(setName)}
          className="w-full p-3 border rounded-md border-gray-300"
          aria-label="Name"
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={handleInputChange(setPhone)}
          className="w-full p-3 border rounded-md border-gray-300"
          aria-label="Phone"
        />
        <button
          onClick={handlePayment}
          className="w-full text-orange-500 p-3 rounded-md  transition"
        >
          Pay
        </button>
        {successfully && <Link href="/cart" />}
      </div>
    </div>
  );
}
