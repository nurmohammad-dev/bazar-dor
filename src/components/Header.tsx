import Image from "next/image";
import NavLinksPage from "./NavLinks";
import MarqueePage from "./Marquee";
import UserInfo from "./UserInfo";

const HeaderPage = () => {
    const date=new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
       <div className="container mx-auto">
         <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <Image
                src="/Logo-Navbar.png"
                alt="Logo"
                width={50}
                height={50}
            />
            <div>
                <h2 className="text-xl font-bold">বাজার দর</h2>
                <p className="text-sm text-gray-500">{date}</p>
            </div>

            <UserInfo />
         
        </div>
        
        <NavLinksPage />
        <MarqueePage/>
       </div>
    );
};

export default HeaderPage;