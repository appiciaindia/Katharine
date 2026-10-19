import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountLayout({ children }) {
    return (
        <div className='mt-2'>
            <div className='px-2 md:px-5 lg:px-10 py-5 md:py-14 lg:py-20 lg:flex relative items-start' >
                {/* Sidebar */}
                <AccountSidebar />

                {/* Page Content */}
                <main className="min-w-0 lg:ml-7 lg:mt-0 md:mt-6 xl:w-4/5 lg:w-8/12">
                    {children}
                </main>

            </div>
        </div>
    );
}