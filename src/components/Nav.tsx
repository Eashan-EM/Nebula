'use client'

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react"

export default function Nav() {
    return <Navbar>
        <NavbarBrand><Link href="#" className="text-xl text-white">Nexus</Link></NavbarBrand>
        <NavbarContent>
            <NavbarItem><Link href="#" className="text-xl text-white">ISS Location</Link></NavbarItem>
            <NavbarItem><Link href="#" className="text-xl text-white">Mars Weather</Link></NavbarItem>
            <NavbarItem><Link href="#" className="text-xl text-white">Mission Logs</Link></NavbarItem>
        </NavbarContent>
    </Navbar>
}