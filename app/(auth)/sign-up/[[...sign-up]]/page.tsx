import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className=" flex h-[100vh] w-full items-center justify-center border">
      <SignUp appearance={{ baseTheme: dark }} />;
    </div>
  );
}
