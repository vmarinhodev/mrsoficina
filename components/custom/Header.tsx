import Link from "next/link";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { Logo } from "./Logo";
import { Button } from "../ui/button";
import { LogoutButton } from "./LogoutButton";

interface HeaderProps {
    data: {
        logoText: {
            id: number;
            text: string;
            url: string;
        }
        ctaButton: {
            id: number;
            text: string;
            url: string;
        }
    }
}

interface AuthUserProps {
    username: string;
    email: string;
}

export function LoggedInUser({
    userData,
}: {
    readonly userData: AuthUserProps;
}) {
    return (
        <div className="flex gap-2">
            <Link
                href="/dashboard/account"
                className="font-semibold hover:text-primary"
            >
                {userData.username}
            </Link>
            <LogoutButton />
        </div>
    )
}

export async function Header({ data }: Readonly<HeaderProps>) {
    const user = await getUserMeLoader();
    console.log('user', user)
    const { logoText, ctaButton } = data;
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
            <Logo text={logoText.text} />
            <div className="flext items-center gap-4">
                {user.ok ? (
                    <LoggedInUser userData={user.data} />
                ) : (
                    <Link href={ctaButton.url}>
                        <Button>{ctaButton.text}</Button>
                    </Link>
                )}
            </div>
        </div>
    );
}