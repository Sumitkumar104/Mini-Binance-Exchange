"use client";

import { usePathname } from "next/navigation";
import { PrimaryButton, SuccessButton } from "./core/Button"
import { useRouter } from "next/navigation";

export const Appbar = () => {
    const route = usePathname();
    const router = useRouter()

    return <div className="text-white border-b border-slate-800">
        <div className="flex justify-between items-center p-2">
            <div className="flex">
                <div className={`text-xl pl-4 flex flex-col justify-center cursor-pointer text-white`} onClick={() => router.push('/')}>
                    Exchange
                </div>
                
            </div>
            <div className="flex">
                <div className="p-2 mr-2">
                    <SuccessButton>Deposit</SuccessButton>
                    <PrimaryButton>Withdraw</PrimaryButton>
                </div>
            </div>
        </div>
    </div>
}