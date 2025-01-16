import { useEffect, useState } from "react";

const Home = () => {
    const [time, setTime] = useState("");

    useEffect(() => {

        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";

            hours = hours % 12 || 12;

            const formattedTime = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
            setTime(formattedTime);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="mt-20 mb-[100px]">
                <h1 className="text-center text-[#F5F5DC]">Welcome back, Bryce.</h1>
            </div>
            {/* Background div */}
            <div className="bg-[#302F2F] p-1 w-100% mx-4 rounded-[10px]">
                {/* Clock */}
                <div className="text-center text-[#F5F5DC] text-[60px]">
                    {time}
                </div>
            </div>

            {/* quote */}
            <div>

            </div>
        </div>
    );
};

export default Home;