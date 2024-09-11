// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useLocation } from 'react-router-dom';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import { NavbarLinks } from '@/utils/data/navbar-links';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from '@/utils/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiConnector } from '@/services/apiConnector';
import { categories } from '@/services/apis';

const Header = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const queryClient = useQueryClient();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['getCategory'], // unique key
    queryFn: () => apiConnector("GET", categories.CATEGORIES_API),
    onSuccess: (response) => {
      console.log("response", response);
      queryClient.invalidateQueries('getCategory');
    },
  });

  const location = useLocation();

  const isRouteMatch = (route) => {
    return location.pathname === route;
  };

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800 relative z-30'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to={HomePage}>
          <img src={logo} alt="study notion logo" loading='lazy' width={162} height={40} />
        </Link>

        {/* Hamburger Icon for mobile screens */}
        <div className="sm:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? (
            <HiOutlineX className="text-white text-3xl" />
          ) : (
            <HiOutlineMenu className="text-white text-3xl" />
          )}
        </div>

        {/* Navigation Links and User Options */}
        <ul className={`flex-col gap-y-4 sm:flex-row sm:flex sm:gap-x-6 text-richblack-25 justify-center items-center absolute sm:static top-16 right-0 w-full sm:w-auto bg-richblack-800 sm:bg-transparent p-4 sm:p-0 z-50 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === 'Catalog' ? (
                <div>
                  <NavigationMenu >
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-base bg-transparent p-0 text-richblack-25 hover:text-yellow-25">
                          {link.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="w-[300px]">
                          {
                            isLoading ? (<p>Loading...</p>) : (
                              <div className="w-[300px] flex justify-between flex-col max-h-screen">
                                {data?.data?.allCategory.length ? (
                                  data?.data?.allCategory.map((category, idx) => (
                                    <NavigationMenuLink
                                      key={idx}
                                      className="p-4 w-full cursor-pointer bg-richblack-800 hover:bg-richblack-700 text-white gap-4"
                                    >
                                      <Link to={`/catalog/${category.name}`}>
                                        {category.name}
                                      </Link>
                                    </NavigationMenuLink>
                                  ))
                                ) : (<p>Not any category</p>)
                                }
                              </div>
                            )
                          }
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              ) : (
                <Link to={link?.path}>
                  <p className={`${isRouteMatch(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}

          {/* Conditionally render the Login, Signup, Cart, and Profile in the breadcrumb */}
          {token === null ? (
            <>
              <li>
                <Link to={"/login"}>
                  <Button className="bg-richblack-5 text-black px-3 py-1 rounded-md shadow-md hover:bg-richblack-25">
                    Login
                  </Button>
                </Link>
              </li>
              <li>
                <Link to={"/signup"}>
                  <Button className="bg-richblack-5 text-black px-3 py-1 rounded-md shadow-md hover:bg-richblack-25">
                    Sign Up
                  </Button>
                </Link>
              </li>
            </>
          ) : (
            <>
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <li>
                  <Link to='/dashboard/cart' className='relative'>
                    <IoCartOutline className='text-2xl' />
                    {totalItems > 0 && (
                      <div className="absolute top-[2px] right-[2px] bg-red-500 text-white rounded-full w-4 h-4 text-center">
                        {totalItems}
                      </div>
                    )}
                  </Link>
                </li>
              )}
              <li>
                <ProfileDropDown />
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header;
