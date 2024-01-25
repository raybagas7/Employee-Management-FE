import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { Badge } from "../ui/badge";

const EmployeeCard = ({
  id,
  fullname,
  email,
  place_of_birth,
  birth_date,
  gender,
  is_admin,
  role,
  profile_img,
}: IEmployeeData) => {
  return (
    <Link href={`/admin/employee/${id}`}>
      <div className="cursor-pointer overflow-hidden rounded-lg border-[1px] border-border shadow transition duration-150 hover:shadow-md">
        <div className="flex justify-between gap-2 bg-primary px-3 py-1 text-primary-foreground">
          <p>{email}</p>
          {is_admin && (
            <Badge className="bg-card-foreground text-card">Admin</Badge>
          )}
        </div>
        <div className="flex gap-3 p-3 ">
          <div className="flex-1">
            <Avatar className="aspect-square h-full w-full rounded-lg border-[1px] border-border">
              <AvatarImage className=" object-cover" src={profile_img} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-[2] flex-col justify-between text-sm max-md:text-xs">
            <p className="line-clamp-1">{fullname}</p>
            <p className="line-clamp-1">
              {role ? (
                role
              ) : (
                <span className="font-bold text-destructive">No role</span>
              )}
            </p>
            <p className="line-clamp-1">{place_of_birth}</p>
            <p className="line-clamp-1"> {formatDate(birth_date)}</p>
            <p className="line-clamp-1">{gender}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EmployeeCard;
