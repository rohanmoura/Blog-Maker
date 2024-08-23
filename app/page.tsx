import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {

  const { getUser } = getKindeServerSession();
  const session = await getUser()

  return (
    <>
      <Button>
        <RegisterLink>
          Register
        </RegisterLink>
      </Button>
      <Button>
        <LoginLink>
          Login
        </LoginLink>
      </Button>
    </>
  );
}
