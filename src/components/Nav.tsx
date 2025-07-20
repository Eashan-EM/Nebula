'use client'

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react"

export default function Nav() {
    const handleLinkPress = (e: any) => {
        e.preventDefault?.()
        const href = e?.target?.getAttribute?.("href") || e?.currentTarget?.getAttribute?.("href")
        if (!href) return
        const targetId = href.substring(1)
        if (targetId === "") window.scrollTo({ top: 0, behavior: "smooth" })
        else {
            const targetElement = document.getElementById(targetId)
            if (targetElement) targetElement.scrollIntoView({ behavior: "smooth" })
        }
    }
    
    return <Navbar>
        <NavbarBrand><Link href="#" className="text-xl text-white" onPress={handleLinkPress}>Nexus</Link></NavbarBrand>
        <NavbarContent>
            <NavbarItem><Link href="#iss" className="text-xl text-white" onPress={handleLinkPress}>ISS Location</Link></NavbarItem>
            <NavbarItem><Link href="#mars" className="text-xl text-white" onPress={handleLinkPress}>Mars Weather</Link></NavbarItem>
            <NavbarItem><Link href="#asteroids" className="text-xl text-white" onPress={handleLinkPress}>Asteroid Info</Link></NavbarItem>
        </NavbarContent>
    </Navbar>
}