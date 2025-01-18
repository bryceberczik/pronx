import { useEffect, useState } from "react";
import { getQuote } from "../services/getQuote";
import { getUserById } from "../services/getUserById";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [time, setTime] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasRoutine, setHasRoutine] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  interface User {
    firstName: string;
    lastName: string;
    email: string;
    Routine?: any;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      const formattedTime =
        hours + ":" + minutes.toString().padStart(2, "0") + " " + ampm;
      setTime(formattedTime);
    };

    const fetchQuote = async () => {
      try {
        const fetchedQuote = (await getQuote()) as {
          quote: string;
          author: string;
        };
        setQuote(fetchedQuote.quote);
        setAuthor(fetchedQuote.author);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Failed to load quote.");
        setAuthor("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    fetchQuote();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("id_token");
    if (token) {
      try {
        const decoded: { id: string } = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const user = await getUserById(userId) as User;
          setUser(user);
          setHasRoutine(!!user?.Routine);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div>
      <div className="mt-20 mb-[60px]">
        <h1 className="text-center text-[#F5F5DC]">
          Welcome back, {user?.firstName}.
        </h1>
      </div>
      {/* Background div */}
      <div className="bg-[#302F2F] p-1 w-100% mx-4 rounded-[10px]">
        {/* Clock */}
        <div className="text-center text-[#F5F5DC] text-[60px]">{time}</div>
      </div>

      {/* Quote */}
      <div className="mx-4 mt-10 py-1 text-center text-[#F5F5DC] text-[18px] italic">
        {quote ? `"${quote}"` : "Loading quote..."}
        {author && <div className="mt-2 text-[20px]">- {author}</div>}
      </div>

      {/* Expandable Div */}
      <div
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] bg-[#302F2F] rounded-t-[10px] rounded-b-none transition-all duration-500 ${
          isExpanded ? "h-[300px]" : "h-[50px]"
        } cursor-pointer overflow-hidden`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="text-center text-[#F5F5DC] text-[20px] m-2">Routine</h1>
        {/* Content inside the expanded div */}
        {isExpanded && (
          <div className="p-2 text-[#F5F5DC] flex flex-col items-center">
            {hasRoutine ? (
              <button
                className="bg-[#202020] p-2 rounded-[5px]"
                onClick={handleButtonClick}
              >
                Add Step
              </button>
            ) : (
              <h1>Failed to find routine.</h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
