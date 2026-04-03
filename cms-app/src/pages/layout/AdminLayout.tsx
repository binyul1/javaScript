import Logo from "../../assets/images/logo.jpg"
import { PageTitle } from "../auth/Login";


export default function AdminLayout() {
    return (
        <>
        <section className="w-full h-screen flex gap-5 bg-stone-50">
            <aside className="w-100 bg-gray-200 p-10 glex flex-col gap-5">
                <span></span>
                <img src={Logo} alt="logo" className="size-25 rounded-full"></img>
                <PageTitle>Admin Panel</PageTitle>
            </aside>
            <section>
                content
            </section>
        </section>
        </>
    );
}