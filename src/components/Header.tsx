import Image from "next/image";
import NavLinksPage from "./NavLinks";
import MarqueePage from "./Marquee";

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

            <div className="ml-auto flex gap-2">
                <button className="btn">সাইন ইন</button>
                <button className="btn btn-success">সাইন আপ</button>
            </div>
        </div>
        
        <NavLinksPage />
        <MarqueePage/>
       </div>
    );
};

export default HeaderPage;