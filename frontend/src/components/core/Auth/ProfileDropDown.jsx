// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logout } from '@/services/operations/authAPI'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,

} from "@/components/ui/dropdown-menu"
import { useSelector } from 'react-redux'
import { ExternalLink, LogOutIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch } from'react-redux'



const ProfileDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Moved inside the component
  const { user } = useSelector((state) => state.profile);
  console.log(user);

  return (
    <div className=''>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="relative top-1">
              <AvatarImage src={user.image} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-richblack-700 mr-4 mt-2">
            <DropdownMenuLabel className="capitalize">
              {user?.firstName}{" "}{user?.lastName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ExternalLink className='mr-2 h-4 w-4' />
              <Link to={'/dashboard/my-profile'} className="flex">
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400 cursor-pointer"
              onClick={() => dispatch(logout(navigate))} // Pass navigate to logout
            >
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (<p>user nai ha</p>)}
    </div>
  );
}

export default ProfileDropDown;
