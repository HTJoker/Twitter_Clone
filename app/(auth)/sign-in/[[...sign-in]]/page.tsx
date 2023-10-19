import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div>
      <SignIn appearance={{ baseTheme: dark }} />;
    </div>
  );
}
