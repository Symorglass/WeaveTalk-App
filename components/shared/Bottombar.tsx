"use client"

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function Bottombar() {
    const pathname = usePathname();
    return (
        <section className="bottombar">
            <div className="bottombar_container">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) 
                                        || pathname === link.route;  // if pathname contains route and link route is not home '\' or pathname equals link route  
                    return (
                        <Link 
                        href={link.route}
                        key={link.label}
                        className={`bottombar_link ${isActive && 'bg-primary-500'}`} // the bg-primary-500 class will only be added if the isActive variable is true
                        >
                            <Image 
                                src={link.imgURL}
                                alt={link.label} // The alt attribute specifies an alternative text for the image, which is used by screen readers for visually impaired users and serves as a placeholder text when the image fails to load. 
                                width={24}
                                height={24}
                            />
                            <p className="text-subtle-medium text-light-1 max-sm:hidden"> 
                                {/* max-sm:hidden: for phone screen size only display img, for ipad size display text and pic */}
                                {link.label.split(/\s+/)[0]}   
                                {/* only display first word */}
                            </p>  
                        </Link> 
                    )}
                )}
            </div>
        </section>
    )
}

export default Bottombar;