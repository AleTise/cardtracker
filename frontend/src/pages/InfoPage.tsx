import UserInfo from "../components/UserInfo";

export default function InfoPage() {
    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold">Informazioni API</h2>
            <UserInfo />
        </div>
    );
}