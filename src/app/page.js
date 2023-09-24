"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="">
        <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Best Fashion Collection
            </h1>
            <p className="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              At BAI's Ecommerce, we are on a mission to redefine your shopping experience and offer you a world of convenience, quality, and choice, right at your fingertips. Join the revolution and experience the future of retail with BAI's Ecommerce.
            </p>

            <button
              type="button"
              onClick={() => router.push("/product/listing/all-products")}
              className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
              Explore Shop Collection
            </button>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://lh3.googleusercontent.com/pw/ADCreHeZzn_tULvKxUo-zdKKIZSrAenGL7EU19TqU1M3C5nkLTd_1T6bOCl4SP0TjjwFq69OFN1ID3YgBB4T5nx7LsxAfcAPIN7W8hvTgiVTzzdRyTnwyBVbZjxnynZa_BfnxF5fLJvet9qGYzk0RFYZH2NEfOvV-wDcwpMiuutWFFFhYkpf0OKzLmEtkdaPibfmlWjToIai1zwgizDAMc2jpZKM-ugaSaY-JhTILMc_ckt4lXarmP_nc2JEUJN6pyselJjv9HjHuh1ycsWNJWRQ6G_2mkOziWQKwLv8o1bnisLUefQNVA_ieKCIxdjaxpuUGwGBhp7sWcNYFvK4FctcdcgPey1Cxg4ljYjXbeyH67p0pKtARl9PiUkVGISuyRwkMJqL1_t58n1jQ9Br4TBF-JP3dRWuZy4Wyz2Lq3L3xB9Si0SSMESGebrFmkfTR7SWbb0drIp5pdr6iKPpBuTPV8VwU-Vgo1FAEkrD0EYpLGy2ST2KdFFvSq7aYoog_YpNZCHXgcIrBiBo1rLNkcM6_7O-zJxo64GrOXYBY9sCuAE9d5HE67XsWeahRNlUbG1GgjKdK1jinj7kGHJv87Gx3m4ILnXqxy3jSbNoIuUMK6_VXS31lZ3KFP8H1fsg-iHCWRbLnvKjvqSvjlOQjCOD5uAuN8l30ZSLF5xOYweY8_41ZTcsfowyat9xb_LcgSRlaaTPg4saz_Pvp0SJWjPExLsWQn15LKFBfHnVtx4GdkOzD2f6Fr5qbECYWtudIsTa7FFx7soCFkBbYbmEn4lBiEJalvBj8497c363rYt6HHZZBBwiFX0N0ZCIPNMXWDPWs68qlR4QqpeyMuZmeVvdqs1Bs4szs8GnysEgWDfiTUSIZDpnmwGK3DqQGxhcJWZaeGKQ3kMYZef-F5C9UnPMdrrSzApPtA_ZI2b-I2Q9L9SubtoUFcQhMDUmA3B7ErhxUuFOE1qPResFH9ilsD9NJQmmg2dh1L_k=w1280-h720-s-no?authuser=0"
              alt="Explore Shop Collection"
            />
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
              <div className="max-w-md mx-auto text-center lg:text-left">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                    Summer Sale Collection
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/product/listing/all-products")}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Shop ALL
                </button>
              </div>
            </div>
            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {products && products.length
                  ? products
                      .filter((item) => item.onSale === "yes")
                      .splice(0, 2)
                      .map((productItem) => (
                        <li
                          onClick={() =>
                            router.push(`/product/${productItem._id}`)
                          }
                          className="cursor-pointer"
                          key={productItem._id}
                        >
                          <div>
                            <img
                              src={productItem.imageUrl}
                              alt="Sale Product Item"
                              className="object-cover w-full rounded aspect-square"
                            />
                          </div>
                          <div className="mt-3">
                            <h3 className="font-medium text-gray-900">
                              {productItem.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-800">
                              ${productItem.price}{" "}
                              <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                            </p>
                          </div>
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">
              SHOP BY CATEGORY
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://www.newbalance.com/dw/image/v2/AAGI_PRD/on/demandware.static/-/Library-Sites-NBUS-NBCA/default/dw69facd28/images/page-designer/2023/july/15260_Comp_A4_Mobile.jpg?sw=991&sfrm=jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">KIDS</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://assets.vogue.com/photos/6128027eb5cae63a108a2de7/master/w_1600%2Cc_limit/liana-shoes.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">WOMEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://i.insider.com/63fe28b1b8468e001896cd70?width=1136&format=jpeg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">MEN</h3>
                  <button
                    onClick={() => router.push("/product/listing/men")}
                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
