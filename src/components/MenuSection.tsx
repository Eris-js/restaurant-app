import FlipBook from "@/components/FlipBook";

export default function Page() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">3D FlipBook</h1>

            {/* đổi mode: pdf | image | html */}
            <FlipBook mode="image" />
        </div>
    );
}
