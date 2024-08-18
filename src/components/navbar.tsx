"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Enav() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products/category-list')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  interface Section {
    id: string;
    name: string;
    items: {
      name: string;
      href: string;
    }[];
  }
  
  interface Category {
    id: string;
    name: string;
    featured: any[];
    sections: Section[];
  }
  

  const groupedCategories: {
    'Home Decor': string[];
    "Men's": string[];
    "Women's": string[];
    Electronics: string[];
  } = {
    'Home Decor': ['furniture', 'home-decoration', 'kitchen-accessories'],
    "Men's": ['mens-shirts', 'mens-shoes', 'mens-watches'],
    "Women's": ['womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-shoes', 'womens-watches'],
    Electronics: ['laptops', 'smartphones', 'tablets', 'mobile-accessories'],
  };
  
  const navigation = {
    categories: Object.keys(groupedCategories).map((group) => ({
      id: group.toLowerCase().replace(/ /g, '-'),
      name: group,
      featured: [],
      sections: groupedCategories[group as keyof typeof groupedCategories].map((category) => ({
        id: category,
        name: category.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
        items: [{ name: 'Browse All', href: `/products?category=${category}` }],
      })),
    })),
    pages: [],
  };
  

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear" />
        <div className="fixed inset-0 z-50 flex">
          <DialogPanel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-indigo-600 data-[selected]:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p className="font-medium text-gray-900">{section.name}</p>
                        <ul className="mt-6 flex flex-col space-y-6">
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link href={item.href}>
                                <span className="-m-2 block p-2 text-gray-500">
                                  {item.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white z-40">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </button>


              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>
                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />
                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8 py-6">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                              {category.sections.map((section) => (
                                <div key={section.name}>
                                  <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                    {section.name}
                                  </p>
                                  <ul
                                    role="list"
                                    aria-labelledby={`${section.name}-heading`}
                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                  >
                                    {section.items.map((item) => (
                                      <li key={item.name} className="flex">
                                        <Link href={`/category/${item.href.split('=')[1]}`}>
                                          <span className="hover:text-gray-800">{item.name}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}
                  {navigation.pages.map((page) => (
                    <span key={page.name} href={page.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                      {page.name}
                    </span>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:items-center lg:space-x-6">
                  <span href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                  </span>
                  <span className="h-6 w-px bg-gray-200" />
                  <span href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                  </span>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <span href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 text-sm font-medium">CAD</span>
                  </span>
                </div>

                <div className="flex lg:ml-6">
                  <span href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                  </span>
                </div>

                <div className="ml-4 lg:ml-6">
                  <span href="#" className="group flex items-center p-2">
                    <ShoppingBagIcon aria-hidden="true" className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
