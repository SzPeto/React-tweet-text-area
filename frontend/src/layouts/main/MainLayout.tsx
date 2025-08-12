import type { ReactNode } from "react";
import NavBar from "../../components/navbar/NavBar.tsx";
import Footer from "../../components/footer/Footer";

function MainLayout({ children }: { children: ReactNode }){
    
    return(
        <>
            <header><NavBar /></header>
            <main>{ children }</main>
            <footer><Footer /></footer>
        </>
    );
}

export default MainLayout;