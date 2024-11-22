

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  return (
<div className="p-4">
    <h1 className="text-4xl font-bold mb-5">Shopping Cart</h1>
    <p className="text-lg font-bold text-gray-700 mb-4">0 Courses in Cart</p>

      <div className="flex flex-col items-center border py-5">
        <Image
          src="/assets/emptyShoppingCart.jpg" 
          alt="Empty Cart"
          width={300}
          height={300}
        />
        <p className="text-gray-500 text-sm mt-4 mb-6">
          Your cart is empty. Keep shopping to find a course!
        </p>
        {/* الزر */}
        <Link href="/" 
        className="bg-purple-600 text-white px-6 py-3  font-semibold hover:bg-purple-700 transition">
       
            Keep shopping
        
        </Link>
      </div>
</div>
  );
};

export default CartPage;