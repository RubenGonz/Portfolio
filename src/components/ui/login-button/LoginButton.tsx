import { UserIcon } from "@/components/svg/user-icon/UserIcon";
import Link from "next/link";

export const LoginButton = () => {

  return <Link href={"auth/login"}>
    <UserIcon size={32} className="cursor-pointer p-1" />
  </Link>
};